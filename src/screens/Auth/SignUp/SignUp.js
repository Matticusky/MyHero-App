import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Colors, Icons } from '../../../assets';
import { CommonStyles, FontSize, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch } from 'react-redux';
import { useToast } from "react-native-toast-notifications";
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import AlertService from '../../../services/AlertService';
import { clearRememberMeCreds } from '../../../redux/Reducers/AuthReducer';

const SignUp = ({ navigation }) => {
  const toast = useToast();
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState({
    inputType: "text",
    title: "Email",
    value: "",
    type: "email",
    error: "",
    placeholder: "Enter Email Address",
  });
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const schoolNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [firstName, setFirstName] = useState({
    inputType: "text",
    title: "First Name",
    value: "",
    type: "text",
    error: "",
    placeholder: "Enter First Name",
    leftIcon: <Icons.User />
  });

  const [lastName, setLastName] = useState({
    inputType: "text",
    title: "Last Name",
    value: "",
    type: "text",
    error: "",
    placeholder: "Enter Last Name",
    leftIcon: <Icons.User />
  });


  const [password, setPassword] = useState({
    inputType: "text",
    title: "Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter Password",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    inputType: "text",
    title: "Confirm Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter Confirm Password",
  });

  const [rememberMe, setRememberMe] = useState({
    inputType: "checkbox",
    title: "Remember Me",
    value: false,
    type: "checkbox",
    error: "",
  });

  const [privacyPolicy, setPrivacyPolicy] = useState({
    inputType: "checkbox",
    title: "Privacy Policy",
    value: false,
    type: "checkbox",
    error: "",
  });

  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const validatePhone = (phone) => {
    const regex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return regex.test(phone);
  };

  const onPressSignUp = () => {
    let error = {};

    let emailValidate = Validator("email", email.value);
    let passwordValidate = Validator("password", password.value);

    if (email.value?.trim() === "") {
      setEmail({ ...email, error: "Email is required" });
      error["email"] = "Email is required";
    }
     if (email.value !== "" && emailValidate) {
      setEmail({ ...email, error: emailValidate });
      error["email"] = emailValidate;
    }
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
    if (firstName.value?.trim()  === "") {
      setFirstName({ ...firstName, error: "First Name is required" });
      error["firstName"] = "First Name is required";
    }
    if (lastName.value?.trim() === "") {
      setLastName({ ...lastName, error: "Last Name is required" });
      error["lastName"] = "Last Name is required";
    }
    
    if (!rememberMe.value) {
      return AlertService.toastPrompt('You must agree to the terms and conditions','error')
    }

    if (!privacyPolicy.value) {
      return AlertService.toastPrompt('You must agree to the privacy policy','error')
    }

    setError(error);

    if (Object.keys(error).length === 0) {

      let user = {
        email: email.value,
        password: password?.value?.trim(),
        firstName: firstName.value,
        lastName: lastName.value,
      }
      dispatch(clearRememberMeCreds());
       navigation.navigate(Routes.OTP_VERIFICATION,{
        user:user
      })

      
      
// Important 
      // let user = {
      //   email: email.value,
      //   password: password?.value?.trim(),
      //   firstName: firstName.value,
      //   lastName: lastName.value,
      // };
      // registerAPICall(user)

    }
  };

  const registerAPICall = async (data) =>{
    try {
      setLoader(true)
      let response = await axiosWrapper("POST", API_URLS.REGISTER_URL, data, null, false, 'json', false);
      if(response){
        dispatch(clearRememberMeCreds());
        navigation.navigate(Routes.OTP_VERIFICATION, {
          user: {...response.data,password:password?.value?.trim()},
          successMessage:'user registered successfully'
        });
      }

    } catch (error) {
      AlertService.toastPrompt(error, 'error')
    }finally{
      setLoader(false)
    }
  }

  const handleNavigation = (path) =>{
    navigation.navigate(path)
  }

  return (
    <MainLayout loader={loader}>
      <Header title={"Sign Up"} rightIcons={false} />
      <ScreenWrapper style={styles.cont}>
        <View style={styles.inPutCont}>
          <CustomizedInput
            fieldInfo={firstName}
            onChange={(text) => {
              setFirstName({ ...firstName, value: text, error: "" });
            }}
            onSubmitEditing={()=>lastNameRef.current?.focus()}
          />
          <CustomizedInput
            ref={lastNameRef}
            fieldInfo={lastName}
            onChange={(text) => {
              setLastName({ ...lastName, value: text, error: "" });
            }}
            onSubmitEditing={()=>emailRef.current?.focus()}
          />
          <CustomizedInput
          ref={emailRef}
            fieldInfo={email}
            onChange={(text) => {
              setEmail({ ...email, value: text.replace(/\s/g, ''), error: "" });
            }}
            onSubmitEditing={()=>passwordRef.current?.focus()}
          />
          
          <CustomizedInput
            ref={passwordRef}
            fieldInfo={password}
            onChange={(text) => {
              setPassword({ ...password, value: text.replace(/\s/g, ''), error: "" });
            }}
            onSubmitEditing={()=>confirmPasswordRef.current?.focus()}
          />
          <CustomizedInput
            ref={confirmPasswordRef}
            fieldInfo={confirmPassword}
            onChange={(text) => {
              setConfirmPassword({ ...confirmPassword, value: text.replace(/\s/g, ''), error: "" });
            }}
          />

          <View style={styles.rowCont}>
            <CustomizedInput
              fieldInfo={rememberMe}
              onChange={(text) => {
                setRememberMe({ ...rememberMe, value: text });
              }}
            />
            <View style={[CommonStyles.ROW_VIEW]}>
              <Text style={styles.regText}>I agree to the</Text>
              <TouchableOpacity onPress={()=>handleNavigation(Routes.TERMS_AND_CONDITIONS)}>
                <Text style={styles.underLineText}>terms & conditions.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowCont}>
            <CustomizedInput
              fieldInfo={privacyPolicy}
              onChange={(text) => {
                setPrivacyPolicy({ ...privacyPolicy, value: text });
              }}
            />
            <View style={[CommonStyles.ROW_VIEW]}>
              <Text style={styles.regText}>I agree to the</Text>
              <TouchableOpacity onPress={()=>handleNavigation(Routes.PRIVACY_POLICY)}>
                <Text style={styles.underLineText}>privacy policy.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          text={"Sign Up"}
          style={{ marginTop: UtilityMethods.hp(4) }}
          onPress={() => onPressSignUp()}
        />
        <View style={styles.LinkedView}>
          <Text style={[styles.regText, { fontSize: FontSize.VALUE(16) }]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.regText, { color: Colors.RED, fontSize: FontSize.VALUE(16) }]}>
              Login Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: UtilityMethods.hp(3) }} />
      </ScreenWrapper>
    </MainLayout>
  );
}

export default SignUp;



