import { BleManager } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid } from 'react-native';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import { PERMISSIONS, request, RESULTS, check } from 'react-native-permissions';
import LocalStorage from '../utility/LocalStorage';
import { BLE_CONSTANTS, BLE_STORAGE_KEYS } from '../utility/BLEConstants';

class BLEServiceClass {
  constructor() {
    this.manager = new BleManager();
    this.connectedDevice = null;
    this.negotiatedMTU = 23; // Default MTU
    this.scanSubscription = null;
    this.authStatusSubscription = null;
    this.fileListSubscription = null;
    this.transferControlSubscription = null;
    this.transferDataSubscription = null;
    this.transferProgressSubscription = null;
  }

  // ==================== PERMISSIONS ====================

  async requestPermissions() {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        // Android 12+
        const scanResult = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
        const connectResult = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        return scanResult === RESULTS.GRANTED && connectResult === RESULTS.GRANTED;
      } else {
        // Android < 12 needs location for BLE scanning
        const locationResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return locationResult === RESULTS.GRANTED;
      }
    }
    // iOS permissions are handled automatically by the system
    return true;
  }

  async checkBluetoothState() {
    return new Promise((resolve) => {
      const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          subscription.remove();
          resolve(true);
        } else if (state === 'PoweredOff') {
          subscription.remove();
          resolve(false);
        }
      }, true);
    });
  }

  // ==================== SCANNING ====================

  async startScan(onDeviceFound, onScanComplete, onError) {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        onError('Bluetooth permissions not granted');
        return;
      }

      const state = await this.manager.state();
      if (state !== 'PoweredOn') {
        onError('Please enable Bluetooth');
        return;
      }

      this.stopScan();

      const discoveredDevices = new Map();

      this.scanSubscription = this.manager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.log('Scan error:', error);
            onError(error.message);
            return;
          }

          if (device?.name === BLE_CONSTANTS.DEVICE_NAME && !discoveredDevices.has(device.id)) {
            discoveredDevices.set(device.id, device);
            onDeviceFound({
              id: device.id,
              name: device.name,
              rssi: device.rssi,
            });
          }
        }
      );

      // Auto-stop after timeout
      setTimeout(() => {
        this.stopScan();
        onScanComplete();
      }, BLE_CONSTANTS.SCAN_TIMEOUT_MS);
    } catch (error) {
      console.log('startScan error:', error);
      onError(error.message || 'Failed to start scanning');
    }
  }

  stopScan() {
    if (this.scanSubscription) {
      this.manager.stopDeviceScan();
      this.scanSubscription = null;
    }
  }

  // ==================== CONNECTION ====================

  async connectToDevice(deviceId) {
    try {
      // Disconnect if already connected
      if (this.connectedDevice) {
        await this.disconnectDevice();
      }

      const device = await this.manager.connectToDevice(deviceId, {
        timeout: BLE_CONSTANTS.CONNECTION_TIMEOUT_MS,
      });

      // Request MTU 256 for optimal data transfer (v1.2: 244 byte chunks + overhead)
      if (Platform.OS === 'android') {
        try {
          const mtu = await device.requestMTU(BLE_CONSTANTS.PREFERRED_MTU);
          console.log('MTU negotiated:', mtu);
        } catch (mtuError) {
          console.log('MTU negotiation failed, using default:', mtuError.message);
        }
      }

      await device.discoverAllServicesAndCharacteristics();
      this.connectedDevice = device;

      // Set up disconnection listener
      device.onDisconnected((error, disconnectedDevice) => {
        console.log('Device disconnected:', disconnectedDevice?.id);
        this.connectedDevice = null;
        this.cleanupSubscriptions();
      });

      return device;
    } catch (error) {
      console.log('Connection error:', error);
      throw new Error(error.message || 'Failed to connect to device');
    }
  }

  async disconnectDevice() {
    try {
      this.cleanupSubscriptions();
      if (this.connectedDevice) {
        await this.connectedDevice.cancelConnection();
        this.connectedDevice = null;
      }
    } catch (error) {
      console.log('Disconnect error:', error);
      this.connectedDevice = null;
    }
  }

  cleanupSubscriptions() {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.remove();
      this.authStatusSubscription = null;
    }
    if (this.fileListSubscription) {
      this.fileListSubscription.remove();
      this.fileListSubscription = null;
    }
    if (this.transferControlSubscription) {
      this.transferControlSubscription.remove();
      this.transferControlSubscription = null;
    }
    if (this.transferDataSubscription) {
      this.transferDataSubscription.remove();
      this.transferDataSubscription = null;
    }
    if (this.transferProgressSubscription) {
      this.transferProgressSubscription.remove();
      this.transferProgressSubscription = null;
    }
  }

  isConnected() {
    return this.connectedDevice !== null;
  }

  // ==================== AUTHENTICATION ====================

  async authenticate(deviceId) {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    // Get or generate auth key
    let authKey = await this.getStoredAuthKey(deviceId);

    if (!authKey) {
      // First pairing - generate new key
      authKey = this.generateAuthKey();
      await this.storeAuthKey(deviceId, authKey);
    }

    // Convert hex string to bytes and then to Base64
    const keyBytes = Buffer.from(authKey, 'hex');
    const base64Key = keyBytes.toString('base64');

    // Subscribe to auth status notifications
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Authentication timeout'));
      }, 5000);

      try {
        // Subscribe to auth status
        this.authStatusSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.AUTH_SERVICE_UUID,
          BLE_CONSTANTS.AUTH_STATUS_UUID,
          (error, characteristic) => {
            if (error) {
              clearTimeout(timeout);
              reject(new Error('Authentication failed'));
              return;
            }

            if (characteristic?.value) {
              const statusBytes = Buffer.from(characteristic.value, 'base64');
              if (statusBytes[0] === 0x01) {
                clearTimeout(timeout);
                resolve(true);
              } else {
                clearTimeout(timeout);
                // Auth failed - clear stored key for this device
                this.clearStoredAuthKey(deviceId);
                reject(new Error('Authentication failed - invalid key'));
              }
            }
          }
        );

        // Write auth key
        await this.connectedDevice.writeCharacteristicWithResponseForService(
          BLE_CONSTANTS.AUTH_SERVICE_UUID,
          BLE_CONSTANTS.AUTH_KEY_WRITE_UUID,
          base64Key
        );
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  generateAuthKey() {
    // Generate 32 random bytes as hex string
    const randomBytes = new Uint8Array(BLE_CONSTANTS.AUTH_KEY_LENGTH);
    for (let i = 0; i < BLE_CONSTANTS.AUTH_KEY_LENGTH; i++) {
      randomBytes[i] = Math.floor(Math.random() * 256);
    }
    return Buffer.from(randomBytes).toString('hex');
  }

  async storeAuthKey(deviceId, authKey) {
    const authKeys = (await LocalStorage.getJsonData(BLE_STORAGE_KEYS.AUTH_KEYS)) || {};
    authKeys[deviceId] = authKey;
    await LocalStorage.storeJsonData(BLE_STORAGE_KEYS.AUTH_KEYS, authKeys);
  }

  async getStoredAuthKey(deviceId) {
    const authKeys = (await LocalStorage.getJsonData(BLE_STORAGE_KEYS.AUTH_KEYS)) || {};
    return authKeys[deviceId] || null;
  }

  async clearStoredAuthKey(deviceId) {
    const authKeys = (await LocalStorage.getJsonData(BLE_STORAGE_KEYS.AUTH_KEYS)) || {};
    delete authKeys[deviceId];
    await LocalStorage.storeJsonData(BLE_STORAGE_KEYS.AUTH_KEYS, authKeys);
  }

  async clearDeviceAuthKey() {
    // Factory reset - clear auth key on device
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    await this.connectedDevice.writeCharacteristicWithResponseForService(
      BLE_CONSTANTS.AUTH_SERVICE_UUID,
      BLE_CONSTANTS.AUTH_KEY_CLEAR_UUID,
      Buffer.from([0x01]).toString('base64')
    );
  }

  // ==================== FILE OPERATIONS ====================

  async listFiles() {
    console.log('=== LIST FILES START ===');
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    return new Promise(async (resolve, reject) => {
      const files = [];
      const timeout = setTimeout(() => {
        console.log('ERROR: File list timeout');
        reject(new Error('File list timeout'));
      }, 10000);

      try {
        // Subscribe to file list notifications
        console.log('Subscribing to file list notifications...');
        this.fileListSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.FILE_LIST_UUID,
          (error, characteristic) => {
            if (error) {
              console.log('File list subscription error:', error.message || error);
              clearTimeout(timeout);
              reject(new Error('Failed to list files'));
              return;
            }

            // Use notification data directly (don't read characteristic - it triggers more notifications)
            if (characteristic?.value) {
              const data = Buffer.from(characteristic.value, 'base64');
              console.log('File list entry bytes:', Array.from(data));
              const type = data[0];

              if (type === BLE_CONSTANTS.FILE_TYPE_END) {
                // End of list
                console.log('=== FILE LIST COMPLETE ===');
                console.log('Total files found:', files.length);
                files.forEach((f, i) => console.log(`  ${i + 1}. "${f.name}" (${f.size} bytes)`));
                clearTimeout(timeout);
                if (this.fileListSubscription) {
                  this.fileListSubscription.remove();
                  this.fileListSubscription = null;
                }
                resolve(files);
              } else {
                // Parse file entry: [type:1][size:4][filename\0]
                // Note: Device sends filename only (e.g., "recording_0001.aac"), not full path
                const size = data.readUInt32LE(1);
                const filenameEnd = data.indexOf(0, 5);
                const filename = data.slice(5, filenameEnd > 0 ? filenameEnd : data.length).toString('utf-8');

                console.log('Parsed file:', { type, size, filename });

                files.push({
                  name: filename,
                  size: size,
                  type: type === BLE_CONSTANTS.FILE_TYPE_DIRECTORY ? 'directory' : 'file',
                });
              }
            }
          }
        );

        // Trigger file list by reading the characteristic
        console.log('Triggering file list read...');
        await this.connectedDevice.readCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.FILE_LIST_UUID
        );
      } catch (error) {
        console.log('listFiles exception:', error.message || error);
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  async uploadFile(filePath, onProgress, customFileName = null) {
    console.log('=== BLE UPLOAD START ===');
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    // Clean up any existing subscriptions first
    this.cleanupTransferSubscriptions();

    // Read file as base64
    const fileBase64 = await RNFS.readFile(filePath, 'base64');
    const fileBytes = Buffer.from(fileBase64, 'base64');
    const fileName = customFileName || filePath.split('/').pop();
    const fileSize = fileBytes.length;

    console.log('Starting upload:', fileName, 'size:', fileSize);

    return new Promise(async (resolve, reject) => {
      let isCompleted = false;
      let isReady = false;

      const timeout = setTimeout(() => {
        if (!isCompleted) {
          console.log('ERROR: Upload timeout');
          isCompleted = true;
          this.cleanupTransferSubscriptions();
          reject(new Error('Upload timeout'));
        }
      }, 1200000); // 20 minute timeout for large files

      const handleError = (errorMsg) => {
        if (!isCompleted) {
          console.log('ERROR:', errorMsg);
          isCompleted = true;
          clearTimeout(timeout);
          this.cleanupTransferSubscriptions();
          reject(new Error(errorMsg));
        }
      };

      const handleComplete = () => {
        if (!isCompleted) {
          console.log('=== UPLOAD COMPLETE ===');
          isCompleted = true;
          clearTimeout(timeout);
          this.cleanupTransferSubscriptions();
          resolve(true);
        }
      };

      try {
        // Subscribe to transfer control for status updates
        // Note: Transfer Control only supports Write/Notify (not Read)
        console.log('Setting up Transfer Control subscription...');
        this.transferControlSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_CONTROL_UUID,
          (error, characteristic) => {
            if (error) {
              console.log('Transfer control subscription error:', error);
              handleError('Transfer control error');
              return;
            }

            if (!characteristic?.value) {
              console.log('No value in Transfer Control notification');
              return;
            }

            const data = Buffer.from(characteristic.value, 'base64');
            console.log('Upload control data:', Array.from(data));
            const status = data[0];
            console.log('Upload control status:', status, '(0=Error, 1=Ready, 2=Complete)');

            if (status === BLE_CONSTANTS.TRANSFER_STATUS_ERROR) {
              const errorCode = data.length > 1 ? data.readUInt32LE(1) : 0;
              console.log('Device returned error code:', errorCode);
              handleError('Upload failed - device error code: ' + errorCode);
            } else if (status === BLE_CONSTANTS.TRANSFER_STATUS_READY) {
              console.log('Device ready for upload');
              isReady = true;
            } else if (status === BLE_CONSTANTS.TRANSFER_STATUS_COMPLETE) {
              console.log('Upload complete notification received');
              handleComplete();
            }
          }
        );

        // Subscribe to progress updates
        console.log('Setting up Transfer Progress subscription...');
        this.transferProgressSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_PROGRESS_UUID,
          async (error, _characteristic) => {
            if (!error && !isCompleted) {
              try {
                const char = await this.connectedDevice.readCharacteristicForService(
                  BLE_CONSTANTS.FILE_SERVICE_UUID,
                  BLE_CONSTANTS.TRANSFER_PROGRESS_UUID
                );
                if (char?.value) {
                  const data = Buffer.from(char.value, 'base64');
                  if (data.length >= 8) {
                    const transferred = data.readUInt32LE(0);
                    const total = data.readUInt32LE(4);
                    console.log('Upload progress from device:', transferred, '/', total);
                    if (onProgress && total > 0) {
                      onProgress(transferred / total);
                    }
                  }
                }
              } catch (err) {
                console.log('Error reading progress:', err.message);
              }
            }
          }
        );

        // Wait for subscriptions to be established
        await new Promise(r => setTimeout(r, 300));

        // Build upload command: [0x01][size:4][filename\0]
        const fileNameBytes = Buffer.from(fileName + '\0', 'utf-8');
        const commandBuffer = Buffer.alloc(5 + fileNameBytes.length);
        commandBuffer[0] = BLE_CONSTANTS.TRANSFER_OP_UPLOAD;
        commandBuffer.writeUInt32LE(fileSize, 1);
        fileNameBytes.copy(commandBuffer, 5);

        console.log('Upload command buffer:', Array.from(commandBuffer));
        console.log('Sending upload command');

        // Send upload command
        await this.connectedDevice.writeCharacteristicWithResponseForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_CONTROL_UUID,
          commandBuffer.toString('base64')
        );

        // Wait for Ready response
        const readyTimeout = 5000;
        const readyStart = Date.now();
        while (!isReady && !isCompleted && (Date.now() - readyStart) < readyTimeout) {
          await new Promise(r => setTimeout(r, 100));
        }

        if (!isReady && !isCompleted) {
          handleError('Device not ready for upload');
          return;
        }

        console.log('Sending file chunks...');

        // v1.2: Send raw binary chunks (max 244 bytes each, no Base64 encoding)
        // BLE library expects base64-encoded input which it decodes before sending
        const maxChunkBytes = BLE_CONSTANTS.MAX_CHUNK_BYTES; // 244 bytes per chunk
        let offset = 0;
        let chunkCount = 0;

        while (offset < fileBytes.length && !isCompleted) {
          const chunkEnd = Math.min(offset + maxChunkBytes, fileBytes.length);
          const chunk = Buffer.from(fileBytes.slice(offset, chunkEnd));

          // BLE library expects base64 input, decodes it, and sends raw bytes to device
          const dataForBLE = chunk.toString('base64');

          console.log(`Sending chunk ${chunkCount}: ${chunk.length} raw bytes`);

          try {
            await this.connectedDevice.writeCharacteristicWithResponseForService(
              BLE_CONSTANTS.FILE_SERVICE_UUID,
              BLE_CONSTANTS.TRANSFER_DATA_UUID,
              dataForBLE
            );
          } catch (writeErr) {
            console.log(`Chunk ${chunkCount} write error:`, writeErr.message);
            throw writeErr;
          }

          offset += chunk.length;
          chunkCount++;

          // Update progress locally
          if (onProgress) {
            onProgress(offset / fileBytes.length);
          }

          // Small delay between chunks to prevent overwhelming the device
          await new Promise(r => setTimeout(r, 10));
        }

        console.log('All chunks sent, waiting for complete notification');
      } catch (error) {
        console.log('Upload error:', error);
        handleError(error.message || 'Upload failed');
      }
    });
  }

  async downloadFile(fileName, destinationPath, onProgress) {
    console.log('=== BLE DOWNLOAD START (Read-based flow) ===');
    console.log('fileName:', fileName);
    console.log('destinationPath:', destinationPath);
    console.log('connectedDevice:', this.connectedDevice?.id);

    if (!this.connectedDevice) {
      console.log('ERROR: No device connected');
      throw new Error('No device connected');
    }

    // Clean up any existing subscriptions first
    console.log('Cleaning up existing subscriptions...');
    this.cleanupTransferSubscriptions();

    return new Promise(async (resolve, reject) => {
      const chunks = [];
      let expectedSize = 0;
      let receivedSize = 0;
      let isCompleted = false;

      // Queue-based approach to handle notifications that arrive before we start waiting
      const readyQueue = [];
      let chunkReadyResolve = null;

      const timeout = setTimeout(() => {
        if (!isCompleted) {
          console.log('ERROR: Download timeout');
          this.cleanupTransferSubscriptions();
          reject(new Error('Download timeout'));
        }
      }, 1200000); // 20 minute timeout

      const handleError = (errorMsg) => {
        if (!isCompleted) {
          console.log('ERROR:', errorMsg);
          isCompleted = true;
          clearTimeout(timeout);
          this.cleanupTransferSubscriptions();
          if (chunkReadyResolve) {
            chunkReadyResolve({ error: true, message: errorMsg });
          }
          reject(new Error(errorMsg));
        }
      };

      const handleComplete = async () => {
        if (!isCompleted) {
          console.log('=== DOWNLOAD COMPLETE ===');
          console.log('Total chunks received:', chunks.length);
          console.log('Total bytes received:', receivedSize);
          isCompleted = true;
          clearTimeout(timeout);
          this.cleanupTransferSubscriptions();

          try {
            // Combine chunks and write to file
            const fileBuffer = Buffer.concat(chunks);
            console.log('Writing file, buffer size:', fileBuffer.length);
            await RNFS.writeFile(destinationPath, fileBuffer.toString('base64'), 'base64');
            console.log('File written successfully to:', destinationPath);

            // Trigger MediaStore scan on Android so file appears in Downloads
            if (Platform.OS === 'android') {
              try {
                await RNFS.scanFile(destinationPath);
                console.log('MediaStore scan completed for:', destinationPath);
              } catch (scanError) {
                console.log('MediaStore scan failed (file still saved):', scanError.message);
              }
            }

            resolve(destinationPath);
          } catch (writeError) {
            console.log('ERROR writing file:', writeError);
            reject(new Error('Failed to save file'));
          }
        }
      };

      // Signal that a chunk is ready - either resolve waiting promise or queue it
      const signalChunkReady = (result) => {
        if (chunkReadyResolve) {
          const resolver = chunkReadyResolve;
          chunkReadyResolve = null;
          resolver(result);
        } else {
          // No one waiting yet, queue it
          readyQueue.push(result);
          console.log('Queued ready signal, queue length:', readyQueue.length);
        }
      };

      try {
        // Subscribe to transfer control for Complete/Error status
        console.log('Setting up Transfer Control subscription...');
        this.transferControlSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_CONTROL_UUID,
          (error, characteristic) => {
            console.log('--- Transfer Control notification ---');
            if (error) {
              console.log('Transfer Control ERROR:', error.message || error);
              handleError('Transfer control error: ' + (error.message || error));
              return;
            }

            if (!characteristic?.value) {
              console.log('No value in Transfer Control notification');
              return;
            }

            const data = Buffer.from(characteristic.value, 'base64');
            console.log('Transfer Control data:', Array.from(data));
            const status = data[0];
            console.log('Transfer Control status byte:', status, '(0=Error, 2=Complete)');

            if (status === BLE_CONSTANTS.TRANSFER_STATUS_ERROR) {
              const errorCode = data.length > 1 ? data.readUInt32LE(1) : 0;
              console.log('Device returned error code:', errorCode);
              handleError('Download failed - device error code: ' + errorCode);
            } else if (status === BLE_CONSTANTS.TRANSFER_STATUS_COMPLETE) {
              console.log('Device signaled COMPLETE');
              handleComplete();
            }
          }
        );
        console.log('Transfer Control subscription created');

        // Subscribe to Transfer Data for Ready signals (read-based flow)
        // Transfer Data notifies with [0x01][size:4] when chunk is ready to be READ
        console.log('Setting up Transfer Data subscription (Ready signals)...');
        this.transferDataSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_DATA_UUID,
          (error, characteristic) => {
            console.log('--- Transfer Data notification ---');
            if (error) {
              console.log('Transfer Data ERROR:', error.message || error);
              return;
            }

            if (isCompleted) return;

            if (!characteristic?.value) {
              console.log('No value in Transfer Data notification');
              return;
            }

            // Parse Ready notification: [status:1][size:4]
            const data = Buffer.from(characteristic.value, 'base64');
            console.log('Transfer Data notification bytes:', Array.from(data));

            if (data.length >= 5) {
              const status = data[0];
              const size = data.readUInt32LE(1);

              if (status === BLE_CONSTANTS.TRANSFER_STATUS_ERROR) {
                console.log('Transfer Data error notification');
                handleError('Download failed - transfer data error');
              } else if (status === BLE_CONSTANTS.TRANSFER_STATUS_READY) {
                // First notification: size = file size
                // Subsequent notifications: size = chunk length
                if (expectedSize === 0) {
                  expectedSize = size;
                  console.log('File size:', expectedSize, 'bytes');
                } else {
                  console.log('Chunk ready, length:', size, 'bytes');
                }

                // Signal that a chunk is ready to be read
                signalChunkReady({ ready: true, size });
              }
            }
          }
        );
        console.log('Transfer Data subscription created');

        // Subscribe to transfer progress for progress updates
        console.log('Setting up Transfer Progress subscription...');
        this.transferProgressSubscription = this.connectedDevice.monitorCharacteristicForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_PROGRESS_UUID,
          async (error, _characteristic) => {
            if (error) {
              console.log('Transfer Progress ERROR:', error.message || error);
              return;
            }
            if (isCompleted) return;

            // Read full characteristic value
            try {
              const char = await this.connectedDevice.readCharacteristicForService(
                BLE_CONSTANTS.FILE_SERVICE_UUID,
                BLE_CONSTANTS.TRANSFER_PROGRESS_UUID
              );
              if (char?.value) {
                const data = Buffer.from(char.value, 'base64');
                if (data.length >= 8) {
                  const transferred = data.readUInt32LE(0);
                  const total = data.readUInt32LE(4);
                  console.log('Progress from device:', transferred, '/', total);
                  if (onProgress && total > 0) {
                    onProgress(transferred / total);
                  }
                }
              }
            } catch (err) {
              console.log('Error reading progress:', err.message);
            }
          }
        );
        console.log('Transfer Progress subscription created');

        // Wait for subscriptions to be established
        console.log('Waiting 300ms for subscriptions to establish...');
        await new Promise(r => setTimeout(r, 300));

        // Build download command: [0x02][filename\0]
        const fileNameBytes = Buffer.from(fileName + '\0', 'utf-8');
        const commandBuffer = Buffer.alloc(1 + fileNameBytes.length);
        commandBuffer[0] = BLE_CONSTANTS.TRANSFER_OP_DOWNLOAD;
        fileNameBytes.copy(commandBuffer, 1);

        console.log('Download command buffer:', Array.from(commandBuffer));
        console.log('Download command base64:', commandBuffer.toString('base64'));

        // Send download command
        console.log('Sending download command to device...');
        await this.connectedDevice.writeCharacteristicWithResponseForService(
          BLE_CONSTANTS.FILE_SERVICE_UUID,
          BLE_CONSTANTS.TRANSFER_CONTROL_UUID,
          commandBuffer.toString('base64')
        );
        console.log('Download command sent successfully');

        // Helper to wait for chunk ready notification (checks queue first)
        const waitForChunkReady = () => {
          // Check if there's already a queued signal
          if (readyQueue.length > 0) {
            const result = readyQueue.shift();
            console.log('Using queued ready signal, remaining in queue:', readyQueue.length);
            return Promise.resolve(result);
          }

          // Wait for notification
          return new Promise((resolveWait) => {
            chunkReadyResolve = resolveWait;
            // Timeout for individual chunk wait
            setTimeout(() => {
              if (chunkReadyResolve === resolveWait) {
                chunkReadyResolve = null;
                resolveWait({ timeout: true });
              }
            }, 30000);
          });
        };

        // Read-based download loop: wait for Ready notification, then read chunk
        console.log('Starting read-based download loop...');
        while (!isCompleted) {
          // Wait for Ready notification from Transfer Data
          console.log('Waiting for chunk ready notification...');
          const result = await waitForChunkReady();

          if (result.error) {
            console.log('Error while waiting for chunk:', result.message);
            break;
          }

          if (result.timeout) {
            console.log('Chunk wait timeout - checking if transfer completed');
            // Check if we've received all data
            if (receivedSize >= expectedSize && expectedSize > 0) {
              console.log('All data received, triggering complete');
              handleComplete();
            }
            break;
          }

          if (isCompleted) break;

          // Read the raw binary chunk from Transfer Data characteristic
          console.log('Reading chunk from Transfer Data...');
          try {
            const char = await this.connectedDevice.readCharacteristicForService(
              BLE_CONSTANTS.FILE_SERVICE_UUID,
              BLE_CONSTANTS.TRANSFER_DATA_UUID
            );

            if (char?.value) {
              // BLE library returns data as base64, decode to get raw binary from device
              const rawChunk = Buffer.from(char.value, 'base64');
              chunks.push(rawChunk);
              receivedSize += rawChunk.length;

              console.log('Chunk read:', rawChunk.length, 'bytes, total:', receivedSize, '/', expectedSize);

              if (onProgress && expectedSize > 0) {
                const progress = receivedSize / expectedSize;
                console.log('Progress:', Math.round(progress * 100) + '%');
                onProgress(progress);
              }
            }
          } catch (readErr) {
            console.log('Error reading chunk:', readErr.message);
            // Continue waiting for next notification
          }
        }
      } catch (error) {
        console.log('=== DOWNLOAD EXCEPTION ===');
        console.log('Error:', error.message || error);
        console.log('Stack:', error.stack);
        handleError(error.message || 'Download failed');
      }
    });
  }

  async deleteFile(fileName) {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    // Write null-terminated filename to delete characteristic
    // Device auto-prefixes with /Storage/ internally
    const fileNameBytes = Buffer.from(fileName + '\0', 'utf-8');

    await this.connectedDevice.writeCharacteristicWithResponseForService(
      BLE_CONSTANTS.FILE_SERVICE_UUID,
      BLE_CONSTANTS.FILE_DELETE_UUID,
      fileNameBytes.toString('base64')
    );

    return true;
  }

  async cancelTransfer() {
    if (!this.connectedDevice) {
      return;
    }

    try {
      // Send cancel command
      const cancelCommand = Buffer.from([BLE_CONSTANTS.TRANSFER_OP_CANCEL]);
      await this.connectedDevice.writeCharacteristicWithResponseForService(
        BLE_CONSTANTS.FILE_SERVICE_UUID,
        BLE_CONSTANTS.TRANSFER_CONTROL_UUID,
        cancelCommand.toString('base64')
      );
    } catch (error) {
      console.log('Cancel transfer error:', error);
    }

    this.cleanupTransferSubscriptions();
  }

  cleanupTransferSubscriptions() {
    if (this.transferControlSubscription) {
      this.transferControlSubscription.remove();
      this.transferControlSubscription = null;
    }
    if (this.transferDataSubscription) {
      this.transferDataSubscription.remove();
      this.transferDataSubscription = null;
    }
    if (this.transferProgressSubscription) {
      this.transferProgressSubscription.remove();
      this.transferProgressSubscription = null;
    }
  }

  // ==================== BATTERY ====================

  async getBatteryLevel() {
    if (!this.connectedDevice) {
      return null;
    }

    try {
      const characteristic = await this.connectedDevice.readCharacteristicForService(
        BLE_CONSTANTS.BATTERY_SERVICE_UUID,
        BLE_CONSTANTS.BATTERY_LEVEL_UUID
      );

      if (characteristic?.value) {
        const data = Buffer.from(characteristic.value, 'base64');
        return data[0]; // Battery level 0-100
      }
    } catch (error) {
      console.log('Battery read error:', error);
    }

    return null;
  }

  // ==================== PAIRED DEVICES ====================

  async getPairedDevices() {
    const devices = await LocalStorage.getJsonData(BLE_STORAGE_KEYS.PAIRED_DEVICES);
    return devices || [];
  }

  async addPairedDevice(device) {
    const devices = await this.getPairedDevices();
    const existingIndex = devices.findIndex(d => d.id === device.id);

    if (existingIndex >= 0) {
      devices[existingIndex] = { ...device, lastConnected: Date.now() };
    } else {
      devices.push({ ...device, lastConnected: Date.now() });
    }

    await LocalStorage.storeJsonData(BLE_STORAGE_KEYS.PAIRED_DEVICES, devices);
    return devices;
  }

  async removePairedDevice(deviceId) {
    let devices = await this.getPairedDevices();
    devices = devices.filter(d => d.id !== deviceId);
    await LocalStorage.storeJsonData(BLE_STORAGE_KEYS.PAIRED_DEVICES, devices);

    // Also remove auth key
    await this.clearStoredAuthKey(deviceId);

    return devices;
  }

  // ==================== DESTROY ====================

  destroy() {
    this.stopScan();
    this.cleanupSubscriptions();
    if (this.connectedDevice) {
      this.connectedDevice.cancelConnection().catch(() => { });
    }
    this.manager.destroy();
  }
}

const BLEService = new BLEServiceClass();
export default BLEService;
