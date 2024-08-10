import React, { useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';


import { Images } from '../../../assets';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import { UtilityMethods, Validator } from '../../../utility';
import styles from './styles';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import AlertService from '../../../services/AlertService';
import Routes from '../../../navigation/Routes';

const ResetPassword = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false)
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [password, setPassword] = useState({
    inputType: "text",
    title: "Creat New Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter Password",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    inputType: "text",
    title: "Confirm New Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter Confirm Password",
  });



  const onPressResetPassword = () => {

    let error = {}
    let passwordValidate = Validator("password", password.value);
    
    if (password.value?.trim() === "") {
      setPassword({ ...password, error: "Password is required" });
      error["password"] = "Password is required";
    }
    if (password.value !== "" && passwordValidate) {
      setPassword({ ...password, error: passwordValidate });
      error["password"] = passwordValidate;
    }
   
    if (confirmPassword.value?.trim() === "") {
      setConfirmPassword({ ...confirmPassword, error: "Confirm Password is required" });
      error["confirmPassword"] = "Confirm Password is required";
    } else if (confirmPassword.value !== password.value) {
      setConfirmPassword({ ...confirmPassword, error: "Passwords do not match" });
      error["confirmPassword"] = "Passwords do not match";
    }


    if (Object.keys(error).length == 0) {
      navigation.navigate(Routes.LOGIN,)

      // verifyEmailAPICall()
    }
  }


  // const verifyEmailAPICall = async () => {
  //   try {
  //     setLoader(true)

  //     const data = { email: email.value };
  //     let response = await axiosWrapper('POST', API_URLS.VERIFY_EMAIL, data, null, false, 'json', false);
  //     if (response) {
  //       AlertService.toastPrompt('Reset link has been sent to your email', 'success')
  //       navigation.goBack()
  //     }
  //   } catch (error) {
  //     AlertService.toastPrompt('Something went wrong', 'error')

  //   } finally {
  //     setLoader(false)
  //   }
  // }

  return (
    <MainLayout loader={loader} >
      <Header
        title={"Forgot Password"}
        rightIcons={false}
      />

      <ScreenWrapper
        style={styles.cont}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Image style={styles.logo} source={Images.LOGO} />

        <View style={styles.inPutCont}>

          <Text style={styles.mainText}>
            Request Password Reset
          </Text>

          <Text style={styles.regText}>
            {"Please enter your registered Email address to send you an OTP"}

          </Text>
        </View>


        <View style={{ height: UtilityMethods.hp(4) }} />

        <CustomizedInput
          ref={passwordRef}
          fieldInfo={password}
          onChange={(text) => {
            setPassword({ ...password, value: text.replace(/\s/g, ''), error: "" });
          }}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <CustomizedInput
          ref={confirmPasswordRef}
          fieldInfo={confirmPassword}
          onChange={(text) => {
            setConfirmPassword({ ...confirmPassword, value: text.replace(/\s/g, ''), error: "" });
          }}
        />

        <Button
          text={"Reset Password"}
          style={{
            marginTop: UtilityMethods.hp(4)

          }}
          onPress={() => {
            onPressResetPassword()
          }}

        />



      </ScreenWrapper>

    </MainLayout>
  );
}

export default ResetPassword;
