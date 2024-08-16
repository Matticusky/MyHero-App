import { StyleSheet, Text, View } from 'react-native'
import styles from './styles'
import { FastImageComponent, Header, LogoutModal, MainLayout, ScreenWrapper, SettingsCardComp } from '../../../components'
import { CommonStyles, Constants, UtilityMethods } from '../../../utility';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons } from '../../../assets';
import { resetAuth } from '../../../redux/Reducers/AuthReducer';
import Routes from '../../../navigation/Routes';


const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const [loader, setLoader] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = () => {
        onPressLogout();
        setModalVisible(false);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };


    const onPressLogout = () => {
        dispatch(resetAuth())
    }

    const handleNavigation = (path) => {
        navigation.navigate(path);
    }

    return (
        <MainLayout loader={loader}>
            <Header title="Settings"
                showBackButton={true}
                rightIcons={false} />

            <ScreenWrapper style={[CommonStyles.BODY, styles.cont]}>

                <View >
                    <View style={styles.ImageCont} >
                        <FastImageComponent style={styles.imageView} source={{
                            uri: user?.profilePicture || Constants.letImagePlaceholder
                        }} />

                    </View>
                    <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </View>


                <SettingsCardComp
                    icon={<Icons.personalInfo width={UtilityMethods.wp(7)} height={UtilityMethods.wp(7)} />} // Replace with the correct icon component
                    title="Personal information"
                    description="First name, last name, & email"
                    onPress={() => handleNavigation(Routes.EDIT_PROFILE)}
                />


                <SettingsCardComp
                    icon={<Icons.familyMembers width={UtilityMethods.wp(7)} height={UtilityMethods.wp(7)} />} // Replace with the correct icon component
                    title="Family Members"
                    description="Manage your family member’s"
                    onPress={() => handleNavigation(Routes.FamilyMembersTabScreen)}
                />


                <SettingsCardComp
                    icon={<Icons.passwords width={UtilityMethods.wp(7)} height={UtilityMethods.wp(7)} />} // Replace with the correct icon component
                    title="Password & Security"
                    description="Change & forget your account password"
                    onPress={() => handleNavigation(Routes.CHANGE_PASSWORD)}
                />


                <SettingsCardComp
                    icon={<Icons.address width={UtilityMethods.wp(7)} height={UtilityMethods.wp(7)} />} // Replace with the correct icon component
                    title="Address"
                    description="Edit your address"
                    onPress={() => handleNavigation(Routes.AddressListScreen)}
                />


                <SettingsCardComp
                    icon={<Icons.doll width={UtilityMethods.wp(7)} height={UtilityMethods.wp(7)} />} // Replace with the correct icon component
                    title="Connect With Doll"
                    description="Know how to connected with the doll"
                    onPress={() => handleNavigation(Routes.ConnectWithDollScreen)}
                />


                <SettingsCardComp
                    icon={<Icons.deleteIcon width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />} // Replace with the correct icon component
                    title="Delete Account"
                    titleStyle={{ color: Colors.RED }}
                    description="Delete your account permanently"
                    descriptionStyle={{ color: Colors.RED }}
                    onPress={() => console.log('Personal information pressed')}
                />

                <SettingsCardComp
                    icon={<Icons.logoutNew width={UtilityMethods.wp(7)} height={UtilityMethods.wp(7)} />} // Replace with the correct icon component
                    title="Logout"
                    onPress={() => setModalVisible(true)}
                />


            </ScreenWrapper>

            <LogoutModal
                visible={modalVisible}
                onConfirm={handleLogout}
                onCancel={handleCancel}
            />
        </MainLayout>
    )
}

export default SettingsScreen
