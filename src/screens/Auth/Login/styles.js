import { StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
    
    ...CommonStyles.PADDING_HORIZONTAL,
    paddingTop:UtilityMethods.hp(4),

   
 

    
    
 },
  logo:{
    width:UtilityMethods.wp(24),
    height:UtilityMethods.wp(24),
    resizeMode:'contain',
    alignSelf:'center'
  },
  mainText:{
    fontSize:FontSize.VALUE(20),
    color:Colors.BLACK,
    fontFamily:Fonts.SEMI_BOLD,
    marginTop:UtilityMethods.hp(5),
   
  },
  regText:{
    fontSize:FontSize.VALUE(14),
    color:Colors.GRAY,
    fontFamily:Fonts.REGULAR,
    marginTop:UtilityMethods.hp(1)
  },

  inPutCont:{
    marginTop:UtilityMethods.hp(6),
    rowGap:UtilityMethods.hp(2)
  

  },
  rowCont:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:UtilityMethods.wp(1),
  
  },
  regText:{
    fontSize:FontSize.VALUE(14),
    color:Colors.ICON_BLACK,
    fontFamily:Fonts.REGULAR,
    marginLeft:UtilityMethods.wp(2),
    
  
  },
  LinkedView:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:UtilityMethods.hp(3)

  }
});

export default styles;
