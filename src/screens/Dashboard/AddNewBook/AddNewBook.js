import {Alert, StyleSheet, Text, View} from 'react-native';
import styles from './styles';
import {
  AssetsUploaderComponent,
  Button,
  CoverImagePicker,
  CustomizedInput,
  Header,
  ImagePicker,
  MainLayout,
  ScreenWrapper,
} from '../../../components';
import {useState} from 'react';
import {Icons} from '../../../assets';
import {UtilityMethods} from '../../../utility';

const AddNewBook = ({navigation, route}) => {
  const [coverImage, setCoverImage] = useState(null);
  const [assets, setAssets] = useState([]);
  const isEdited = route?.params;

  const [bookTitle, setBookTitle] = useState({
    inputType: 'text',
    title: 'Book Title',
    value: '',
    type: 'text',
    error: '',
    placeholder: 'Enter book title',
    leftIcon: <Icons.BookIcon />,
  });

  const handleDiscard = () => {
    Alert.alert('Warning', 'Are you sure you want to discard?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <MainLayout>
      <Header
        title={isEdited ? 'Edit book' : 'Add book'}
        rightIcons={false}
        showBackButton={true}
      />

      <ScreenWrapper style={styles.cont}>
        <CoverImagePicker
          coverImage={coverImage}
          setCoverImage={setCoverImage}
        />

        <CustomizedInput
          fieldInfo={bookTitle}
          onChange={text => {
            setBookTitle({...bookTitle, value: text, error: ''});
          }}
          style={styles.titleStyle}
        />

        <AssetsUploaderComponent assets={assets} setAssets={setAssets} />

        <View style={styles.buttonContainer}>
          <Button
            text={isEdited ? 'Edit Changes' : 'Save Changes'}
            style={{
              marginTop: UtilityMethods.hp(4),
            }}
            onPress={() => {}}
          />
          <Button
            text={'Discard'}
            style={styles.changePassowrd}
            textStyle={styles.changePassowrdText}
            onPress={handleDiscard}
          />
        </View>
      </ScreenWrapper>
    </MainLayout>
  );
};

export default AddNewBook;
