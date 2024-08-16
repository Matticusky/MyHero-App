import { StyleSheet, Text, View } from 'react-native'
import styles from './styles'
import { AssetsUploaderComponent, Button, CoverImagePicker, CustomizedInput, Header, ImagePicker, MainLayout, ScreenWrapper } from '../../../components'
import { useState } from 'react';
import { Icons } from '../../../assets';
import { UtilityMethods } from '../../../utility';

const AddNewBook = ({ navigation }) => {
    const [coverImage, setCoverImage] = useState(null);
    const [assets, setAssets] = useState([]);

    const [bookTitle, setBookTitle] = useState({
        inputType: "text",
        title: "Book Title",
        value: "",
        type: "text",
        error: "",
        placeholder: "Enter book title",
        leftIcon: <Icons.BookIcon />
    });


    return (
        <MainLayout>
            <Header
                title={"Add book"}
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
                    onChange={(text) => {
                        setBookTitle({ ...firbookTitlestName, value: text, error: "" });
                    }}
                    style={styles.titleStyle}
                />

                <AssetsUploaderComponent
                    assets={assets}
                    setAssets={setAssets}
                />



                <View style={styles.buttonContainer}>
                    <Button
                        text={"Save Changes"}
                        style={{
                            marginTop: UtilityMethods.hp(4)
                        }}
                        onPress={() => {}}
                    />
                    <Button
                        text={"Discard"}
                        style={styles.changePassowrd}
                        textStyle={styles.changePassowrdText}
                        onPress={() => navigation.goBack()}
                    />
                </View>

            </ScreenWrapper>
        </MainLayout>
    )
}

export default AddNewBook
