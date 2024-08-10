import { Platform, StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
 
  
width:"100%",

height:UtilityMethods.hp(100),
 

 

  },
  headerCont:{
    flex:0.3,
    width:"100%",
    justifyContent:"flex-end",
    alignItems:"center",
    backgroundColor:Colors.BLACK,
    borderTopEndRadius:UtilityMethods.wp(6),

  },
  body:{

    flex:0.7,
    backgroundColor:Colors.WHITE,
    borderBottomRightRadius:UtilityMethods.wp(6)

  },
  titleText:{
    
    color:Colors.WHITE,
    marginTop:UtilityMethods.hp(2),
    fontSize:FontSize.VALUE(22),
    textAlign:"center",
    fontFamily:Fonts.SEMI_BOLD,
    paddingBottom:UtilityMethods.hp(3)
  },
  ImageCont:{
    width:UtilityMethods.wp(30),
    height:UtilityMethods.wp(30),
       borderRadius:UtilityMethods.wp(100),
       borderColor:Colors.PRIMARY,
       borderWidth:1,
       justifyContent:'center',
       alignItems:'center',
       borderStyle:"dashed",
       alignSelf:"center",
       


},
imageView:{
  width:UtilityMethods.wp(26),
  height:UtilityMethods.wp(26),
     borderRadius:UtilityMethods.wp(100),

},
itemCont:{
  width:"100%",
  height:UtilityMethods.hp(7),
 
  borderBottomWidth:1,
  borderBottomColor:Colors.BORDER_COLOR,
 
  flexDirection:"row",
  alignItems:"center"

},
iconCont:{
  width:UtilityMethods.wp(10),
  height:UtilityMethods.hp(7),
  justifyContent:"center",
  alignItems:"center",
  marginLeft:UtilityMethods.wp(2)
},
itemText:{
  fontSize:FontSize.VALUE(18),
  color:Colors.BLACK,
  fontFamily:Fonts.REGULAR,
  marginLeft:UtilityMethods.wp(2)
},
logoutCont:{
  width:"100%",
  height:Platform.OS === "ios" ? UtilityMethods.hp(10) : UtilityMethods.hp(7),
  backgroundColor:Colors.MILK,

  borderBottomRightRadius:UtilityMethods.wp(6),
  flexDirection:"row",
  alignItems:"center"
}
 
});

export default styles;
