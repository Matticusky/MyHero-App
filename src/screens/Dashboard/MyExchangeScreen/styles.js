import { StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";




const styles = StyleSheet.create({
  cont: {

    ...CommonStyles.CONTAINER,
    // backgroundColor:Colors.RED,

  },
  titleText: {
    ...CommonStyles.BOLD,
    color: Colors.BLACK,
    // marginTop:UtilityMethods.hp(5),
    fontSize: FontSize.VALUE(20),
    textAlign: "center"
  },
  button: {
    marginTop: UtilityMethods.hp(5),
    backgroundColor: Colors.SECONDARY1,
  },
  linkText: {
    ...CommonStyles.REGULAR,
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(14),
    marginLeft: UtilityMethods.wp(1)
  },
  headerText: {
    ...CommonStyles.SEMI_BOLD,
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(18),
  },
  regText: {
    ...CommonStyles.REGULAR,
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(16),
    marginTop: UtilityMethods.hp(1)

  },
  headerCont: {
    ...CommonStyles.PADDING_HORIZONTAL

  },
  listStyle: {
    marginTop: UtilityMethods.hp(2),
  },
  listContainer: {
    paddingHorizontal: UtilityMethods.wp(5),
    paddingBottom:UtilityMethods.hp(10)
  },
  gridContainer: {
    width: UtilityMethods.wp(30)
  },
  creditsTitle: {
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.MEDIUM,
    marginTop: UtilityMethods.hp(1)
  },
  header:{
    marginTop:UtilityMethods.hp(2),
  },
  booksTitle: {
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.BOLD,
    marginTop: UtilityMethods.hp(1),
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  purchaseButton:{
    position:'absolute',
    zIndex:1,
    bottom:UtilityMethods.wp(-2),
    margin:UtilityMethods.wp(5),
    width:UtilityMethods.wp(91),
  },
});

export default styles;
