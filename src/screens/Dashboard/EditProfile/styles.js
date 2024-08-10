import { Platform, StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
    flex:1,
    ...CommonStyles.PADDING_HORIZONTAL,
    paddingTop:UtilityMethods.hp(2),
 

    
    
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
  

  inPutCont:{
    marginTop:UtilityMethods.hp(2),
    rowGap:UtilityMethods.hp(2)
  

  },
  rowCont:{
    flexDirection:'row',
    
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
    marginTop:UtilityMethods.hp(2)

  },
  underLineText:{
    fontSize:FontSize.VALUE(14),
    color:Colors.BLACK,
    fontFamily:Fonts.MEDIUM,
    textDecorationLine:"underline",
    marginLeft:UtilityMethods.wp(1)
    
  },
  buttonContainer:{
    marginTop:'auto',
    marginBottom:UtilityMethods.hp(2)
},
changePassowrd:{
    marginTop:UtilityMethods.hp(1),
    backgroundColor:Colors.WHITE,
    borderColor:Colors.BLACK,
    borderWidth:1,
    marginBottom: Platform.OS === 'ios' ? null : UtilityMethods.hp(2)
},
changePassowrdText:{
    color:Colors.BLACK,
}
});

export default styles;
