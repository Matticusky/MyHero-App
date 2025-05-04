import {TouchableOpacity, View, Text, FlatList, Alert} from 'react-native';
import styles from './styles';
import {
  AudioPlayComponent,
  Button,
  FastImageComponent,
  Header,
  MainLayout,
  MaterialDropDown,
  SyncWithRecorderModal,
} from '../../../components';
import {audioData, bookPreviewDotNenu} from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import {useContext, useEffect, useState} from 'react';
import {AUDIO_CONTEXT} from '../../../../App';
import {FontSize} from '../../../utility';
import {useIsFocused} from '@react-navigation/native';
import TcpSocket from 'react-native-tcp-socket';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

const BookPreviewScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const book = route?.params?.item;
  let {audioFiles, setAudioFiles} = useContext(AUDIO_CONTEXT);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const [bookAudios, setBookAudios] = useState([]);

  const ESP32_IP = '192.168.4.1'; // Default IP if ESP32 is in AP mode
  const ESP32_PORT = 8080;
  let client = null;
  const [isConnected, setIsConnected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const bookAudios = audioFiles.filter(item => item.bookId === book._id);
    setBookAudios(bookAudios);

    return () => {
      if (client) {
        client.destroy();
      }
    };
  }, [isFocused]);

  const handleSyncWithRecorder = async audioPath => {
    try {
      setLoader(true);
      const fileData = await RNFS.readFile(audioPath, 'base64');
      const binaryData = Buffer.from(fileData, 'base64');
      const deviceIp = '192.168.89.162';
      const chunkSize = 4096;
      let offset = 0;

      const client = TcpSocket.createConnection(
        {
          host: deviceIp,
          port: 80,
          keepAlive: true,
          timeout: 90000,
          noDelay: true,
        },
        () => {
          console.log('Connected to ESP32!');

          const sendNextChunk = () => {
            if (offset < binaryData.length) {
              const end = Math.min(offset + chunkSize, binaryData.length);
              const chunk = binaryData.slice(offset, end);
              client.write(chunk);
              client.once('data', data => {
                if (
                  data.toString().trim() === 'OK' ||
                  data.toString().trim() === 'OKOK'
                ) {
                  console.log('Chunk acknowledged, sending next chunk');
                  offset = end;
                  sendNextChunk();
                } else {
                  console.error('Unexpected response:', data.toString());
                }
              });
            } else {
              client.write(Buffer.from('ND'));
              console.log('File sent successfully');
              client.destroy();
            }
          };

          sendNextChunk();
        },
      );

      client.on('error', error => {
        console.error('Connection error:', error);
      });

      client.on('close', () => {
        console.log('Connection closed');
        setLoader(false);
      });
    } catch (error) {
      Alert.alert('Failed to send file to device', error.message);
    } finally {
      setLoader(false);
    }
  };

  // Connect to ESP32
  const connectToESP32 = () => {
    try {
      client = TcpSocket.createConnection(
        {
          host: ESP32_IP,
          port: ESP32_PORT,
        },
        () => {
          console.log('Connected to ESP32');
          setIsConnected(true);
          Alert.alert('Connected', 'Successfully connected to ESP32');
        },
      );

      client.on('error', error => {
        console.error('Connection error', error);
        setIsConnected(false);
        Alert.alert('Connection Error', 'Failed to connect to ESP32');
      });

      client.on('close', () => {
        console.log('Connection closed');
        setIsConnected(false);
      });

      client.on('data', data => {
        console.log('Received from ESP32:', data.toString());
        if (data.toString().includes('UPLOAD_SUCCESS')) {
          Alert.alert('Success', 'Audio file transferred successfully!');
          setIsUploading(false);
          setUploadProgress(0);
        }
      });
    } catch (error) {
      console.error('Failed to create connection', error);
      Alert.alert(
        'Connection Error',
        'Failed to establish connection to ESP32',
      );
    } finally {
      setLoader(false);
    }
  };

  // Transfer audio file to ESP32
  const transferAudioToESP32 = async recordedFilePath => {
    if (!isConnected) {
      Alert.alert('Not Connected', 'Please connect to ESP32 first');
      return;
    }

    if (!recordedFilePath) {
      Alert.alert('No Recording', 'Please record audio first');
      return;
    }

    try {
      setLoader(true);
      setIsUploading(true);
      setUploadProgress(0);

      // Read the file content
      const fileContent = await RNFS.readFile(recordedFilePath, 'base64');

      // File size for progress calculation
      const stats = await RNFS.stat(recordedFilePath);
      const fileSize = stats.size;

      // Prepare file transfer header with metadata
      const fileHeader = JSON.stringify({
        fileName: 'recording.wav',
        fileSize: fileSize,
        fileType: 'audio/wav',
        encoding: 'base64',
      });

      // Send header first
      client?.write(fileHeader + '\n');

      // Send file in chunks to avoid memory issues
      const chunkSize = 4096; // 4KB chunks
      const totalChunks = Math.ceil(fileContent.length / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const chunk = fileContent.substring(i * chunkSize, (i + 1) * chunkSize);

        // Send chunk
        client?.write(chunk);

        // Update progress
        const progress = Math.min(((i + 1) / totalChunks) * 100, 99);
        setUploadProgress(progress);

        // Small delay to prevent overwhelming the ESP32
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Send end of file marker
      client?.write('\nEND_OF_FILE\n');

      console.log('File transfer initiated');

      // The final confirmation comes from the ESP32's response in the data event handler
    } catch (error) {
      console.error('Failed to transfer file', error);
      setIsUploading(false);
      Alert.alert('Transfer Error', 'Failed to transfer audio file');
    } finally {
      setLoader(false);
    }
  };

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
  const filterAudios = () => {};

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
            style={styles.syncButton}
            onPress={() => {
              // setModalVisible(true);
              connectToESP32();
            }}>
            <Text style={styles.syncButtonText}>
              {isConnected ? 'Connected ' : 'Sync With Recorder'}
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
            setAudioFiles={setAudioFiles}
            setBookAudios={setBookAudios}
            handleSyncWithRecorder={transferAudioToESP32}
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
        onSync={transferAudioToESP32}
      />
    </MainLayout>
  );
};

export default BookPreviewScreen;
