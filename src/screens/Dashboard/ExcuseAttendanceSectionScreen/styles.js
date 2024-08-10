import { StyleSheet } from "react-native"
import { Colors } from "../../../assets"
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility"


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
        marginTop: UtilityMethods.hp(1),

    },
    searchInput: {
        borderRadius: UtilityMethods.wp(2),
        borderColor: Colors.LIGHT_GRAY,
        marginTop: UtilityMethods.hp(2),
        marginHorizontal: UtilityMethods.wp(4)
    },
})
export default styles