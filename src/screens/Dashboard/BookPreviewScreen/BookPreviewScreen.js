import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import styles from './styles';
import {
  AudioPlayComponent,
  Button,
  FastImageComponent,
  Header,
  MainLayout,
  MaterialDropDown,
  SyncWithRecorderModal,
  FileTransferModal,
} from '../../../components';
import {bookPreviewDotNenu} from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import {FontSize} from '../../../utility';
import {removeAudioFile} from '../../../redux/Reducers/AudioReducer';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import RNFS from 'react-native-fs';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import KeepAwake from 'react-native-keep-awake';
import BLEService from '../../../services/BLEService';
import AlertService from '../../../services/AlertService';
import {
  setTransferProgress,
  clearTransferState,
} from '../../../redux/Reducers/BLEReducer';

const BookPreviewScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const book = route?.params?.item;
  const audioFiles = useSelector(state => state.audio.audioFiles);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [bookAudios, setBookAudios] = useState([]);

  const {
    connectedDevice,
    pairedDevices,
    transferProgress,
    transferType,
    transferFileName,
  } = useSelector(state => state.ble);

  useEffect(() => {
    const filtered = audioFiles.filter(item => item.bookId === book._id);
    setBookAudios(filtered);
  }, [isFocused, audioFiles]);

  // Build a trackable filename: book slug + audio id
  const buildDeviceFileName = useCallback(
    audioId => {
      const slug = (book?.title || 'book')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .slice(0, 16);
      const shortId = String(audioId || '').slice(-6);
      return `${slug}_${shortId}.aac`;
    },
    [book],
  );

  // Strip file:// URI prefix to get a plain path for RNFS
  const toPlainPath = uri => {
    if (typeof uri === 'string' && uri.startsWith('file://')) {
      return uri.replace(/^file:\/\/+/, '/');
    }
    return uri;
  };

  const convertToAac = useCallback(async (inputUri, fileName) => {
    const timestamp = Date.now();
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const outputPath = `${RNFS.CachesDirectoryPath}/${baseName}_${timestamp}.aac`;

    let inputPath = toPlainPath(inputUri);
    const extension = fileName.split('.').pop() || 'tmp';
    const tempInputPath = `${RNFS.CachesDirectoryPath}/${baseName}_${timestamp}_input.${extension}`;

    if (Platform.OS === 'android' && inputUri.startsWith('content://')) {
      try {
        await RNFS.copyFile(inputUri, tempInputPath);
        inputPath = tempInputPath;
      } catch (copyError) {
        throw new Error('Failed to access audio file');
      }
    }

    console.log('AAC conversion input:', inputPath);
    const command = `-y -i "${inputPath}" -vn -c:a aac -b:a 32k -ar 16000 -ac 1 "${outputPath}"`;
    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (inputPath === tempInputPath) {
      try {
        await RNFS.unlink(tempInputPath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }

    if (ReturnCode.isSuccess(returnCode)) {
      console.log('AAC conversion output:', outputPath);
      return outputPath;
    }

    const output = await session.getOutput();
    console.log('FFmpeg AAC conversion failed:', output);
    throw new Error('Audio conversion failed');
  }, []);

  const promptConnectDevice = useCallback(() => {
    if (pairedDevices.length > 1) {
      // Multiple paired devices — let user choose which to connect
      const buttons = pairedDevices.map(d => ({
        text: d.name || d.id,
        onPress: () => navigation.navigate(Routes.ConnectWithDollScreen),
      }));
      buttons.push({text: 'Cancel', style: 'cancel'});

      Alert.alert(
        'No Device Connected',
        'Choose a device to connect to:',
        buttons,
      );
    } else {
      Alert.alert(
        'No Device Connected',
        'Please connect to a MyHero device first.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Connect',
            onPress: () => navigation.navigate(Routes.ConnectWithDollScreen),
          },
        ],
      );
    }
  }, [pairedDevices, navigation]);

  const uploadAudioToDevice = useCallback(
    async (audioPath, audioId) => {
      if (!connectedDevice) {
        promptConnectDevice();
        return;
      }

      if (!audioPath) {
        AlertService.toastPrompt('No audio file found', 'error');
        return;
      }

      try {
        setLoader(true);
        KeepAwake.activate();

        const normalizedPath = toPlainPath(audioPath);
        const deviceFileName = buildDeviceFileName(audioId);
        console.log('Uploading to device:', deviceFileName, 'from:', normalizedPath);

        // Check if file already exists on device and delete it
        try {
          const files = await BLEService.listFiles();
          const existing = files.find(f => f.name === deviceFileName);
          if (existing) {
            console.log('Replacing existing file on device:', deviceFileName);
            await BLEService.deleteFile(deviceFileName);
          }
        } catch (listError) {
          console.log('List files check skipped:', listError.message);
        }

        // Convert to AAC if needed
        let filePath = normalizedPath;
        const originalName = normalizedPath.split('/').pop() || 'audio.aac';
        const isAac = originalName.toLowerCase().endsWith('.aac');

        if (!isAac) {
          AlertService.toastPrompt('Converting to AAC format...');
          filePath = await convertToAac(normalizedPath, originalName);
        } else if (
          Platform.OS === 'android' &&
          audioPath.startsWith('content://')
        ) {
          const localPath =
            `${RNFS.CachesDirectoryPath}/upload_${Date.now()}.aac`;
          await RNFS.copyFile(audioPath, localPath);
          filePath = localPath;
        }

        dispatch(
          setTransferProgress({
            progress: 0,
            type: 'upload',
            fileName: deviceFileName,
          }),
        );

        await BLEService.uploadFile(
          filePath,
          progress => {
            dispatch(
              setTransferProgress({
                progress,
                type: 'upload',
                fileName: deviceFileName,
              }),
            );
          },
          deviceFileName,
        );

        dispatch(clearTransferState());
        AlertService.toastPrompt('Recording sent to device');
      } catch (error) {
        dispatch(clearTransferState());
        console.log('Upload to device error:', error);
        AlertService.toastPrompt(
          error.message || 'Failed to send recording',
          'error',
        );
      } finally {
        setLoader(false);
        KeepAwake.deactivate();
      }
    },
    [connectedDevice, dispatch, buildDeviceFileName, promptConnectDevice, convertToAac],
  );

  const handleSyncWithRecorder = useCallback(
    async audioPath => {
      // Find the audio item to get its _id for trackable naming
      const audioItem = bookAudios.find(a => a.audioPath === audioPath);
      await uploadAudioToDevice(audioPath, audioItem?._id).catch(err => {
        console.log('Sync error:', err);
        AlertService.toastPrompt(
          err.message || 'Failed to send recording',
          'error',
        );
      });
    },
    [bookAudios, uploadAudioToDevice],
  );

  const handleSyncButtonPress = () => {
    if (!connectedDevice) {
      promptConnectDevice();
      return;
    }

    if (bookAudios.length === 0) {
      AlertService.toastPrompt('No recordings to sync', 'error');
      return;
    }

    setModalVisible(true);
  };

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

  const onPressMenu = value => {
    switch (value) {
      case 'share':
        break;
      case 'edit':
        navigateToEdit();
        break;
      case 'save':
        saveBook();
        break;
      case 'upload':
        uploadBook();
        break;
      case 'delete':
        deleteItem();
        break;
      default:
        break;
    }
  };

  const navigateToEdit = () => {
    navigation.navigate(Routes.AddNewBook, {isEdited: true});
  };
  const saveBook = () => {
    Alert.alert('Success', 'Book saved successfully...');
  };
  const uploadBook = () => {
    Alert.alert('Success', 'Book uploaded successfully...');
  };
  const deleteItem = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this item', [
      {text: 'No'},
      {text: 'Yes'},
    ]);
  };

  const RightDotButton = () => {
    return (
      <MaterialDropDown
        menuData={bookPreviewDotNenu}
        onPress={onPressMenu}
        onRequestClose={() => {
          console.log('close');
        }}
      />
    );
  };

  return (
    <MainLayout loader={loader}>
      <Header
        title={'Book Preview'}
        rightIcons={false}
        rightcontent={<RightDotButton />}
      />
      <View style={styles.cardContainer}>
        <FastImageComponent source={book?.image} style={styles.bookImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          <TouchableOpacity
            style={[
              styles.syncButton,
              connectedDevice && styles.syncButtonConnected,
            ]}
            onPress={handleSyncButtonPress}>
            <Text style={styles.syncButtonText}>
              {connectedDevice ? 'Send to Device' : 'Sync With Recorder'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={bookAudios}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={styles.audioTitle}>Recorded Audios</Text>
        }
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <AudioPlayComponent
            _id={item?._id}
            user={item?.user}
            audioUri={item?.audioPath}
            duration={item?.duration}
            onDeleteAudio={id => dispatch(removeAudioFile(id))}
            setBookAudios={setBookAudios}
            handleSyncWithRecorder={handleSyncWithRecorder}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.bookTitle, {fontSize: FontSize.VALUE(12)}]}>
            No audio found...
          </Text>
        }
      />

      <View style={styles.buttonContainer}>
        <Button
          text={'Record new audio'}
          onPress={() => {
            navigation.navigate(Routes.RecordAudioScreen, {bookId: book?._id});
          }}
        />
      </View>

      <SyncWithRecorderModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        data={bookAudios}
        onSync={handleSyncWithRecorder}
      />

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

export default BookPreviewScreen;
