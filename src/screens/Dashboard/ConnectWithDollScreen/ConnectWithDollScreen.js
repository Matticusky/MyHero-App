import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import KeepAwake from 'react-native-keep-awake';

import {
  Button,
  Header,
  MainLayout,
  CustomFlatList,
  EmptyComponent,
  DeviceCardComp,
  ScanningModal,
  FileListModal,
  FileTransferModal,
} from '../../../components';

import BLEService from '../../../services/BLEService';
import AlertService from '../../../services/AlertService';

import {
  setScanningState,
  addDiscoveredDevice,
  clearDiscoveredDevices,
  setConnectingState,
  setConnectedDevice,
  setAuthenticated,
  disconnectDevice,
  addPairedDevice,
  removePairedDevice,
  setDeviceFiles,
  setLoadingFiles,
  removeDeviceFile,
  setTransferProgress,
  clearTransferState,
} from '../../../redux/Reducers/BLEReducer';

import styles from './styles';
import { Icons } from '../../../assets';
import { UtilityMethods } from '../../../utility';

const ConnectWithDollScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Redux state
  const {
    isScanning,
    discoveredDevices,
    connectedDevice,
    isConnecting,
    pairedDevices,
    deviceFiles,
    isLoadingFiles,
    transferProgress,
    transferType,
    transferFileName,
  } = useSelector((state) => state.ble);

  // Local state
  const [loader, setLoader] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      BLEService.stopScan();
    };
  }, []);

  // ==================== SCANNING ====================

  const handleStartScan = useCallback(async () => {
    dispatch(clearDiscoveredDevices());
    dispatch(setScanningState(true));
    setScanModalVisible(true);

    await BLEService.startScan(
      (device) => dispatch(addDiscoveredDevice(device)),
      () => dispatch(setScanningState(false)),
      (error) => {
        dispatch(setScanningState(false));
        AlertService.toastPrompt(error, 'error');
      }
    );
  }, [dispatch]);

  const handleStopScan = useCallback(() => {
    BLEService.stopScan();
    dispatch(setScanningState(false));
  }, [dispatch]);

  // ==================== CONNECTION ====================

  const handleConnectDevice = useCallback(
    async (device) => {
      setScanModalVisible(false);
      dispatch(setConnectingState(true));
      setLoader(true);

      try {
        await BLEService.connectToDevice(device.id);
        await BLEService.authenticate(device.id);

        const batteryLevel = await BLEService.getBatteryLevel();

        dispatch(
          setConnectedDevice({
            id: device.id,
            name: device.name,
            batteryLevel,
          })
        );
        dispatch(setAuthenticated(true));
        dispatch(addPairedDevice(device));

        AlertService.toastPrompt('Device connected successfully');
      } catch (error) {
        console.log('Connection error:', error);
        AlertService.toastPrompt(
          error.message || 'Connection failed',
          'error'
        );
        dispatch(disconnectDevice());
      } finally {
        dispatch(setConnectingState(false));
        setLoader(false);
      }
    },
    [dispatch]
  );

  const handleDisconnect = useCallback(async () => {
    try {
      await BLEService.disconnectDevice();
      dispatch(disconnectDevice());
      // Toast is handled by BLEService.onDisconnected callback
    } catch (error) {
      AlertService.toastPrompt(error.message, 'error');
    }
  }, [dispatch]);

  const handleRemovePairedDevice = useCallback(
    async (deviceId) => {
      try {
        await AlertService.confirm(
          'Remove this device from paired devices?',
          'Remove',
          'Cancel',
          'Remove Device'
        );

        if (connectedDevice?.id === deviceId) {
          await handleDisconnect();
        }
        await BLEService.removePairedDevice(deviceId);
        dispatch(removePairedDevice(deviceId));
        AlertService.toastPrompt('Device removed');
      } catch (error) {
        // User cancelled
      }
    },
    [connectedDevice, dispatch, handleDisconnect]
  );

  // ==================== FILE OPERATIONS ====================

  const handleViewFiles = useCallback(async () => {
    if (!connectedDevice) {
      AlertService.toastPrompt('No device connected', 'error');
      return;
    }

    setFileModalVisible(true);
    dispatch(setLoadingFiles(true));

    try {
      const files = await BLEService.listFiles();
      dispatch(setDeviceFiles(files));
    } catch (error) {
      console.log('List files error:', error);
      AlertService.toastPrompt('Failed to load files', 'error');
      dispatch(setDeviceFiles([]));
    } finally {
      dispatch(setLoadingFiles(false));
    }
  }, [connectedDevice, dispatch]);

  const convertToAac = async (inputUri, fileName) => {
    const timestamp = Date.now();
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const outputPath = `${RNFS.CachesDirectoryPath}/${baseName}_${timestamp}.aac`;

    // On Android, content:// URIs need to be copied to a local file first
    let inputPath = inputUri;
    const extension = fileName.split('.').pop() || 'tmp';
    const tempInputPath = `${RNFS.CachesDirectoryPath}/${baseName}_${timestamp}_input.${extension}`;

    if (Platform.OS === 'android' && inputUri.startsWith('content://')) {
      try {
        await RNFS.copyFile(inputUri, tempInputPath);
        inputPath = tempInputPath;
        console.log('Copied file to:', inputPath);
      } catch (copyError) {
        console.log('Failed to copy file:', copyError);
        throw new Error('Failed to access audio file');
      }
    }

    // Convert to AAC format (device expects .aac files per BLE_Integration_Guide.md)
    // -y: overwrite output without asking
    // -vn: no video (audio only)
    // -c:a aac: use AAC codec
    // -b:a 32k: 32kbps bitrate
    // -ar 16000: 16kHz sample rate
    // -ac 1: mono (1 channel)
    const command = `-y -i "${inputPath}" -vn -c:a aac -b:a 32k -ar 16000 -ac 1 "${outputPath}"`;
    console.log('FFmpeg command:', command);

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();
    const output = await session.getOutput();
    console.log('FFmpeg output:', output);

    // Clean up temp input file
    if (inputPath === tempInputPath) {
      try {
        await RNFS.unlink(tempInputPath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }

    if (ReturnCode.isSuccess(returnCode)) {
      return outputPath;
    }

    console.log('FFmpeg failed with return code:', returnCode);
    throw new Error('Audio conversion failed');
  };

  // Generate short filename for upload (recording_NNNN.aac pattern)
  const generateShortFilename = () => {
    const num = Math.floor(Math.random() * 10000);
    return `rec_${num.toString().padStart(4, '0')}.aac`;
  };

  const handleUploadFile = useCallback(async () => {
    try {
      // Pick audio file
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      const file = result[0];
      let filePath = file.uri;
      // Generate a short filename for the device
      let fileName = generateShortFilename();

      // Check if AAC, convert if not (device expects .aac files per BLE_Integration_Guide.md)
      const originalName = file.name || 'audio.aac';
      const isAac = originalName.toLowerCase().endsWith('.aac');
      if (!isAac) {
        AlertService.toastPrompt('Converting to AAC format...');
        try {
          filePath = await convertToAac(filePath, originalName);
        } catch (convError) {
          console.log('Conversion error:', convError);
          AlertService.toastPrompt('Failed to convert audio', 'error');
          return;
        }
      } else if (Platform.OS === 'android' && filePath.startsWith('content://')) {
        // AAC file but content:// URI - copy to local path
        const timestamp = Date.now();
        const localPath = `${RNFS.CachesDirectoryPath}/upload_${timestamp}.aac`;
        try {
          await RNFS.copyFile(filePath, localPath);
          filePath = localPath;
          console.log('Copied AAC file to:', filePath);
        } catch (copyError) {
          console.log('Failed to copy file:', copyError);
          AlertService.toastPrompt('Failed to access audio file', 'error');
          return;
        }
      }

      // Keep screen awake during transfer
      KeepAwake.activate();

      // Start upload
      dispatch(
        setTransferProgress({
          progress: 0,
          type: 'upload',
          fileName: fileName,
        })
      );

      try {
        await BLEService.uploadFile(filePath, (progress) => {
          dispatch(
            setTransferProgress({
              progress,
              type: 'upload',
              fileName: fileName,
            })
          );
        }, fileName);

        dispatch(clearTransferState());
        AlertService.toastPrompt('File uploaded successfully');

        // Refresh file list
        handleViewFiles();
      } finally {
        // Allow screen to sleep again
        KeepAwake.deactivate();
      }
    } catch (error) {
      KeepAwake.deactivate();
      dispatch(clearTransferState());
      if (!DocumentPicker.isCancel(error)) {
        console.log('Upload error:', error);
        AlertService.toastPrompt(error.message || 'Upload failed', 'error');
      }
    }
  }, [dispatch, handleViewFiles]);

  const handleDownloadFile = useCallback(
    async (file) => {
      console.log('=== handleDownloadFile START ===');
      console.log('File to download:', JSON.stringify(file));

      // Keep screen awake during transfer
      KeepAwake.activate();

      try {
        // Use Downloads folder on Android, Documents on iOS
        const downloadPath = Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath;
        const destinationPath = `${downloadPath}/${file.name}`;
        console.log('Destination path:', destinationPath);

        dispatch(
          setTransferProgress({
            progress: 0,
            type: 'download',
            fileName: file.name,
          })
        );
        console.log('Transfer progress state set to 0%');

        console.log('Calling BLEService.downloadFile...');
        await BLEService.downloadFile(file.name, destinationPath, (progress) => {
          console.log('Progress callback received:', Math.round(progress * 100) + '%');
          dispatch(
            setTransferProgress({
              progress,
              type: 'download',
              fileName: file.name,
            })
          );
        });

        console.log('=== handleDownloadFile SUCCESS ===');
        dispatch(clearTransferState());
        const folderName = Platform.OS === 'android' ? 'Downloads' : 'Documents';
        AlertService.toastPrompt(`Saved to ${folderName}: ${file.name}`);
      } catch (error) {
        console.log('=== handleDownloadFile ERROR ===');
        console.log('Error:', error.message || error);
        dispatch(clearTransferState());
        AlertService.toastPrompt(error.message || 'Download failed', 'error');
      } finally {
        // Allow screen to sleep again
        KeepAwake.deactivate();
      }
    },
    [dispatch]
  );

  const handleDeleteFile = useCallback(
    async (file) => {
      try {
        await AlertService.confirm(
          `Delete "${file.name}" from device?`,
          'Delete',
          'Cancel',
          'Delete File'
        );

        await BLEService.deleteFile(file.name);
        dispatch(removeDeviceFile(file.name));
        AlertService.toastPrompt('File deleted');
      } catch (error) {
        // User cancelled or error
        if (error?.message) {
          AlertService.toastPrompt(error.message || 'Delete failed', 'error');
        }
      }
    },
    [dispatch]
  );

  const handleCancelTransfer = useCallback(async () => {
    try {
      await BLEService.cancelTransfer();
      dispatch(clearTransferState());
      AlertService.toastPrompt('Transfer cancelled');
    } catch (error) {
      console.log('Cancel transfer error:', error);
      dispatch(clearTransferState());
    }
  }, [dispatch]);

  // ==================== RENDER ====================

  const renderDevice = ({ item }) => (
    <DeviceCardComp
      device={item}
      isConnected={connectedDevice?.id === item.id}
      batteryLevel={
        connectedDevice?.id === item.id ? connectedDevice.batteryLevel : null
      }
      onPress={() =>
        connectedDevice?.id !== item.id && handleConnectDevice(item)
      }
      onDisconnect={handleDisconnect}
      onViewFiles={handleViewFiles}
    />
  );

  const RenderRightContent = () => (
    <Button
      text={connectedDevice ? 'Connected' : 'Disconnected'}
      disabled={true}
      style={[
        styles.statusButton,
        connectedDevice && styles.statusButtonConnected,
      ]}
      textStyle={[
        styles.statusButtonText,
        connectedDevice && styles.statusButtonTextConnected,
      ]}
      onPress={() => {}}
    />
  );

  return (
    <MainLayout loader={loader || isConnecting}>
      <Header
        title="Connect with doll"
        showBackButton={true}
        rightIcons={false}
        rightcontent={<RenderRightContent />}
      />

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>My Devices</Text>

        <CustomFlatList
          data={pairedDevices}
          renderItem={renderDevice}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyComponent
              title="No Devices"
              desc="Tap 'Add Device' to scan for nearby MyHero devices"
            />
          }
        />

        <View style={styles.bottomButtonContainer}>
          <Button
            text="Add Device"
            LeftIcon={
              <Icons.Add
                width={UtilityMethods.wp(4)}
                height={UtilityMethods.wp(4)}
              />
            }
            style={styles.addButton}
            textStyle={styles.addButtonText}
            onPress={handleStartScan}
          />
        </View>
      </View>

      {/* Scanning Modal */}
      <ScanningModal
        isVisible={scanModalVisible}
        onClose={() => {
          setScanModalVisible(false);
          handleStopScan();
        }}
        isScanning={isScanning}
        devices={discoveredDevices}
        onSelectDevice={handleConnectDevice}
        onStopScan={handleStopScan}
        onStartScan={handleStartScan}
      />

      {/* File List Modal */}
      <FileListModal
        isVisible={fileModalVisible}
        onClose={() => setFileModalVisible(false)}
        files={deviceFiles}
        isLoading={isLoadingFiles}
        onUpload={handleUploadFile}
        onDownload={handleDownloadFile}
        onDelete={handleDeleteFile}
        onRefresh={handleViewFiles}
      />

      {/* File Transfer Modal */}
      <FileTransferModal
        isVisible={transferType !== null}
        progress={transferProgress}
        type={transferType}
        fileName={transferFileName}
        onCancel={handleCancelTransfer}
      />
    </MainLayout>
  );
};

export default ConnectWithDollScreen;
