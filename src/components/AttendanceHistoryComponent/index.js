import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';

const AttendanceHistoryComponent = ({ status, className, dateTime }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Attendance Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Class:</Text>
        <Text style={styles.value}>{className}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date & Time:</Text>
        <Text style={styles.value}>{dateTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(2),
    padding: UtilityMethods.wp(4),
    marginVertical: UtilityMethods.hp(1),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UtilityMethods.hp(1),
  },
  label: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  value: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
  },
});

export default AttendanceHistoryComponent;
