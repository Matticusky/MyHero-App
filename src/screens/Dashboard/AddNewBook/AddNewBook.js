import { StyleSheet, Text, View } from 'react-native'
import styles from './styles'
import { AssetsUploaderComponent, Header, ImagePicker, MainLayout, ScreenWrapper } from '../../../components'
import { useState } from 'react';

const AddNewBook = () => {
    const [assets, setAssets] = useState([]);

    return (
        <MainLayout>
            <Header
                title={"Add book"}
                rightIcons={false}
                showBackButton={true}
            />

            <ScreenWrapper style={styles.cont}>


                <AssetsUploaderComponent
                    assets={assets}
                    setAssets={setAssets}
                />

            </ScreenWrapper>
        </MainLayout>
    )
}

export default AddNewBook
