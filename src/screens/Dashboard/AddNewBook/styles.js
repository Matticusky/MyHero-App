import { StyleSheet } from "react-native";
import { CommonStyles, UtilityMethods } from "../../../utility";
import { Colors } from "../../../assets";

const styles = StyleSheet.create({
   cont: {
      flex: 1,
      paddingVertical: UtilityMethods.hp(1)
   },
   titleStyle: {
      paddingHorizontal: UtilityMethods.wp(4),
      marginBottom: UtilityMethods.hp(2)
   },
   buttonContainer: {
      marginTop: 'auto',
      marginBottom: UtilityMethods.hp(2),
      paddingHorizontal:UtilityMethods.wp(4)
   },
   changePassowrd: {
      marginTop: UtilityMethods.hp(1),
      backgroundColor: Colors.WHITE,
      borderColor: Colors.BLACK,
      borderWidth: 1,
   },
   changePassowrdText: {
      color: Colors.BLACK,
   }
})
export default styles