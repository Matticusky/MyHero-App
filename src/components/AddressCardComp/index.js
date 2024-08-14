import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets'; // Assuming you have these in your project
import { UtilityMethods, FontSize } from '../../utility'; // Assuming you have these in your project

const AddressCardComp = ({ locationIcon, editIcon, title, address, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        {locationIcon}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.editIconContainer}>
        {editIcon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: UtilityMethods.wp(4),
    borderRadius: UtilityMethods.wp(2),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: UtilityMethods.hp(1),
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: UtilityMethods.wp(4),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  address: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
    marginTop: UtilityMethods.hp(0.5),
  },
  editIconContainer: {
    marginLeft: UtilityMethods.wp(4),
  },
});

export default AddressCardComp;
