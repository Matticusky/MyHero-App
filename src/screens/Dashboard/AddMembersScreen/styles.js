import { Platform, StyleSheet} from 'react-native'
import { CommonStyles, UtilityMethods } from '../../../utility'


const styles = StyleSheet.create({
    cont: {
        flex:1,
        ...CommonStyles.PADDING_HORIZONTAL,
     },
    inPutCont:{
        marginTop:UtilityMethods.hp(2),
        rowGap:UtilityMethods.hp(2)
      },
      button:{ 
        marginHorizontal: UtilityMethods.wp(4), 
        width:UtilityMethods.wp(92), 
        marginBottom:Platform.OS === 'android' ?  UtilityMethods.wp(2) : null
    }
})
export default styles