import { StyleSheet, } from 'react-native'
import { FontSize, UtilityMethods } from '../../../utility';
import { Colors } from '../../../assets';


const styles = StyleSheet.create({
    changePassowrd: {
        width:UtilityMethods.wp(24),
        height:UtilityMethods.hp(4),
    },
    changePassowrdText: {
        fontSize:FontSize.VALUE(12)
    }
});
export default styles 