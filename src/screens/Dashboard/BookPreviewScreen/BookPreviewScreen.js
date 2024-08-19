import { TouchableOpacity, View, Text, FlatList } from 'react-native'
import styles from './styles'
import { AudioPlayComponent, Button, FastImageComponent, Header, MainLayout } from '../../../components'
import { audioData } from '../../../Data/DummyData'
import Routes from '../../../navigation/Routes'
import { useContext, useEffect, useState } from 'react'
import { AUDIO_CONTEXT } from '../../../../App'
import { FontSize } from '../../../utility'
import { useIsFocused } from '@react-navigation/native'


const BookPreviewScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const book = route?.params?.item
  let {audioFiles,} = useContext(AUDIO_CONTEXT)

  console.log(audioFiles)
  const [bookAudios, setBookAudios] = useState([])

  useEffect(()=>{
    const bookAudios = audioFiles.filter(item => item.bookId === book._id)
    setBookAudios(bookAudios)
  },[isFocused])


  return (
    <MainLayout>
      <Header title={"Book Preview"} rightIcons={false} />
      <View style={styles.cardContainer}>
        <FastImageComponent source={book?.image} style={styles.bookImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.bookTitle}>{book.title}:</Text>
          <TouchableOpacity style={styles.syncButton} onPress={() => { }}>
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
            user={item.user}
            audioUri={item.audioPath}
            duration={item.duration}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.bookTitle, {fontSize:FontSize.VALUE(12)}]}>No audio found...</Text>
        }
      />

      <View style={styles.buttonContainer}>
        <Button
          text={"Record new audio"}
          onPress={() => { navigation.navigate(Routes.RecordAudioScreen, {bookId:book?._id}) }}
        />
      </View>

    </MainLayout>
  )
}

export default BookPreviewScreen
