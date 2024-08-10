import { Colors, Fonts } from '../../assets';
import { UtilityMethods, CommonStyles, FontSize } from '../../utility';

const { StyleSheet, Platform } = require('react-native');

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
   
  },
  container: (isInValidField) => ({
    margin: 0,
  
   borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: UtilityMethods.hp(6),
    borderColor: Colors.ICON_BLACK,
    

    // marginTop: UtilityMethods.hp(1.5),
    // paddingBottom: UtilityMethods.hp(0.5),
  }),

  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: UtilityMethods.wp(1),
  },

  TitleStyle: {
    fontSize: FontSize.VALUE(16),
    color: Colors.ICON_BLACK,
     fontFamily:Fonts.REGULAR,

  },
  hashText: {
    fontSize: FontSize.VALUE(18),
    color: Colors.RED,
    fontFamily:Fonts.REGULAR,
    marginLeft: UtilityMethods.wp(1),

  },

  leftIconCont:{
    width: UtilityMethods.wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red",
    height: UtilityMethods.hp(6),

  },
  rightIconCont:{
    width: UtilityMethods.wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    height: UtilityMethods.hp(6),
  },


  input: {
    padding: 0,
    margin: 0,
    width: '100%',
    color: Colors.ICON_BLACK,
    fontSize: FontSize.VALUE(16),
    fontFamily:Fonts.REGULAR,
    textAlignVertical: 'center',
    height: UtilityMethods.hp(6),
    paddingRight:UtilityMethods.wp(4)
  },
  eyeIcon: {
    width: UtilityMethods.wp(6),
    height: UtilityMethods.wp(6),
    marginTop: UtilityMethods.hp(0.5),

    resizeMode: 'contain',
  },

  searchIcon: {
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
    resizeMode: 'contain',
    pointerEvents: 'auto',
  },

  rightIcon: {
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
    resizeMode: 'contain',
    zIndex: 1,
  },
 
  TitleTextWithBorder: {
    ...CommonStyles.SEMI_BOLD,
    fontSize: FontSize.VALUE(20),
    color: Colors.BLACK,
    marginLeft: UtilityMethods.wp(5),
  },
  ErrorText: {
    marginTop: UtilityMethods.hp(1),

    fontSize: FontSize.VALUE(14),
    color: Colors.RED,
    marginLeft: UtilityMethods.wp(1),
    fontWeight:Fonts.REGULAR,
  },
  inputWithBorder: {
    flexDirection: 'row',
    width: UtilityMethods.wp(90),
    height: UtilityMethods.hp(6),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: 'center',
  },
  iconView: {
    flex: 0.15,

    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    flex: 0.85,

    textAlignVertical: 'center',
    color: Colors.BLACK,
    ...CommonStyles.REGULAR,
    fontSize: FontSize.VALUE(16),
  },
  roundCount: {
    width: UtilityMethods.wp(6),
    height: UtilityMethods.wp(6),
    borderRadius: UtilityMethods.wp(100),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundIcon: {
    width: UtilityMethods.wp(3.5),
    height: UtilityMethods.wp(3.5),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
  inputWithBorderTextArea: {
    width: UtilityMethods.wp(90),
    height: UtilityMethods.hp(20),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: 'center',
    textAlignVertical: 'top',
    color: Colors.BLACK,
    ...CommonStyles.REGULAR,
    fontSize: FontSize.VALUE(16),
    paddingHorizontal: UtilityMethods.wp(3),
  },
  SearchBar: {
    width: '100%',
    height: UtilityMethods.hp(5),
    backgroundColor: '#F7F7F6',
    borderRadius: 10,

    alignSelf: 'center',
  },
  rightIconView: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    justifyContent: 'center',

    fontSize: FontSize.VALUE(16),
    ...CommonStyles.REGULAR,
    color: Colors.BLACK,
    textAlignVertical: 'center',
    padding: 0,
    marginTop: Platform.OS == 'android' ? UtilityMethods.hp(0.3) : 0,
  },
  rightIconViewPlaceView: {
    flex: 0.15,
    paddingTop: UtilityMethods.hp(1.2),
    height: UtilityMethods.hp(5),
    alignItems: 'center',
    backgroundColor: '#F7F7F6',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  checkBoxCont:(value)=>({
    width: UtilityMethods.wp(6),
    height: UtilityMethods.wp(6),
    
    
  }),

  
});

export default styles;
