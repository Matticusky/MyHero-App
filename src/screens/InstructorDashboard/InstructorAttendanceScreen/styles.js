import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts, Icons } from '../../../assets';
import { UtilityMethods, FontSize } from '../../../utility';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: UtilityMethods.wp(5),
    },
    otpContainer: {
      marginTop: UtilityMethods.hp(5),
      marginBottom: UtilityMethods.hp(2),
      alignItems: 'center',
    },
    otpText: {
      fontSize: FontSize.VALUE(68),
      fontFamily: Fonts.BOLD,
      color: Colors.BLACK,
      letterSpacing: UtilityMethods.wp(1),
    },
    timerText: {
      fontSize: FontSize.VALUE(24),
      fontFamily: Fonts.REGULAR,
      color: Colors.LIGHT_GRAY,
      marginTop: UtilityMethods.hp(1),
    },
    instructionText: {
      fontSize: FontSize.VALUE(16),
      fontFamily: Fonts.REGULAR,
      color: Colors.GRAY,
      textAlign: 'center',
      marginVertical: UtilityMethods.hp(2),
      marginHorizontal:UtilityMethods.wp(4)
    },
    dropdown: {
      width: '100%',
      marginBottom: UtilityMethods.hp(2),
    },
    generateButton: {
      backgroundColor: Colors.BLACK,
      marginBottom: UtilityMethods.hp(2),
      marginTop:'auto'
    },
    listButton: {
      backgroundColor: Colors.WHITE,
      borderColor: Colors.BLACK,
      borderWidth: 1,
      marginBottom: Platform.OS === 'android' ? UtilityMethods.hp(2) : null
    },
    listButtonText:{
      color:Colors.BLACK
    },
  });
  
export default styles