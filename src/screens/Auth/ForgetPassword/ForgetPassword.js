import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';


import { Images } from '../../../assets';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import { UtilityMethods, Validator } from '../../../utility';
import styles from './styles';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import AlertService from '../../../services/AlertService';
import Routes from '../../../navigation/Routes';

const ForgetPassword = ({navigation,route}) => {
   const [loader, setLoader] = useState(false)
const [email, setEmail] = useState({
  inputType:"text",
  title:"Email",
  value:"",
  type:"email",
  error:"",
  placeholder:"Enter Email Address",

});



const onPressResetPassword = () => {

  let error = {}

  let emailValidate = Validator("email", email.value);

  if (email.value === "") {
    setEmail({...email, error:"Email is required"})
    error["email"]="Email is required"
  }

  if(email?.value!=="" && emailValidate)
    {
      setEmail({...email, error:emailValidate})
      error["email"]=emailValidate
    }
    if(Object.keys(error).length==0)
    {
      let user = {
        email: email?.value,
        isForgetEmail:true
      }
      navigation.navigate(Routes.OTP_VERIFICATION,{
        user:user
      })


      // verifyEmailAPICall()
    }
}


const verifyEmailAPICall = async () =>{
  try {
    setLoader(true)

    const data = { email: email.value };
    let response = await axiosWrapper('POST', API_URLS.VERIFY_EMAIL, data, null,false, 'json', false);
    if(response){
      AlertService.toastPrompt('Reset link has been sent to your email','success')
      navigation.goBack()
    }
  } catch (error) {
    AlertService.toastPrompt('Something went wrong','error')

  }finally{
    setLoader(false)
  }
}

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

      
        <View style={{height:UtilityMethods.hp(4)}}/>
      
        <CustomizedInput
           fieldInfo={email}
           onChange={(value) => {
              setEmail({...email, value:value, error:""})
           }}
          />

         <Button
          text={"Reset Password"}
          style={{
            marginTop:UtilityMethods.hp(4)
          
          }}
          onPress={() => {
            onPressResetPassword()
          }}
       
        />

      
      
        </ScreenWrapper>
   
    </MainLayout>
  );
}

export default ForgetPassword;
