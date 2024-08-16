import { FlatList, StyleSheet, Text, View } from 'react-native'
import { AddressCardComp, Button, Header, MainLayout } from '../../../components'
import { dummyAddresses } from '../../../Data/DummyData';
import styles from './styles'
import Routes from '../../../navigation/Routes';

const AddressListScreen = ({navigation}) => {

    const renderItem = ({ item }) => (
        <AddressCardComp
          locationIcon={item.locationIcon}
          editIcon={item.editIcon}
          title={item.title}
          address={item.address}
          onPress={() => console.log(`${item.title} pressed`)}
        />
      );
    


    return (
        <MainLayout>
            <Header title="Address"
                showBackButton={true}
                rightIcons={false} />

            <FlatList
                data={dummyAddresses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.contentContainerStyle}
            />

            <View style={styles.buttonContainer}>
                <Button
                    text={"Add new address"}
                    onPress={()=>{ navigation.navigate(Routes.AddAddressScreen) }}
                />
            </View>

        </MainLayout>
    )
}

export default AddressListScreen
