import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../assets";
import { CommonStyles, FontSize, UtilityMethods } from "../../utility";



const styles = StyleSheet.create({

  mainContainer:{
    width:"100%",
    backgroundColor: Colors.BLACK,
    height: UtilityMethods.hp(6),
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
   
  },
  buttonText:{
    color:Colors.WHITE,
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.SEMI_BOLD
    
  },
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width:"100%"
  },
  iconView:{
    position:"absolute",
    right:0,
    marginRight:UtilityMethods.wp(4)
  },
  leftIconView:{
    position:"absolute",
    left:0,
    marginRight:UtilityMethods.wp(4)
  }
});

export default styles;
