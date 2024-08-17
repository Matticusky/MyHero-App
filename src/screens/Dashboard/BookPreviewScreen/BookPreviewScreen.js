import { TouchableOpacity, View, Text, FlatList } from 'react-native'
import styles from './styles'
import { AudioPlayComponent, Button, FastImageComponent, Header, MainLayout } from '../../../components'
import { audioData } from '../../../Data/DummyData'
import Routes from '../../../navigation/Routes'


const BookPreviewScreen = ({ navigation, route }) => {
  const book = route?.params?.item

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
        data={audioData}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={styles.audioTitle}>Recorded Audios</Text>
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AudioPlayComponent
            user={item.user}
            audioUri={item.audioUri}
            duration={item.duration}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          text={"Record new audio"}
          onPress={() => { navigation.navigate(Routes.AddAddressScreen) }}
        />
      </View>

    </MainLayout>
  )
}

export default BookPreviewScreen
