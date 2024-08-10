import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


import { useDispatch } from 'react-redux';
import { Colors, Images } from '../../../assets';
import { AlertWithTwoButtons, Button, CountdownTimer, Header, MainLayout, OtpInput, ScreenWrapper } from '../../../components';
import Routes from '../../../navigation/Routes';
import { setToken, setUser } from '../../../redux/Reducers/AuthReducer';
import { UtilityMethods, Validator } from '../../../utility';
import styles from './styles';
import AlertService from '../../../services/AlertService';
import { useToast } from "react-native-toast-notifications";
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';

const OtpVerification = ({ navigation, route }) => {
  const toast = useToast();
  let user = route?.params?.user;
  let successMessage = route?.params?.successMessage

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();

  const [resetCounter, setResetCounter] = useState(true);
  const [expiredPress, setExpiredPress] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [otpReset, setOtpReset] = useState(false);


  const [otp, setOtp] = useState({
    value: "",
    error: "",

  });


  const getOTP = async () => {
    try {
      if (!user || !user.email) {
        return;
      }
      const data = { email: user.email };
      const response = await axiosWrapper('POST', API_URLS.SEND_OTP, data, null, false, 'json', true);
    } catch (error) {
    }
  };

  const verifyOTP = async () => {
    try {
      setLoader(true)
      let data = {
        email: user.email,
        otp: otp.value
      }
      let response = await axiosWrapper('POST', API_URLS.VERIFY_OTP, data, null, false, 'json', true);
      if(response){
        dispatch(setToken(response?.data.token));
        dispatch(setUser(response?.data.user));
      }
    } catch (error) {

    }finally{
      setLoader(false)
    }
  }

  const verifyOTPDummy = () =>{
    if(otp.value === '1234'){
      if(user?.isForgetEmail){
        return navigation.navigate(Routes.RESET_PASSWORD)
      }


      dispatch(setUser(user));
      dispatch(setToken('DUMMY_TOKEN'));
      AlertService.toastPrompt("User registered successfully...", 'success')

      // loginAPICallForDummy({email:user.email, password:user.password, isMobile:true})
    }else{
      AlertService.toastPrompt("Invalid OTP", 'error')
    }
  }

  const loginAPICallForDummy = async (data) =>{
    try{
      setLoader(true)
      let response = await axiosWrapper('POST', API_URLS.LOGIN_URL, data, null,false, 'json', false);
      if(response){
        dispatch(setToken(response?.data.token));
        dispatch(setUser(response?.data.user));
        AlertService.toastPrompt(successMessage, 'success')
      }
    }catch(error){
    }finally{
      setLoader(false)
    }
  }


  const onPressVerify = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true); 

    if (otp.value.length < 4) {
      AlertService.toastPrompt("Please enter OTP", "error")
    }
    else {
      // verifyOTP()
      verifyOTPDummy()
    }
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  }

  const showAlert = () => {
    AlertWithTwoButtons({
      title: "OTP Expired",
      subtitle: "Resend OTP Again.",
      btnTitleFirst: "Resend OTP",
      btnTitleSecond: "Cancel",
      onPressButtonFirst: () => {
        setResetCounter(true)
        setExpiredPress(true)
      },
      onPressButtonSecond: () => {
      }
    });


  }

  const showResendAlert = () => {
    AlertWithTwoButtons({
      title: "Resend OTP",
      subtitle: "Are you sure you want to resend OTP?",
      btnTitleFirst: "Yes",
      btnTitleSecond: "No",
      onPressButtonFirst: () => {
        setOtp({
          ...otp,
          value: "",
          error: ""
        })
        setOtpReset(true);
        setResetCounter(true)
        // getOTP()
        setShowReset(false)
      },
      onPressButtonSecond: () => {

      }
    });


  }

  return (
    <MainLayout loader={loader}>
      <Header
        title={"Email verification"}
        rightIcons={false}
      />

      <ScreenWrapper
        style={styles.cont}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Image style={styles.logo} source={Images.LOGO} />
        <View style={styles.inPutCont}>

          <Text style={styles.mainText}>
            Email Verification
          </Text>

          <Text style={styles.regText}>
            {"We have sent you an OTP on your email, please enter in these fields to get verified."}

          </Text>
          <View style={styles.optView}>

            <OtpInput
              numOfDigits={4}
              onComplete={(otp) => {
                setOtp({
                  ...otp,
                  value: otp,
                  error: ""
                })}} 
                reset={otpReset}
                />
            <CountdownTimer
              countDownTime={60}
              reset={resetCounter}
              counterStarted={() => {
                setResetCounter(false)
                setExpiredPress(false)
              }}
              expiredPress={expiredPress}
              contStyle={styles.countCant}
              setonCounterFinished={(isFinished) => {
                // showAlert()
                // setExpiredPress(true)
                setShowReset(true)
              }
              } />
          </View>

        </View>


        <Button
          text={"Verify"}
          style={{
            marginTop: UtilityMethods.hp(4),
          }}
          onPress={() => {
            onPressVerify()
          }}

        />

      {/* {showReset &&   */}
      <TouchableOpacity
          onPress={() => {
            showResendAlert()
          }}
          disabled={!showReset}
          >
          <Text style={[styles.boldText,{color:showReset? Colors.BLACK:Colors.LIGHT_GRAY}]}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        {/* } */}

      </ScreenWrapper>

    </MainLayout>
  );
}

export default OtpVerification;
