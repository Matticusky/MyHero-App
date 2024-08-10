import Geolocation from '@react-native-community/geolocation';
import React, { useState } from 'react';
import { Modal, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/Reducers/AuthReducer';

export const LocationContext = React.createContext();

const LocationProvider = ({ children }) => {
  const [isLocationAllowed, setIsLocationAllowed] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allowLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (info) => {
          const data = {
            ...user,
            location: {
              coordinates: [info.coords.latitude, info.coords.longitude],
            },
          };
          dispatch(setUser(data));
          setIsLocationAllowed(true);
          resolve({
            success: true,
            message: 'Location allowed',
          });
        },
        (err) => {
          setIsLocationAllowed(false);
          resolve({
            success: false,
            message: 'Gps is not enabled',
          });
        },
      );
    });
  };

  return (
    <LocationContext.Provider value={{ allowLocation }}>
      {!isLocationAllowed && user?.isLogin && (
        <Modal visible={true} transparent={true} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <Text
              >
              Please allow location to use the app
              </Text>
          </View>
        </Modal>
      )}
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider };
