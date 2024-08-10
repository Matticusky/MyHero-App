import { StyleSheet } from "react-native";
import {  FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({

  contentContainerStyle:{
    paddingHorizontal:UtilityMethods.wp(6),
    paddingVertical:UtilityMethods.hp(2)
  },
  title:{
    color:Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    fontSize:FontSize.VALUE(14)
  },
  otpContainer:{
    marginVertical:UtilityMethods.hp(4),
  },
  error:{
    fontSize:FontSize.VALUE(16),
    color:Colors.BLACK,
    marginTop:UtilityMethods.hp(1.5),
    marginBottom:UtilityMethods.hp(2)
  },
  container: {
    paddingVertical: UtilityMethods.hp(2),

  },
  noteTitle: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  noteBody: {
    flexDirection: 'row',
    marginTop: UtilityMethods.hp(1),
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: FontSize.VALUE(14),
    marginRight: UtilityMethods.wp(2),
    color: Colors.BLACK,
  },
  noteText: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
    flexWrap: 'wrap',
  },
  highlightText: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.BOLD,
    color: Colors.RED,
  },
});

export default styles;
