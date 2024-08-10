import { Colors } from "../../assets";
import { UtilityMethods, CommonStyles, FontSize } from "../../utility";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  backgroundColor: Colors.RED,
  shadowColor: Colors.BLACK,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
});

export default styles;
