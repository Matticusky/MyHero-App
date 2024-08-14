import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../assets'
import { CommonStyles, FontSize, UtilityMethods } from '../../../utility'

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    ...CommonStyles.PADDING_HORIZONTAL,
    paddingTop: UtilityMethods.hp(1),
    paddingBottom: UtilityMethods.hp(1)

  },
  userName: {

    color: Colors.BLACK,
    marginTop: UtilityMethods.hp(1),
    fontSize: FontSize.VALUE(16),
    textAlign: "center",
    fontFamily: Fonts.MEDIUM,
  },
  userEmail: {
    color: Colors.GRAY,
    // marginTop: UtilityMethods.hp(0.5),
    fontSize: FontSize.VALUE(14),
    textAlign: "center",
    fontFamily: Fonts.REGULAR,
    marginBottom:UtilityMethods.hp(1)
  },
  ImageCont: {
    width: UtilityMethods.wp(24),
    height: UtilityMethods.wp(24),
    borderRadius: UtilityMethods.wp(100),
    borderColor: Colors.BLACK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "dashed",
    alignSelf: "center",



  },
  imageView: {
    width: UtilityMethods.wp(22),
    height: UtilityMethods.wp(22),
    borderRadius: UtilityMethods.wp(100),

  },
})

export default styles