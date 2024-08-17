import { StyleSheet } from "react-native";
import {  FontSize, UtilityMethods } from '../../../utility'; 
import { Colors, Fonts } from '../../../assets';

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      padding: UtilityMethods.wp(4),
      backgroundColor: Colors.WHITE,
    },
    listContainer: {
      paddingBottom: UtilityMethods.hp(2),
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.BLACK,
      padding: UtilityMethods.wp(4),
      borderRadius: UtilityMethods.wp(2),
      marginBottom: UtilityMethods.hp(2),
    },
    infoContainer: {
      flexDirection: 'column',
    },
    creditsText: {
      fontSize: FontSize.VALUE(16),
      fontFamily: Fonts.BOLD,
      color: Colors.BLACK,
    },
    priceText: {
      fontSize: FontSize.VALUE(14),
      color: Colors.RED,
      fontFamily: Fonts.REGULAR,
    },
    buyButton: {
      backgroundColor: Colors.BLACK,
      paddingVertical: UtilityMethods.hp(1),
      paddingHorizontal: UtilityMethods.wp(4),
      borderRadius: UtilityMethods.wp(2),
    },
    buyButtonText: {
      color: Colors.WHITE,
      fontFamily: Fonts.BOLD,
      fontSize: FontSize.VALUE(14),
    },
  });
export default styles