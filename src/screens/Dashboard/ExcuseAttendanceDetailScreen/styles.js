import { Platform, StyleSheet } from 'react-native'
import { UtilityMethods } from '../../../utility'


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      buttonContainer:{
        width:UtilityMethods.wp(90),
        alignSelf:'center',
        marginTop:'auto',
        marginBottom: Platform.OS === 'android' ? UtilityMethods.hp(2) : null
      },
})
export default styles