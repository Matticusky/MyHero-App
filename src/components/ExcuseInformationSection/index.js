import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const ExcuseInformationSection = ({ className, classSection, dateTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Requesting attendance for class:</Text>
      <Text style={styles.value}>{className}</Text>

      <Text style={styles.label}>Class Section:</Text>
      <Text style={styles.value}>{classSection}</Text>

      <Text style={styles.label}>Date and Time:</Text>
      <Text style={styles.value}>{dateTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: UtilityMethods.wp(4),
    paddingTop:UtilityMethods.hp(2),
    paddingBottom:UtilityMethods.hp(2)
  },
  label: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
  },
  value: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(1),
    lineHeight:FontSize.VALUE(19)
  },
});

export default ExcuseInformationSection;
