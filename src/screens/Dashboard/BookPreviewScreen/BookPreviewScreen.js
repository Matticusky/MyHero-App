import { TouchableOpacity, View, Text, FlatList, Alert } from 'react-native'
import styles from './styles'
import { AudioPlayComponent, Button, FastImageComponent, Header, MainLayout, MaterialDropDown, SyncWithRecorderModal } from '../../../components'
import { audioData, bookPreviewDotNenu } from '../../../Data/DummyData'
import Routes from '../../../navigation/Routes'
import { useContext, useEffect, useState } from 'react'
import { AUDIO_CONTEXT } from '../../../../App'
import { FontSize } from '../../../utility'
import { useIsFocused } from '@react-navigation/native'
import TcpSocket from 'react-native-tcp-socket';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';



const BookPreviewScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const book = route?.params?.item
  let { audioFiles, setAudioFiles } = useContext(AUDIO_CONTEXT)
  const [isModalVisible, setModalVisible] = useState(false)
  const [loader, setLoader] = useState(false)

  const [bookAudios, setBookAudios] = useState([])

  useEffect(() => {
    const bookAudios = audioFiles.filter(item => item.bookId === book._id)
    setBookAudios(bookAudios)
  }, [isFocused])

  const handleSyncWithRecorder = async (audioPath) => {
    try {
      setLoader(true)
      const fileData = await RNFS.readFile(audioPath, 'base64');
      const binaryData = Buffer.from(fileData, 'base64');
      const deviceIp = '192.168.89.162';
      const chunkSize = 4096;
      let offset = 0;

      const client = TcpSocket.createConnection({
        host: deviceIp,
        port: 80,
        keepAlive: true,
        timeout: 90000,
        noDelay: true,
      }, () => {
        console.log('Connected to ESP32!');

        const sendNextChunk = () => {
          if (offset < binaryData.length) {
            const end = Math.min(offset + chunkSize, binaryData.length);
            const chunk = binaryData.slice(offset, end);
            client.write(chunk);
            client.once('data', (data) => {
              if (data.toString().trim() === 'OK' || data.toString().trim() === 'OKOK') {
                console.log('Chunk acknowledged, sending next chunk');
                offset = end;
                sendNextChunk();
              } else {
                console.error('Unexpected response:', data.toString());
              }
            });
          } else {
            client.write(Buffer.from("ND"));
            console.log('File sent successfully');
            client.destroy();
          }
        };

        sendNextChunk();
      });

      client.on('error', (error) => {
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

  }

  const onPressMenu = (value) => {
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
        uploadBook()
        break;
      case 'delete':
        deleteItem();
        break;
      default:
        break;
    }
  }

  const navigateToEdit = () => {
    navigation.navigate(Routes.AddNewBook, { isEdited: true })
  }
  const saveBook = () => {
    Alert.alert("Success", "Book saved successfully...");
  }
  const uploadBook = () => {
    Alert.alert("Success", "Book uploaded successfully...");
  }
  const deleteItem = () => {
    Alert.alert("Warning", "Are you sure you want to delete this item", [{ text: "No" }, { text: 'Yes', }])
  }
  const filterAudios = () => {

    
  }

  const RightDotButton = () => {
    return (
      <MaterialDropDown
        menuData={bookPreviewDotNenu}
        onPress={onPressMenu}
        onRequestClose={() => {
          console.log("close")
        }}
      />
    )
  }


  return (
    <MainLayout loader={loader}>
      <Header title={"Book Preview"} rightIcons={false} rightcontent={<RightDotButton />} />
      <View style={styles.cardContainer}>
        <FastImageComponent source={book?.image} style={styles.bookImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <TouchableOpacity style={styles.syncButton} onPress={() => { setModalVisible(true) }}>
            <Text style={styles.syncButtonText}>Sync With Recorder</Text>
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={bookAudios}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={styles.audioTitle}>Recorded Audios</Text>
        }
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AudioPlayComponent
            _id={item?._id}
            user={item?.user}
            audioUri={item?.audioPath}
            duration={item?.duration}
            setAudioFiles={setAudioFiles}
            setBookAudios={setBookAudios}
            handleSyncWithRecorder={handleSyncWithRecorder}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.bookTitle, { fontSize: FontSize.VALUE(12) }]}>No audio found...</Text>
        }
      />

      <View style={styles.buttonContainer}>
        <Button
          text={"Record new audio"}
          onPress={() => { navigation.navigate(Routes.RecordAudioScreen, { bookId: book?._id }) }}
        />
      </View>

      <SyncWithRecorderModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        data={bookAudios}
        onSync={handleSyncWithRecorder}
      />
    </MainLayout>
  )
}

export default BookPreviewScreen
