import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { AddressCardComp, Button, Header, MainLayout } from '../../../components'
import { dummyAddresses } from '../../../Data/DummyData';
import styles from './styles'
import { Images } from '../../../assets';

const ConnectWithDollScreen = ({ navigation }) => {


    const RenderRightContent = () => {
        return (
            <Button
                text={"Connected"}
                disabled={true}
                style={styles.changePassowrd}
                textStyle={styles.changePassowrdText}
                onPress={() => { }}
            />
        )
    }

    return (
        <MainLayout>
            <Header title="Connect with doll"
                showBackButton={true}
                rightIcons={false}
                rightcontent={<RenderRightContent />}
            />

            <View style={styles.container}>
                <Image
                    source={Images.DOLL_IMAGES} // Replace with your image path
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>How To Connect !</Text>
                <Text style={styles.listItem}>
                    1. Understand the essential principles and terminologies of connectivity
                </Text>
                <Text style={styles.listItem}>
                    2. Set up and configure all necessary hardware components such as routers and modems.
                </Text>
                <Text style={styles.listItem}>
                    3. Input correct network settings like IP addresses and subnet masks on your device.
                </Text>
                <Text style={styles.listItem}>
                    4. Ensure the connection is working by performing initial tests and verifying settings.
                </Text>
                <Text style={styles.listItem}>
                    5. Address common connectivity problems through systematic troubleshooting.
                </Text>
            </View>

        </MainLayout>
    )
}

export default ConnectWithDollScreen
