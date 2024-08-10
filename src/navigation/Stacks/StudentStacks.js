//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
/// ====================================== Local Imported Files ======================================//
import { useDispatch } from 'react-redux';
// import {Home,Attendance,EditProfile,ExcuseAttandence} from '../../screens';
import Routes from '../Routes';
import {BottomTab, } from "./index"
import { ChangePassword, EditProfile, Attendance, ExcuseAttandence} from "../../screens";


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
      <Stack.Screen name={Routes.ATTENDANCE} component={Attendance} />
      <Stack.Screen name={Routes.EXCUSE_ATTENDANCE} component={ExcuseAttandence} />
      {/* <Stack.Screen name={Routes.HOME} component={Home} /> */}
      
      </Stack.Navigator>
  );
};

export default StudentStack;
