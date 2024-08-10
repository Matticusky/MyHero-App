import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerActions } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Icons } from '../../../assets';
import { resetAuth, setUser } from '../../../redux/Reducers/AuthReducer';
import { Constants } from '../../../utility';
import styles from './styles';
import Routes from '../../../navigation/Routes';
import { FastImageComponent, LogoutModal } from '../../../components';


const SliderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let user = useSelector(state => state.auth.user);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    onPressLogout();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onPressLogout = () => {

    navigation.dispatch(DrawerActions.closeDrawer())
    setTimeout(() => {
      dispatch(resetAuth())
    }
      , 500);
  }

  const handleNavigation = (path) => {
    navigation.dispatch(DrawerActions.closeDrawer())
    navigation.navigate(path)
  }



  return (
    <View style={styles.cont}>
      <View style={styles.headerCont}>

        <Pressable style={styles.ImageCont} onPress={() => handleNavigation(Routes.PROFILE)}>
          <FastImageComponent style={styles.imageView} source={{
            uri: user?.profilePicture || Constants.letImagePlaceholder
          }} />

        </Pressable>
        <Text style={styles.titleText}>{user?.firstName} {user?.lastName}</Text>
      </View>

      <View style={styles.body}>

        <FlatList
          data={Constants.DrawerItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.itemCont}
              onPress={() => handleNavigation(item.route)}>
              <View style={styles.iconCont}>
                {item.icon}
              </View>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={styles.logoutCont}
          onPress={()=>setModalVisible(true)}
        >

          <View style={styles.iconCont}>
            <Icons.SignOut />
          </View>
          <Text style={styles.itemText}>
            Logout
          </Text>

        </TouchableOpacity>

      </View>
      <LogoutModal
        visible={modalVisible}
        onConfirm={handleLogout}
        onCancel={handleCancel}
      />

    </View>
  );
}

export default SliderScreen;
