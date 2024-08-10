import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, Alert, Platform } from 'react-native';

import { CommonStyles, FontSize, UtilityMethods } from '../../utility';
import { Colors, Fonts, Icons } from '../../assets';
import FastImageComponent from '../FastImageComponent';

const { wp, hp } = UtilityMethods;

const ImagePicker = ({ filedInfo, editImage, setEditImage, onChnage }) => {

  const onPressImage = () => {

    Alert.alert("Choose Image", "Select Image from", [
      {
        text: "Camera", onPress: () => {
          openCamera()
        }
      },
      {
        text: "Gallery", onPress: () => {
          openGallery()
        }
      },
      { text: "Cancel", onPress: () => { } }
    ])
  }

  const openCamera = () => {
    UtilityMethods.selectImage("camera", (response) => {
      onChnage(response.path)
      const imageData = formateData(response)
      setEditImage?.(imageData)
    }, false
    )
  }


  const openGallery = () => {
    UtilityMethods.selectImage("gallery", (response) => {
      onChnage(response.path)
      const imageData = formateData(response)
      setEditImage?.(imageData)
    }, false
    )
  }

  const formateData = (response) => {
    return Platform.OS === 'android' ? {
      uri: response.path,
      name: getFileName(response.path),
      type: response.mime,
    } :
      {
        uri: response.sourceURL,
        name: response.filename,
        type: response.mime,
      }
  }

  const getFileName = (filePath) => {
    return filePath.split('/').pop();
  };

  return (
    <View>
      <View style={styles.ImageCont(filedInfo?.error)}>

        {filedInfo?.value ?
          <>
            <FastImageComponent style={styles.imageView} source={{
              uri: filedInfo?.value
            }} />

            <TouchableOpacity style={styles.editProfile}
              onPress={() => {
                onPressImage()
              }}
              hitSlop={40}
            >
              <Icons.PencilLine />
            </TouchableOpacity>
          </>
          :
          <TouchableOpacity style={styles.emptyCont}
            onPress={() => {
              onPressImage()
            }}
          >

            <Icons.Upload
              width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)}
            />

            <Text style={styles.regText}>
              Upload Photo
            </Text>

          </TouchableOpacity>
        }

      </View>
      <View style={styles.titleCont}>
        <Text style={[styles.TitleStyle]}>
          {filedInfo?.title}
        </Text>
        {!filedInfo?.atEdit && <Text style={[styles.hashText]}>*</Text>}


      </View>
      {filedInfo?.error &&
        <Text style={[styles.ErrorText]}>
          {filedInfo?.error}
        </Text>
      }
    </View>

  );
};

const styles = StyleSheet.create({
  ImageCont: (error) => ({
    width: UtilityMethods.wp(30),
    height: UtilityMethods.wp(30),
    borderRadius: UtilityMethods.wp(100),
    borderColor: error ? Colors.RED : Colors.LIGHT_GRAY,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "dashed",
    alignSelf: "center",



  }),
  input: {
    ...CommonStyles.REGULAR,
    borderRadius: hp(1),
    width: wp(15),
    height: wp(15),
    textAlign: 'center',
    backgroundColor: Colors.GRAY_06,
    color: Colors.BLACK,
  },
  emptyCont: {
    width: UtilityMethods.wp(28),
    height: UtilityMethods.wp(28),
    borderRadius: UtilityMethods.wp(100),
    backgroundColor: Colors.MEDIUM_GRAY,
    justifyContent: "center",
    alignItems: "center"


  },
  regText: {
    fontSize: FontSize.VALUE(12),
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    marginTop: UtilityMethods.hp(1)



  },
  imageView: {
    width: UtilityMethods.wp(28),
    height: UtilityMethods.wp(28),
    borderRadius: UtilityMethods.wp(100),

  },
  editProfile: {
    position: "absolute",
    width: UtilityMethods.wp(7),
    height: UtilityMethods.wp(7),
    borderRadius: UtilityMethods.wp(100),
    backgroundColor: Colors.CHARCOL,
    zIndex: 1,
    bottom: 0,
    right: 0,
    marginRight: UtilityMethods.wp(2),
    marginBottom: UtilityMethods.wp(2),
    justifyContent: "center",
    alignItems: "center"

  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: UtilityMethods.wp(2)
  },

  TitleStyle: {
    fontSize: FontSize.VALUE(16),
    color: Colors.ICON_BLACK,
    fontFamily: Fonts.REGULAR,

  },
  hashText: {
    fontSize: FontSize.VALUE(18),
    color: Colors.RED,
    fontFamily: Fonts.REGULAR,
    marginLeft: UtilityMethods.wp(1),

  },
  ErrorText: {
    marginTop: UtilityMethods.hp(1),

    fontSize: FontSize.VALUE(14),
    color: Colors.RED,

    fontWeight: Fonts.REGULAR,
    textAlign: 'center',
  }

});

export default ImagePicker;
