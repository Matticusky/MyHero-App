import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Header, ImagePicker, MainLayout, ScreenWrapper } from '../../../components';
import styles from './styles';
import { CommonStyles, Constants } from '../../../utility';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons } from '../../../assets';
import { setUser } from '../../../redux/Reducers/AuthReducer';
import UserDetails from '../../../components/UserDetail';
import Routes from '../../../navigation/Routes';
import { useIsFocused } from '@react-navigation/native';
import AlertService from '../../../services/AlertService';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const [editImage, setEditImage] = useState(null)
  const [loader, setLoader] = useState(null)


  const [profileImage, setProfileImage] = useState({
    inputType: "image",
    title: user?.email,
    value: "",
    type: "image",
    error: "",
    placeholder: "Upload Profile Image",
    value: user?.profilePicture || Constants.letImagePlaceholder,
    atEdit: true
  });
  console.log('user',user)

  // useEffect(() => {
  //   if (isFocused) {
  //     setProfileImage({
  //       ...profileImage,
  //       value: user?.profilePicture || Constants.letImagePlaceholder,
  //       error: ""
  //     });
  //   }

  // }, [isFocused])


  useEffect(() => {
    if (editImage) {
      // editUserProfile()
    }
  }, [editImage])


  const handleProfileAPI = (path) => {
    // dispatch(setUser({ ...user, ProfileImage: path }));
  }

  const handleNavigation = (path) => {
    navigation.navigate(path);
  }

  let editUserProfile = async () => {
    try {
      setLoader(true);
      let img = await uploadImage(editImage)
      let payload = {
        profilePicture : img?.data?.[0]?.path || ''
      }
      let response = await axiosWrapper('PATCH', API_URLS.EDIT_PROFILE, payload, token, false, 'json', true)

      if (response) {
        dispatch(setUser(response.data));
        setEditImage(null)
      }
    } catch (error) {
      AlertService.toastPrompt("Something went wrong...",'error')
    } finally {
      setLoader(false)
    }
  }

  let uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      let response = axiosWrapper('POST', API_URLS.UPLOAD_IMAGE, formData, null, true)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }





  return (
    <MainLayout loader={loader}>
      <Header title="Profile"
        showBackButton={false}
        DrawerHeader={true} />

      <ScreenWrapper style={[CommonStyles.BODY, styles.cont]}>

        <ImagePicker
          filedInfo={profileImage}
          onChnage={(path) => {
            setProfileImage({
              ...profileImage, value: path,
              error: ""
            })
          }}
          // setEditImage={setEditImage}
        />

        <UserDetails userData={user} />


        <View style={styles.buttonContainer}>

          <Button
            text={"Edit Profile"}
            onPress={() => handleNavigation(Routes.EDIT_PROFILE)}

          />
          <Button
            text={"Change Password"}
            style={styles.changePassowrd}
            textStyle={styles.changePassowrdText}
            onPress={() => handleNavigation(Routes.CHANGE_PASSWORD)}
          />
        </View>

      </ScreenWrapper>
    </MainLayout>
  );
}

export default Profile;
