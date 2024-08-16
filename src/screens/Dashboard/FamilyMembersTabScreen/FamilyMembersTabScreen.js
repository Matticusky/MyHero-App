import { FlatList, StyleSheet, Text, View } from 'react-native'
import { AddressCardComp, Button, Header, MainLayout } from '../../../components'
import { dummyAddresses } from '../../../Data/DummyData';
import styles from './styles'
import Routes from '../../../navigation/Routes';
import FamilyMemberTopBar from '../../../navigation/Stacks/FamilyMemberTopBar';

const FamilyMembersTabScreen = ({navigation}) => {

    const RenderRightContent = () => {
        return (
            <Button
                text={"Add"}
                style={styles.changePassowrd}
                textStyle={styles.changePassowrdText}
                onPress={() => {navigation.navigate(Routes.AddMembersScreen) }}
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

            <FamilyMemberTopBar/>

        </MainLayout>
    )
}

export default FamilyMembersTabScreen
