import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import styles from './styles';
import { Icons } from '../../../assets';
import { UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import AlertService from '../../../services/AlertService';

const ChangePassword = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [loader, setLoader] = useState(false)

  const [oldPassword, setOldPassword] = useState({
    inputType: "text",
    title: "Old Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter Old Password",
  });

  const [newPassword, setNewPassword] = useState({
    inputType: "text",
    title: "New Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter New Password",
  });

  const [confirmPassword, setConfirmPassword] = useState({
    inputType: "text",
    title: "Confirm New Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Confirm New Password",
  });

  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const onPressSaveChanges = () => {
    let error = {};

    let oldPasswordValidate = Validator("first_password", oldPassword.value);
    let newPasswordValidate = Validator("password", newPassword.value);

    if (oldPassword.value === "") {
      setOldPassword({ ...oldPassword, error: "Old Password is required" });
      error["oldPassword"] = "Old Password is required";
    }

    if (newPassword.value === "") {
      setNewPassword({ ...newPassword, error: "New Password is required" });
      error["newPassword"] = "New Password is required";
    }

    if (confirmPassword.value === "") {
      setConfirmPassword({ ...confirmPassword, error: "Confirm Password is required" });
      error["confirmPassword"] = "Confirm Password is required";
    }

    if (newPassword.value !== confirmPassword.value) {
      setConfirmPassword({ ...confirmPassword, error: "Passwords do not match" });
      error["confirmPassword"] = "Passwords do not match";
    }

    if (oldPassword.value !== "" && oldPasswordValidate) {
      setOldPassword({ ...oldPassword, error: oldPasswordValidate });
      error["oldPassword"] = oldPasswordValidate;
    }

    if (newPassword.value !== "" && newPasswordValidate) {
      setNewPassword({ ...newPassword, error: newPasswordValidate });
      error["newPassword"] = newPasswordValidate;
    }

    setError(error);

    if (Object.keys(error).length === 0) {
      let updatedUser = {
        ...user,
        password: newPassword?.value?.trim(),
      };

      // changePassword()
      navigation.goBack()
      AlertService.toastPrompt("Password changed successfully...",'success')

    }
  };

  const changePassword = async() =>{
    try {
      setLoader(true)
      let payload = {
        oldPassword:oldPassword.value,
        newPassword:newPassword.value
      }
      let response = await axiosWrapper('POST', API_URLS.CHANGE_PASSWORD,payload, token, false, 'json', true) 
      if(response){
        navigation.goBack()
      }
    } catch (error) {
      
    }finally{
      setLoader(false)
    }
  }

  return (
    <MainLayout loader={loader}>
      <Header title={"Change Password"} rightIcons={false} />
      <ScreenWrapper style={styles.cont}>

        <View style={{marginVertical:UtilityMethods.wp(5),alignItems:'center'}}>
          <Icons.lockIcon width={UtilityMethods.wp(20)} height={UtilityMethods.wp(20)} />
        </View>

      <View style={styles.inPutCont}>
        <CustomizedInput
          fieldInfo={oldPassword}
          onChange={(text) => {
            setOldPassword({ ...oldPassword, value: text.replace(/\s/g, ''), error: "" });
          }}
        />
        <CustomizedInput
          fieldInfo={newPassword}
          onChange={(text) => {
            setNewPassword({ ...newPassword, value: text.replace(/\s/g, ''), error: "" });
          }}
        />
        <CustomizedInput
          fieldInfo={confirmPassword}
          onChange={(text) => {
            setConfirmPassword({ ...confirmPassword, value: text.replace(/\s/g, ''), error: "" });
          }}
        />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={"Save Changes"}
            style={{
              marginTop: UtilityMethods.hp(4)
            }}
            onPress={() => onPressSaveChanges()}
          />
          <Button
            text={"Discard"}
            style={styles.changePassowrd}
            textStyle={styles.changePassowrdText}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScreenWrapper>
    </MainLayout>
  );
}

export default ChangePassword;
