// NotificationCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';
import FastImageComponent from '../FastImageComponent';

// const NotificationCard = ({ notification }) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.iconContainer}>
//         <Icons.NotificationIcon width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{notification.title}</Text>
//         <Text style={styles.message}>{notification.message}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     padding: UtilityMethods.hp(1.5),
//     paddingHorizontal: UtilityMethods.hp(2),
//     marginVertical: UtilityMethods.hp(1),
//     backgroundColor: Colors.ReadNotification,
//     borderRadius: UtilityMethods.wp(2),
//     alignItems: 'center',
//     shadowColor: Colors.BLACK,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//     elevation: 3,
//   },
//   iconContainer: {
//     marginRight: UtilityMethods.wp(2),
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: FontSize.VALUE(16),
//     color: Colors.GRAY,
//     fontFamily: Fonts.BOLD,
//     marginBottom:UtilityMethods.hp(0.2)
//   },
//   message: {
//     fontSize: FontSize.VALUE(12),
//     color: Colors.GRAY,
//     fontFamily: Fonts.REGULAR,
//   },
// });



const NotificationCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <FastImageComponent source={{uri: item.avatar}} style={styles.avatar}/>
      <View style={styles.content}>
        <Text style={styles.nameText}>{item.name} </Text>
        <Text style={styles.requestText}>Send you a connection request</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: UtilityMethods.wp(4),
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(2),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    marginBottom: UtilityMethods.hp(2),
    alignItems: 'flex-start',
  },
  avatar: {
    width: UtilityMethods.wp(12),
    height: UtilityMethods.wp(12),
    borderRadius: UtilityMethods.wp(6),
    marginRight: UtilityMethods.wp(4),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(16),
    lineHeight: FontSize.VALUE(18),
    color: Colors.BLACK,
  },
  requestText: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    lineHeight: FontSize.VALUE(18),
    color: Colors.TEXT_GRAY,
    marginBottom: UtilityMethods.hp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: UtilityMethods.wp(2),
    paddingVertical: UtilityMethods.hp(0.5),
    paddingHorizontal: UtilityMethods.wp(4),
    marginRight: UtilityMethods.wp(2),
  },
  rejectButtonText: {
    color: Colors.RED,
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(14),
  },
  acceptButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: UtilityMethods.wp(2),
    paddingVertical: UtilityMethods.hp(0.5),
    paddingHorizontal: UtilityMethods.wp(4),
  },
  acceptButtonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(14),
  },
});


export default NotificationCard;
