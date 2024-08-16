//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
/// ====================================== Local Imported Files ======================================//
import { useDispatch } from 'react-redux';
// import {Home,Attendance,EditProfile,ExcuseAttandence} from '../../screens';
import Routes from '../Routes';
import {BottomTab, } from "./index"
import { AddAddressScreen, AddMembersScreen, AddNewBook, AddressListScreen, ChangePassword, ConnectWithDollScreen, EditProfile, FamilyMembersStatusScreen, FamilyMembersTabScreen, SettingsScreen,} from "../../screens";


const Stack = createNativeStackNavigator();

const StudentStack = () => {
  const dispatch = useDispatch();
   return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    
    >
      {/* <Stack.Screen name={Routes.DRAWER_NAVIGATOR} component={DrawerNavigator} /> */}
      <Stack.Screen name={Routes.BOTTOM_TAB} component={BottomTab} />
      <Stack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={Routes.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={Routes.SettingsScreen} component={SettingsScreen} />
      <Stack.Screen name={Routes.AddressListScreen} component={AddressListScreen} />
      <Stack.Screen name={Routes.AddAddressScreen} component={AddAddressScreen} />
      <Stack.Screen name={Routes.ConnectWithDollScreen} component={ConnectWithDollScreen} />
      <Stack.Screen name={Routes.FamilyMembersTabScreen} component={FamilyMembersTabScreen} />
      <Stack.Screen name={Routes.FamilyMembersStatusScreen} component={FamilyMembersStatusScreen} />
      <Stack.Screen name={Routes.AddMembersScreen} component={AddMembersScreen} />
      <Stack.Screen name={Routes.AddNewBook} component={AddNewBook} />
      
      {/* <Stack.Screen name={Routes.HOME} component={Home} /> */}
      
      </Stack.Navigator>
  );
};

export default StudentStack;
