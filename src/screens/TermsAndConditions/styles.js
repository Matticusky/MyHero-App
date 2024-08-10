import { StyleSheet } from "react-native";
import { Colors, Fonts,  } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';
const styles = StyleSheet.create({
    container: {
      padding: UtilityMethods.wp(5),
      backgroundColor: Colors.WHITE,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: UtilityMethods.hp(2),
    },
    headerTitle: {
      marginLeft: UtilityMethods.wp(3),
      fontSize: FontSize.VALUE(18),
      fontFamily: Fonts.BOLD,
      color: Colors.BLACK,
    },
    sectionTitle: {
      fontSize: FontSize.VALUE(16),
      fontFamily: Fonts.SEMI_BOLD,
      color: Colors.GRAY,
      marginBottom: UtilityMethods.hp(1),
    },
    content: {
      fontSize: FontSize.VALUE(16),
      fontFamily: Fonts.REGULAR,
      color: Colors.GRAY,
      marginBottom: UtilityMethods.hp(3),
      lineHeight: FontSize.VALUE(20),
    },
    boldText: {
      fontFamily: Fonts.SEMI_BOLD,
      color: Colors.GRAY,
    },
  });
export default styles