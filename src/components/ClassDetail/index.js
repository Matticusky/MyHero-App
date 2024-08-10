import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets'; // Assuming you have Icons defined
import { UtilityMethods, FontSize } from '../../utility';

const ClassDetails = ({ section, instructor, date, timeSlot }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleOpen}>
        <Text style={styles.headerText}>Class Details:</Text>
        {isOpen ? <Icons.UpArrow /> : <Icons.DownArrow />}
      </Pressable>
      {isOpen && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Class Section</Text>
            <Text style={styles.value}>{section}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Instructor</Text>
            <Text style={styles.value}>{instructor}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Class Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Time Slot</Text>
            <Text style={styles.value}>{timeSlot}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.WHITE,
    // borderRadius: UtilityMethods.wp(2),
    // shadowColor: Colors.BLACK,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:Colors.BOX_HEADER,
    padding: UtilityMethods.wp(4),
  },
  headerText: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  details: {
    marginTop: UtilityMethods.hp(2),
    paddingHorizontal: UtilityMethods.wp(4),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UtilityMethods.hp(1),
    borderBottomColor:Colors.BOX_HEADER,
    borderBottomWidth:1,
    paddingBottom:UtilityMethods.hp(1)
  },
  label: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  value: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GRAY,
  },
});

export default ClassDetails;
