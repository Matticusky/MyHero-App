import { Fonts, Colors } from "../assets";
import FontSize from "./FontSize";
import UtilityMethods from "./UtilityMethods";

const { StyleSheet, Platform } = require("react-native");

const CommonStyles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  CONTAINER_WITH_TRANSPARENT_BACKGROUND: {
    flex: 1,
    backgroundColor: Colors.TransParentBackground,
  },
  BODY: {
    flex: 1,
    paddingHorizontal: UtilityMethods.wp(5),
  },

  PADDING_HORIZONTAL: {
    paddingHorizontal: UtilityMethods.wp(5),

  },
  SEMI_BOLD: {
   
    fontFamily: Fonts.SEMI_BOLD,
  },
  BOLD: {
    
    fontFamily: Fonts.BOLD,
  },
  MEDIUM: {
  
    fontFamily: Fonts.MEDIUM,
  },
  REGULAR: {
   
    fontFamily: Fonts.REGULAR,
  },
  REGULAR_TEXT: {
 
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
  },
  BOLD_TEXT: {
   
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(18),
    color: Colors.BLACK,
  },
  MEDIUM_TEXT: {
   fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
  },
  MARGIN_FROM_BOTTOM: {
    marginTop: "auto",
    marginBottom: UtilityMethods.hp(2),
  },
  MARGIN_FROM_BOTTOM_WITH_NOSH: {
    marginTop: "auto",
    marginBottom: UtilityMethods.hasNotch()
      ? UtilityMethods.hp(5)
      : UtilityMethods.hp(3),
  },
  ROW_VIEW: {
    flexDirection: "row",
    alignItems: "center",
  },
  ModalHandle: {
    width: UtilityMethods.wp(10),
    height: UtilityMethods.hp(0.5),
    borderRadius: 10,
    backgroundColor: "#BEBFC0",
    alignSelf: "center",
    marginTop: UtilityMethods.hp(1),
    marginBottom: UtilityMethods.hp(1),
  },
  ModalStyle: {
    flex: 1,
    paddingHorizontal: UtilityMethods.wp(5),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#F7F8FA",
  },
  relocateButton: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    width: UtilityMethods.wp(11),
    height: UtilityMethods.wp(11),
    marginLeft: "auto",
    marginRight: UtilityMethods.wp(5),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: UtilityMethods.hp(2),
  },
  locationIcon: {
    width: UtilityMethods.wp(5),
    height: UtilityMethods.hp(5),
    resizeMode: "contain",
  },
});

export default CommonStyles;
