import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const ReasonTextInput = ({ reason, setReason }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reason for Absence</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your reason for absence..."
        value={reason}
        onChangeText={setReason}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: UtilityMethods.wp(4),
    // marginVertical: UtilityMethods.hp(2),
  },
  title:{
    fontFamily:Fonts.REGULAR,
    fontSize:FontSize.VALUE(16),
    color:Colors.GRAY,
    marginBottom:UtilityMethods.hp(1)
  },
  textInput: {
    height: UtilityMethods.hp(15),
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: UtilityMethods.wp(2),
    paddingHorizontal: UtilityMethods.wp(4),
    paddingVertical: UtilityMethods.wp(3),
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    textAlignVertical: 'top',
  },
});

export default ReasonTextInput;
