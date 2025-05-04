//================================ React Native Imported Files ======================================//
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
/// ====================================== Local Imported Files ======================================//
import {useDispatch, useSelector} from 'react-redux';
import {StudentStack, InstructorStack} from './index';
import Routes from '../Routes';
import {
  NotificationScreen,
  PrivacyPolicy,
  TermsAndConditions,
} from '../../screens';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={Routes.StudentStack} component={StudentStack} />
      <Stack.Screen
        name={Routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={Routes.TERMS_AND_CONDITIONS}
        component={TermsAndConditions}
      />
      <Stack.Screen name={Routes.PRIVACY_POLICY} component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
