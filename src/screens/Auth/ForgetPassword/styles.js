import { StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
    ...CommonStyles.PADDING_HORIZONTAL,
 },
 contentContainerStyle:{
  flexGrow: 1,
  paddingTop:UtilityMethods.hp(5),
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
  
   
  },


  inPutCont:{
    marginTop:UtilityMethods.hp(4),
     rowGap:UtilityMethods.hp(2),
    alignItems:'center',
  

  },
 
  regText:{
    fontSize:FontSize.VALUE(14),
    color:Colors.GRAY,
    fontFamily:Fonts.REGULAR,
    textAlign:'center',
    lineHeight:UtilityMethods.hp(2.5),
    width:"90%",

   
    
  
  },
  optView:{
    width:"80%",
    marginTop:UtilityMethods.hp(2),
  },
  countCant:{
    marginTop:UtilityMethods.hp(4),
    
  
  },
  boldText:{
    fontSize:FontSize.VALUE(16),
    color:Colors.BLACK,
    fontFamily:Fonts.SEMI_BOLD,
    textAlign:'center',
    lineHeight:UtilityMethods.hp(2.5),
    marginTop:UtilityMethods.hp(4)
  
  }
  
 
});

export default styles;
