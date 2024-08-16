import { StyleSheet, } from 'react-native'
import { UtilityMethods } from '../../../utility';
import { Colors } from '../../../assets';


const styles = StyleSheet.create({
    contentContainerStyle:{
        paddingHorizontal:UtilityMethods.wp(5),
        paddingTop:UtilityMethods.wp(3),
        paddingBottom:UtilityMethods.hp(10),
    },
    buttonContainer:{
        width:'100%',
        paddingHorizontal:UtilityMethods.wp(5),
        paddingVertical:UtilityMethods.wp(3),
        position:'absolute',
        bottom:0,
    }
});
export default styles 