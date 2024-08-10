import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Images } from '../../assets';

const Checkbox = ({ label, value, onValueChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onValueChange(!value)} activeOpacity={0.8}>
      <View style={[styles.checkbox, value && styles.checkboxActive]}>
        {/* {value && <Image source={Images.TICK} style={styles.checkboxImage} />} */}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxImage: {
    width: 16, // Set the width of the tick image
    height: 16, // Set the height of the tick image
    resizeMode: 'contain', // This makes sure the image scales nicely within the checkbox
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 3,
    marginRight: 8,
  },
  checkboxActive: {
    // backgroundColor: '#000',
  },
  checkboxCheck: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
  },
});
