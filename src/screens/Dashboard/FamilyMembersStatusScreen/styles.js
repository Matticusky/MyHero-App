import { StyleSheet, } from 'react-native'
import { FontSize, UtilityMethods } from '../../../utility';
import { Colors, Fonts } from '../../../assets';


const styles = StyleSheet.create({
    contentContainerStyle:{
        paddingTop:UtilityMethods.wp(3),
        backgroundColor:Colors.WHITE,
    },
    buttonContainer:{
        width:'100%',
        paddingHorizontal:UtilityMethods.wp(5),
        paddingVertical:UtilityMethods.wp(3),
        position:'absolute',
        bottom:0,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: UtilityMethods.hp(2),
        paddingHorizontal: UtilityMethods.wp(5),
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.LIGHT_GRAY,
    },
    avatar: {
        width: UtilityMethods.wp(12),
        height: UtilityMethods.wp(12),
        borderRadius: UtilityMethods.wp(6),
    },
    infoContainer: {
        flex: 1,
        marginLeft: UtilityMethods.wp(3),
    },
    name: {
        fontFamily: Fonts.MEDIUM,
        fontSize: FontSize.VALUE(16),
        lineHeight: FontSize.VALUE(18),
        color: Colors.BLACK,
    },
    email: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.VALUE(14),
        lineHeight: FontSize.VALUE(16),
        color: Colors.GRAY,
    },
    statusButton: {
        borderColor: Colors.GOLD,
        borderWidth: 1,
        borderRadius: UtilityMethods.wp(2),
        paddingHorizontal: UtilityMethods.wp(4),
        paddingVertical: UtilityMethods.hp(0.5),
    },
    statusButtonText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.VALUE(14),
        color: Colors.GOLD,
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