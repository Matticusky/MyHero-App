import { StyleSheet } from "react-native";
import { FontSize, UtilityMethods } from "../../../utility";
import { Colors, Fonts } from "../../../assets";

const styles = StyleSheet.create({
    listContainer:{
        paddingHorizontal:UtilityMethods.wp(4)
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        // padding: UtilityMethods.wp(2),
        borderRadius: UtilityMethods.wp(2),
        backgroundColor: Colors.WHITE,
        marginVertical: UtilityMethods.hp(2),
        paddingHorizontal:UtilityMethods.wp(4),
        paddingLeft:UtilityMethods.wp(8)
    },
    bookImage: {
        width: UtilityMethods.wp(25),
        height: UtilityMethods.wp(25),
        borderRadius: UtilityMethods.wp(2),
        marginRight: UtilityMethods.wp(4),
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    bookTitle: {
        fontSize: FontSize.VALUE(16),
        lineHeight: FontSize.VALUE(18),
        fontFamily: Fonts.MEDIUM,
        color: Colors.BLACK,
        marginBottom: UtilityMethods.hp(1),
    },
    syncButton: {
        backgroundColor: Colors.BLACK,
        paddingVertical: UtilityMethods.hp(1.5),
        borderRadius: UtilityMethods.wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    syncButtonText: {
        fontSize: FontSize.VALUE(16),
        fontFamily: Fonts.SEMI_BOLD,
        color: Colors.WHITE,
    },
    audioTitle:{
        fontSize: FontSize.VALUE(16),
        lineHeight: FontSize.VALUE(18),
        fontFamily: Fonts.SEMI_BOLD,
        color: Colors.BLACK,
        marginBottom: UtilityMethods.hp(1),
    },
    buttonContainer:{
        width:'100%',
        paddingHorizontal:UtilityMethods.wp(5),
        paddingVertical:UtilityMethods.wp(3),
        position:'absolute',
        bottom:0,
    },
    saveButtonContainer:{
        position:'absolute',
        paddingVertical:UtilityMethods.wp(2),
        paddingLeft:UtilityMethods.wp(4),
        paddingRight:0,
        // backgroundColor:'red',
        right:UtilityMethods.wp(-2),
    },

})

export default styles