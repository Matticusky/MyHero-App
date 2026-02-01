import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

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
      AlertService.toastPrompt('Device disconnected');
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

  const convertToWav = async (inputPath, fileName) => {
    const timestamp = Date.now();
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const outputPath = `${RNFS.CachesDirectoryPath}/${baseName}_${timestamp}.wav`;

    const command = `-i "${inputPath}" -acodec pcm_s16le -ar 44100 "${outputPath}"`;

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      return outputPath;
    }
    throw new Error('Audio conversion failed');
  };

  const handleUploadFile = useCallback(async () => {
    try {
      // Pick audio file
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      const file = result[0];
      let filePath = file.uri;
      let fileName = file.name || 'audio.wav';

      // Check if WAV, convert if not
      const isWav = fileName.toLowerCase().endsWith('.wav');
      if (!isWav) {
        AlertService.toastPrompt('Converting to WAV format...');
        try {
          filePath = await convertToWav(filePath, fileName);
          fileName = fileName.replace(/\.[^.]+$/, '.wav');
        } catch (convError) {
          AlertService.toastPrompt('Failed to convert audio', 'error');
          return;
        }
      }

      // Start upload
      dispatch(
        setTransferProgress({
          progress: 0,
          type: 'upload',
          fileName: fileName,
        })
      );

      await BLEService.uploadFile(filePath, (progress) => {
        dispatch(
          setTransferProgress({
            progress,
            type: 'upload',
            fileName: fileName,
          })
        );
      });

      dispatch(clearTransferState());
      AlertService.toastPrompt('File uploaded successfully');

      // Refresh file list
      handleViewFiles();
    } catch (error) {
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

      try {
        const docsPath = RNFS.DocumentDirectoryPath;
        const destinationPath = `${docsPath}/${file.name}`;
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
        AlertService.toastPrompt(`Downloaded: ${file.name}`);
      } catch (error) {
        console.log('=== handleDownloadFile ERROR ===');
        console.log('Error:', error.message || error);
        dispatch(clearTransferState());
        AlertService.toastPrompt(error.message || 'Download failed', 'error');
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
