import { StyleSheet, } from 'react-native'
import { FontSize, UtilityMethods } from '../../../utility';
import { Colors, Fonts } from '../../../assets';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: UtilityMethods.wp(4),
        backgroundColor: Colors.WHITE,
    },
    image: {
        width: '100%',
        height: UtilityMethods.hp(26), // Adjust height as needed
        borderRadius: UtilityMethods.wp(4),
        marginBottom: UtilityMethods.hp(2),
    },
    title: {
        fontFamily: Fonts.BOLD,
        fontSize: FontSize.VALUE(20),
        color: Colors.BLACK,
        marginBottom: UtilityMethods.hp(1),
    },
    listItem: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.VALUE(14),
        color: Colors.BLACK,
        marginBottom: UtilityMethods.hp(1),
        lineHeight: UtilityMethods.hp(2.5),
    },
    changePassowrd: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.LINK,
        borderWidth: 1,
        width:UtilityMethods.wp(24),
        height:UtilityMethods.hp(3),
    },
    changePassowrdText: {
        color: Colors.LINK,
        fontSize:FontSize.VALUE(12)
    }
});
export default styles 