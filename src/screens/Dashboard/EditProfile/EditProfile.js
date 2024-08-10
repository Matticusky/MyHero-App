import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import styles from './styles';
import { Colors, Icons } from '../../../assets';
import { Constants, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper, ImagePicker } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';

const EditProfile = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  const lastNameRef = useRef();
  const phoneRef = useRef();
  const schoolNameRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
 
  const [loader, setLoader] = useState(false)
  const [editImage, setEditImage] = useState(null)
  const [firstName, setFirstName] = useState({
    inputType: "text",
    title: "First Name",
    value: user.firstName || "",
    type: "text",
    error: "",
    placeholder: "Enter First Name",
    leftIcon: <Icons.User />
  });

  const [lastName, setLastName] = useState({
    inputType: "text",
    title: "Last Name",
    value: user.lastName || "",
    type: "text",
    error: "",
    placeholder: "Enter Last Name",
    leftIcon: <Icons.User />
  });

  const [phoneNumber, setPhoneNumber] = useState({
    inputType: "text",
    title: "Phone",
    value: user.phoneNumber || '',
    type: "text",
    error: "",
    placeholder: "Enter Phone Number",
    leftIcon: <Icons.Phone />
  });

  const [address, setAddress] = useState({
    inputType: "text",
    title: "Address",
    value: user.address || '',
    type: "text",
    error: "",
    placeholder: "Enter Full Address",
    leftIcon: <Icons.AddressIcon />
  });

  const [postalCode, setPostalCode] = useState({
    inputType: "text",
    title: "Postal Code",
    value: user.postalCode || "",
    type: "text",
    error: "",
    placeholder: "Enter Postal Code",
    leftIcon: <Icons.AddressIcon />
  });

  const [netId, setNetId] = useState({
    inputType: "text",
    title: "NetID",
    value: user.netID || "netID",
    type: "text",
    error: "",
    placeholder: "Enter NetID",
    leftIcon: <Icons.nedID width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
  });

  const [schoolName, setSchoolName] = useState({
    inputType: "text",
    title: "School Name",
    value: user.schoolName || "",
    type: "text",
    error: "",
    placeholder: "Enter School Name",
    leftIcon: <Icons.graduationCap  width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
  });
  

  const [profileImage, setProfileImage] = useState({
    inputType: "image",
    title: "Profile Image",
    value: user?.profilePicture || Constants.letImagePlaceholder,
    type: "image",
    error: "",
    placeholder: "Upload Profile Image",
  });

  

  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const onPressUpdate = () => {
    let error = {};


    if (firstName.value === "") {
      setFirstName({ ...firstName, error: "First Name is required" });
      error["firstName"] = "First Name is required";
    }

    if (lastName.value === "") {
      setLastName({ ...lastName, error: "Last Name is required" });
      error["lastName"] = "Last Name is required";
    }

    if (phoneNumber.value === "") {
      setPhoneNumber({ ...phoneNumber, error: "Phone Number is required" });
      error["phoneNumber"] = "Phone Number is required";
    } else if (phoneNumber?.value?.length < 10) {
      setPhoneNumber({ ...phoneNumber, error: "Phone Number is not correct" });
      error["phoneNumber"] = "Phone Number is not correct";
    }

    if (address.value === "") {
      setAddress({ ...address, error: "Address is required" });
      error["address"] = "Address is required";
    }

    if (postalCode.value === "") {
      setPostalCode({ ...postalCode, error: "Postal Code is required" });
      error["postalCode"] = "Postal Code is required";
    }

    if (netId.value === "") {
      setNetId({ ...netId, error: "NetID is required" });
      error["netId"] = "NetID is required";
    }

    if (schoolName.value === "") {
      setSchoolName({ ...schoolName, error: "School Name is required" });
      error["schoolName"] = "School Name is required";
    }

    if (profileImage.value === "") {
      setProfileImage({ ...profileImage, error: "Profile Image is required" });
      error["profileImage"] = "Profile Image is required";
    }

    setError(error);

    if (Object.keys(error).length === 0) {
      editUserProfile()
    }
  };


  let editUserProfile = async () =>{
    try {
      setLoader(true)
      const payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        schoolName: schoolName.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        postalCode: postalCode.value,
    };
    if(!phoneNumber.value.includes('+')){
      payload.phoneNumber =  `+1${phoneNumber.value}`
    }

    if(editImage){
      let response = await uploadImage(editImage)
      payload.profilePicture = response.data?.[0].path || ''
    }
    let response = await axiosWrapper('PATCH', API_URLS.EDIT_PROFILE, payload,token, false, 'json', true) 

    if(response){
      dispatch(setUser(response.data));
      navigation.navigate(Routes.PROFILE)
    }
    } catch (error) {
    }finally{
      setLoader(false)
    }
  }

  let uploadImage = async(file) =>{
    try {
      const formData = new FormData();
      formData.append('files', file);
      let response = axiosWrapper('POST',API_URLS.UPLOAD_IMAGE,formData, null, true) 
      return response
    } catch (error) {
      throw new Error(error)
    }
  }



  return (
    <MainLayout loader={loader}>
      <Header title={"Edit Profile"} />
      <ScreenWrapper style={styles.cont}>
        <ImagePicker
          filedInfo={profileImage}
          editImage={editImage} 
          setEditImage={setEditImage}
          onChnage={(path) => {
            setProfileImage({
              ...profileImage, value: path,
              error: ""
            });
          }}
        />
        <View style={styles.inPutCont}>
          
        <CustomizedInput
            fieldInfo={firstName}
            onChange={(text) => {
              setFirstName({ ...firstName, value: text, error: "" });
            }}
            onSubmitEditing={()=>lastNameRef.current?.focus()}
            maxLength={40}
          />
          <CustomizedInput
            ref={lastNameRef}
            fieldInfo={lastName}
            onChange={(text) => {
              setLastName({ ...lastName, value: text, error: "" });
            }}
            onSubmitEditing={()=>phoneRef.current?.focus()}
            maxLength={40}
          />
          <CustomizedInput
            ref={phoneRef}
            fieldInfo={phoneNumber}
            onChange={(text, unmasked) => {
              setPhoneNumber({ ...phoneNumber, value: unmasked, error: "" });
            }}
            keyboardType="number-pad"
            isPhoneNumber={true}
            onSubmitEditing={()=>schoolNameRef.current?.focus()}
          />
           <CustomizedInput
            fieldInfo={netId}
            onChange={(text) => {
              setNetId({ ...netId, value: text, error: "" });
            }}
            editable={false}
          />
          <CustomizedInput
            ref={schoolNameRef}
            fieldInfo={schoolName}
            onChange={(text) => {
              setSchoolName({ ...schoolName, value: text, error: "" });
            }}
            onSubmitEditing={()=>addressRef.current?.focus()}
            maxLength={80}
          />
          <CustomizedInput
            ref={addressRef}
            fieldInfo={address}
            onChange={(text) => {
              setAddress({ ...address, value: text, error: "" });
            }}
            onSubmitEditing={()=>postalCodeRef.current?.focus()}
            maxLength={80}
          />
          <CustomizedInput
            ref={postalCodeRef}
            fieldInfo={postalCode}
            onChange={(text) => {
              setPostalCode({ ...postalCode, value: text, error: "" });
            }}
            maxLength={6}
          />
         

        </View>
        

        <View style={styles.buttonContainer}>

        <Button
          text={"Save Changes"}
          style={{
            marginTop: UtilityMethods.hp(4)
          }}
          onPress={() => onPressUpdate()}
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

export default EditProfile;



