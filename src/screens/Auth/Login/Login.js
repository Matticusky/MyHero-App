import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import styles from './styles';
import { Colors, Fonts, Icons, Images } from '../../../assets';
import { CommonStyles, Constants, FontSize, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser, setRememberMeCreds, clearRememberMeCreds } from '../../../redux/Reducers/AuthReducer';
import { useToast } from "react-native-toast-notifications";
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import AlertService from '../../../services/AlertService';


const Login = ({ navigation, }) => {
  const toast = useToast();
  const [loader, setLoader] = useState(false)
  const passwordRef = useRef(null);

  const { email: savedEmail, password: savedPassword, rememberMe: savedRememberMe } = useSelector(state => state.auth.rememberMeCreds);

  const [email, setEmail] = useState({
    inputType: "text",
    title: "Email",
    value: savedEmail || "",
    type: "email",
    error: "",
    placeholder: "Enter Email Address",

  });
  const [password, setPassword] = useState({
    inputType: "text",
    title: "Password",
    value: savedPassword || "",
    type: "password",
    error: "",
    placeholder: "Enter Password",
  });

  const [rememberMe, setRememberMe] = useState({
    inputType: "checkbox",
    title: "Remember Me",
    value: savedRememberMe || false,
    type: "checkbox",
    error: "",
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();


  const onPressDontAccount = () => {
    navigation.navigate(Routes.SIGNUP);

  }

  const onPressLogin = () => {

    let error = {}

    let emailValidate = Validator("email", email.value);
    let passwordValidate = Validator("first_password", password.value)

    if (email.value == "") {
      setEmail({ ...email, error: "Email is required" })
      error["email"] = "Email is required"
    }
    if (password.value == "") {
      setPassword({ ...password, error: "Password is required" })
      error["password"] = "Password is required"
    }


    setError(error);

    if (email.value != "" && emailValidate) {
      setEmail({ ...email, error: emailValidate })
      error["email"] = emailValidate
    }

    if (password.value != "" && passwordValidate) {
      setPassword({ ...password, error: passwordValidate })
      error["password"] = passwordValidate
    }

    setError(error);

    if (Object.keys(error).length == 0) {

      const user = {
        email: email.value,
        password: password.value,
        firstName:"John",
        lastName:"Doe",
        profileImage:Constants.DummyPicture
      }
      dispatch(setUser(user));
      dispatch(setToken('DUMMY_TOKEN'));


// Important
      // const user = {
      //   email: email.value,
      //   password: password.value,
      // }
      // loginAPICall({ ...user, isMobile:true})
    }
  }

  const loginAPICall = async (data) => {
    try {
      setLoader(true)
      let response = await axiosWrapper('POST', API_URLS.LOGIN_URL, data, null, false, 'json', false);
      if (response) {
        if (rememberMe.value) {
          dispatch(setRememberMeCreds({ email: email.value, password: password.value, rememberMe: true }));
        } else {
          dispatch(clearRememberMeCreds());
        }
        if (response?.data?.user?.isVerified) {
          dispatch(setToken(response?.data.token));
          dispatch(setUser(response?.data.user));
          AlertService.toastPrompt("user logged in successfully", 'success')
        }
        else {
          let response = await getOTP()
          if(response){
            navigation.navigate(Routes.OTP_VERIFICATION, {
              user: data,
              successMessage: 'user logged in successfully'
            });
          }
        }


      }
    } catch (error) {
      let msg = error
      if (msg === 'Please verify your account!') {

        let response = await getOTP()
        if (response) {
          navigation.navigate(Routes.OTP_VERIFICATION, {
            user: data,
            successMessage: 'user logged in successfully'
          });
        }
        return
      }
      AlertService.toastPrompt(msg, 'error')


    } finally {
      setLoader(false)
    }
  }

  const getOTP = async () => {
    try {

      const data = { email: email.value };
      const response = await axiosWrapper('POST', API_URLS.SEND_OTP, data, null, false, 'json', true);
      return response
    } catch (error) {
    }
  };


  return (
    <MainLayout loader={loader}>
      <Header
        title={"Login"}
        rightIcons={false}
        showBackButton={false}
      />

      <ScreenWrapper
        style={styles.cont}
      >
        <Image style={styles.logo} source={Images.LOGO} />

        <View style={styles.inPutCont}>

          <CustomizedInput
            fieldInfo={email}
            onChange={(text) => {
              setEmail({ ...email, value: text.replace(/\s/g, ''), error: "" })
            }}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <CustomizedInput
            ref={passwordRef}
            fieldInfo={password}
            onChange={(text) => {
              setPassword({ ...password, value: text.replace(/\s/g, ''), error: "" })
            }}
          />

          <View style={styles.rowCont}>
            <View style={CommonStyles.ROW_VIEW}>

              <CustomizedInput
                fieldInfo={rememberMe}
                onChange={(text) => { setRememberMe({ ...rememberMe, value: text }) }}
              />

              <Text style={styles.regText}>Remember Me</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.FORGET_PASSWORD)}>
              <Text style={[styles.regText, {
                color: Colors.RED,
                fontFamily: Fonts.MEDIUM,
                marginTop: Platform.OS == "android" ? UtilityMethods.hp(0.7) : 0,
              }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

          </View>
        </View>
        <Button
          text={"LOG IN"}
          style={{
            marginTop: UtilityMethods.hp(4)

          }}
          onPress={() => onPressLogin()}
        />
        
          <View style={styles.LinkedView}>
            <Text style={[styles.regText, {
              fontSize: FontSize.VALUE(16)
            }]}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => onPressDontAccount()}>
              <Text style={[styles.regText, {
                color: Colors.RED,
                fontSize: FontSize.VALUE(16),
              }]}>Sign Up
              </Text>
            </TouchableOpacity>
          </View>

      </ScreenWrapper>

    </MainLayout>
  );
}

export default Login;
