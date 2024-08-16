import { StyleSheet, } from 'react-native'
import { CommonStyles, FontSize, UtilityMethods } from '../../../utility';
import { Colors, Fonts } from '../../../assets';


const styles = StyleSheet.create({
  cont: {
    flex: 1,
    ...CommonStyles.PADDING_HORIZONTAL,
    paddingTop: UtilityMethods.hp(1),
    paddingBottom: UtilityMethods.hp(1)

  },
  contentContainerStyle: {
    paddingHorizontal: UtilityMethods.wp(5),
    paddingTop: UtilityMethods.wp(3),
    paddingBottom: UtilityMethods.hp(10),
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: UtilityMethods.hp(2)
  },

  container: {
    padding: UtilityMethods.wp(4),
    backgroundColor: Colors.WHITE,
  },
  section: {
    marginBottom: UtilityMethods.hp(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: UtilityMethods.hp(1),
  },
  sectionNumber: {
    backgroundColor: Colors.BLACK,

    width: UtilityMethods.wp(8),
    height: UtilityMethods.wp(8),
    borderRadius: UtilityMethods.wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: UtilityMethods.wp(2),

  },
  sectionNumberText: {
    color: Colors.WHITE,
    fontSize: FontSize.VALUE(12),
    fontFamily: Fonts.MEDIUM,
  },
  sectionTitle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
  },
  infoText: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(12),
    color: Colors.LIGHT_GRAY,
    marginBottom: UtilityMethods.hp(1),
  },
  billingTypeTitle: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    marginTop: UtilityMethods.hp(2),
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: UtilityMethods.hp(1.5),
    // ...CommonStyles.Shadow,
  },
  rowCont: {
    flexDirection: 'row',
    paddingHorizontal: UtilityMethods.wp(1),
    marginTop: UtilityMethods.wp(2)
  },
  regText: {
    fontSize: FontSize.VALUE(14),
    lineHeight: FontSize.VALUE(17),
    color: Colors.ICON_BLACK,
    fontFamily: Fonts.REGULAR,
    marginLeft: UtilityMethods.wp(2),
  },
  changePassowrd: {
    marginTop: UtilityMethods.hp(1),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLACK,
    borderWidth: 1,
  },
  changePassowrdText: {
    color: Colors.BLACK,
  },
});
export default styles 