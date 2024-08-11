import { StyleSheet, Text, View } from 'react-native'
import { Icons } from '../../assets'
import { UtilityMethods } from '../../utility'

const NotificationsIcon = ({ notifications }) => {
  return (
    <View style={styles.container}>
      {notifications > 0 &&
        <Icons.redDot style={styles.dot} 
        width={UtilityMethods.wp(1.7)}
        height={UtilityMethods.wp(1.7)}
        />
      }
      <View style={styles.notificationShadow}>
        <Icons.Notifications 
          width={UtilityMethods.wp(8)}
          height={UtilityMethods.wp(8)}
        />
      </View>
    </View>
  )
}

export default NotificationsIcon

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    right: UtilityMethods.wp(2.1),
    top: UtilityMethods.wp(1),
    zIndex: 1
  },
  notificationShadow: {
  },
})