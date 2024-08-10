//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

/// ====================================== Local Imported Files ======================================//
import {Login,SignUp,UserType,OtpVerification,ForgetPassword, TermsAndConditions, PrivacyPolicy, ResetPassword } from "../../screens";
import Routes from "../Routes";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
 

  return (
    <Stack.Navigator 
    
    screenOptions={{
      headerShown: false,
    
    }}
    >
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
      <Stack.Screen name={Routes.OTP_VERIFICATION} component={OtpVerification} />
      <Stack.Screen name={Routes.FORGET_PASSWORD} component={ForgetPassword} />
      <Stack.Screen name={Routes.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={Routes.TERMS_AND_CONDITIONS} component={TermsAndConditions} />
      <Stack.Screen name={Routes.PRIVACY_POLICY} component={PrivacyPolicy} />

      </Stack.Navigator>
  );
};

export default AuthStack;
