import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontSize, UtilityMethods } from '../../utility'
import { Colors, Fonts, Icons } from '../../assets'

const CoverImagePicker = ({ coverImage, setCoverImage }) => {

  const openCamera = () => {
    UtilityMethods.selectImage("camera", (response) => {
      const imageData = formateData(response)
      setCoverImage?.(imageData)
    }, false
    )
  }


  const openGallery = () => {
    UtilityMethods.selectImage("gallery", (response) => {
      const imageData = formateData(response)
      setCoverImage?.(imageData)
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

  console.log(coverImage,"coverImage")
  return (
    <View style={styles.container}>
      <View style={styles.uploadButton} >
        <Text style={styles.uploadText}>Upload book cover</Text>
        {
          coverImage?.uri && (
            <Image source={{ uri: coverImage?.uri }} style={styles.image} resizeMode='cover' />
          )
        }
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={openCamera} >
            <Icons.CameraIcon 
                width={UtilityMethods.wp(12)}
                height={UtilityMethods.wp(12)}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery}>
            <Icons.GalleryIcon 
              width={UtilityMethods.wp(12)}
              height={UtilityMethods.wp(12)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CoverImagePicker

const styles = StyleSheet.create({
  container: {

  },
  uploadButton: {
    paddingTop: UtilityMethods.hp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderStyle: 'dashed',
    borderRadius: UtilityMethods.wp(2),
    backgroundColor: Colors.LIGHT_BLUE,
    marginBottom: UtilityMethods.hp(2),
    marginHorizontal: UtilityMethods.wp(4),
    width: UtilityMethods.wp(50),
    height: UtilityMethods.wp(50),
    position: 'relative'
  },
  uploadText: {
    marginLeft: UtilityMethods.wp(2),
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.BLACK,
  },
  image:{
    position: 'absolute',
    width: UtilityMethods.wp(49),
    height: UtilityMethods.wp(49),
    borderRadius: UtilityMethods.wp(2),
    top:UtilityMethods.wp(0.2),
    zIndex:1,
  },
  iconsContainer: {
    position: 'absolute',
    borderRadius: UtilityMethods.wp(2),
    width: UtilityMethods.wp(50),
    height: UtilityMethods.wp(50),
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.1)',
    zIndex:2
  },
})