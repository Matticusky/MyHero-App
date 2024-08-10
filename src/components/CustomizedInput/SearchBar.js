import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../../utility';
import { Colors, Fonts, Images } from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { FontSize, UtilityMethods } from '../../utility';
import styles from './styles';
import { setRecentSearches } from '../../redux/Reducers/AuthReducer';
import Routes from '../../navigation/Routes';

export const SearchBar = ({
  style,
  searchIconStyle,
  editable = true,
  searchQuery,
  setSearchQuery,
  placeholder,
  placeholderTextColor,
  onPress,
  inputStyle,
  rightIcon,
  rightIconStyle,
  onPressRightIcon,
  onEndEditing,
  onSubmitEditing,
  autoFocus = false,
  onKeyPress,
  fromMessagesScreen = false,
  latitude,
  longitude,
  isGooglePlaces = false,
  onCompleteEditing,
}) => {
  const myref = useRef();
  const googleRef = useRef();
  const dispatch = useDispatch();
  const recentSearches = useSelector(
    (state) => state.auth.recentSearches ?? [],
  );
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [containerFlex, setContainerFlex] = useState(0.15);

  useEffect(() => {
    setTimeout(() => {
      myref.current?.focus();
    }, 1000);
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setContainerFlex(1);
        // Adjust your views here
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setContainerFlex(0.1);
        // Reset your views here
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <>
      {isGooglePlaces ? (
        <GooglePlacesAutocomplete
          ref={googleRef}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          fetchDetails={true}
          renderLeftButton={() => (
            <View style={[styles.rightIconViewPlaceView]}>
              <Image
                style={[styles.searchIcon, searchIconStyle]}
                source={Images.SEARCH_ICON}
              />
            </View>
          )}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                ...styles.rightIconViewPlaceView,
                borderBottomEndRadius: 10,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onPress={() => {
                googleRef.current?.clear();
              }}
            >
              <Image
                style={[
                  { ...styles.searchIcon, tintColor: Colors.DARK_GRAY },
                  searchIconStyle,
                ]}
                source={Images.CLOSE}
              />
            </TouchableOpacity>
          )}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            if (details) {
              const { name, address_components } = details;
              const { lat, lng } = details.geometry.location;

              // Extract city from address components
              const cityObj = address_components.find((component) =>
                component.types.includes('locality'),
              );
              const city = cityObj ? cityObj.long_name : null;

              const data = {
                name: name,
                city: city,
                latitude: lat,
                longitude: lng,
              };

              dispatch(setRecentSearches([...recentSearches, data]));
              onCompleteEditing(data);
            }
          }}
          query={{
            key: 'AIzaSyBlu2C6Q14k5Qoh1GtvESfkoSmhTu7s9qM',
            language: 'en',
            location: `${latitude},${longitude}`,
            radius: 50000,
          }}
          styles={{
            textInputContainer: [styles.PlaceInputsearchInput, inputStyle], // Customize as needed
            textInput: {
              backgroundColor: '#F7F7F6',
              height: UtilityMethods.hp(5),
              borderRadius: null,
              paddingVertical: null,
              paddingHorizontal: null,
              fontSize: FontSize.VALUE(18),
              fontFamily: Fonts.REGULAR,
              color: Colors.BLACK,
            },
            container: {
              flex: containerFlex,
            },
            listView: {
              width: '99%',
              alignSelf: 'center',
            },
            poweredContainer: {
              display: 'none',
            },
            row: {
              backgroundColor: '#F7F7F6',
            },
          }}
          textInputProps={{
            clearButtonMode: 'never',
          }}
          // ... Other props as needed ...
        />
      ) : (
        <Pressable style={[styles.SearchBar, style]} onPress={onPress}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* Search Icon */}
            <View style={styles.rightIconView}>
              <Image
                style={[styles.searchIcon, searchIconStyle]}
                source={Images.SEARCH_ICON}
              />
            </View>
            {/* Search Input */}
            <TextInput
              onEndEditing={onEndEditing}
              ref={myref}
              onSubmitEditing={onSubmitEditing}
              onKeyPress={onKeyPress}
              editable={editable}
              value={searchQuery}
              onChangeText={(value) => setSearchQuery(value)}
              autoFocus={autoFocus}
              placeholder={placeholder}
              placeholderTextColor={
                placeholderTextColor
                  ? placeholderTextColor
                  : Colors.PLACEHOLDERTEXTCOLOR
              }
              style={[styles.searchInput, inputStyle]}
            />
            <View style={styles.rightIconView}></View>
          </View>
        </Pressable>
      )}
    </>
  );
};
