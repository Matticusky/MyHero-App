import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize, CommonStyles } from '../../utility';
import DateAndTime from '../../utility/DateAndTime';

const DatePickerComponent = ({
  label = "Select Date",
  placeholder = "No date selected",
  date,
  setDate,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const resetDate = () => {
    setDate(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dateContainer}> 
        <Text style={styles.dateText}>{date ? DateAndTime.formatDateForDatePicker(date) : placeholder}</Text>
        <TouchableOpacity onPress={date ? resetDate : showDatePicker} style={styles.iconContainer}>
          {date ? (
            <Text style={styles.resetText}>Reset</Text>
          ) : (
            <Icons.CalendarYellow width={20} height={20} color={Colors.YELLOW} />
          )}
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: UtilityMethods.hp(1),
    width:UtilityMethods.wp(90),
    alignSelf:'center',
    backgroundColor:Colors.WHITE
  },
  label: {
    fontSize: FontSize.VALUE(14),
    color: Colors.DARK_GRAY,
    fontFamily: Fonts.REGULAR,
    marginBottom: UtilityMethods.hp(0.5),
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 4,
    height: UtilityMethods.hp(6),
  },
  dateText: {
    flex: 1,
    paddingHorizontal: UtilityMethods.wp(2),
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  iconContainer: {
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:UtilityMethods.wp(4),
    height: '100%',
  },
  resetText: {
    color: Colors.PRIMARY,
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    
  },
});

export default DatePickerComponent;
