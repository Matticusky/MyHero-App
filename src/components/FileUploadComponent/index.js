import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';
import DocumentPicker from 'react-native-document-picker';

const FileUploadComponent = ({ file, setFile }) => {
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(pre => [...pre, result?.[0]]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
    }
  };

  const handleRemoveFile = (index) => {
    setFile(prevFiles => prevFiles.filter((file, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Attach files to support your request"
        editable={false}
      />

      <TouchableOpacity style={styles.iconButton} onPress={handleFilePick}>
        <Icons.Attach />
      </TouchableOpacity>

      <View style={styles.files}>
        {file.length > 0 &&
          file.map((item, index) => (
            <View style={styles.fileContainer} key={index}>
              <View style={styles.fileIcon}>
                <Icons.PDF />
              </View>
              <TouchableOpacity onPress={() => handleRemoveFile(index)} style={styles.cross}>
                <Icons.Cross />
              </TouchableOpacity>
            </View>
          ))
        }
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: UtilityMethods.wp(4),
    marginVertical: UtilityMethods.hp(2),
  },
  textInput: {
    height: UtilityMethods.hp(6),
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: UtilityMethods.wp(2),
    paddingHorizontal: UtilityMethods.wp(4),
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    flexDirection: 'row',
  },
  iconButton: {
    position: 'absolute',
    right: UtilityMethods.wp(0),
    borderTopRightRadius: UtilityMethods.wp(2),
    borderBottomRightRadius: UtilityMethods.wp(2),
    backgroundColor: Colors.BLACK,
    height: UtilityMethods.hp(6),
    paddingHorizontal: UtilityMethods.wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetText: {
    color: Colors.PRIMARY,
    fontFamily: Fonts.BOLD,
  },
  files:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    flexWrap:'wrap'
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: UtilityMethods.hp(2),
    backgroundColor:'#F3F3F3',
    paddingHorizontal:UtilityMethods.wp(1),
    paddingTop:UtilityMethods.wp(3),
    paddingVertical:UtilityMethods.wp(2),
    marginRight:UtilityMethods.wp(2),
    borderRadius:UtilityMethods.wp(2)
  },
  fileIcon: {
    marginRight: UtilityMethods.wp(1),
  },
  fileName: {
    flex: 1,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
  },
  cross:{
    top:UtilityMethods.wp(-1.5)
  }
});

export default FileUploadComponent;
