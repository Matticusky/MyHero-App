import { StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
    flex:1,
    ...CommonStyles.PADDING_HORIZONTAL,
    paddingTop:UtilityMethods.hp(10),
    alignItems:'center',

    
    
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
  userTypeCont:(selected)=>({
    width:"100%",
    height:UtilityMethods.hp(7),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:UtilityMethods.wp(5),
  
   borderRadius:UtilityMethods.hp(100),
    marginTop:UtilityMethods.hp(3),
    borderWidth:1,
    borderColor:selected?Colors.BLACK:Colors.LIGHT_GRAY,
    borderStyle:selected?'solid':'dashed',
    
    
  }),
  userText:(selected)=>({
    fontSize:FontSize.VALUE(16),
    color:selected?Colors.BLACK:Colors.GRAY,
    fontFamily:Fonts.MEDIUM,
  }),
  radioButton:(selected)=>({
    width:UtilityMethods.wp(4),
    height:UtilityMethods.wp(4),
    borderRadius:UtilityMethods.wp(100),
    borderWidth:1,
    borderColor:selected?Colors.BLACK:Colors.LIGHT_GRAY,
    justifyContent:'center',
    alignItems:'center',
  }),
  insideRadio:(selected)=>({
    width:UtilityMethods.wp(2.5),
    height:UtilityMethods.wp(2.5),
    borderRadius:UtilityMethods.wp(100),
    backgroundColor:selected?Colors.BLACK:Colors.WHITE
  }
  ),
  list:{
    width:"100%",
    height:UtilityMethods.hp(26),
    
    
  }

 
});

export default styles;
