// NotificationCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';

const NotificationCard = ({ notification }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icons.NotificationIcon width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: UtilityMethods.hp(1.5),
    paddingHorizontal: UtilityMethods.hp(2),
    marginVertical: UtilityMethods.hp(1),
    backgroundColor: Colors.ReadNotification,
    borderRadius: UtilityMethods.wp(2),
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  iconContainer: {
    marginRight: UtilityMethods.wp(2),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.VALUE(16),
    color: Colors.GRAY,
    fontFamily: Fonts.BOLD,
    marginBottom:UtilityMethods.hp(0.2)
  },
  message: {
    fontSize: FontSize.VALUE(12),
    color: Colors.GRAY,
    fontFamily: Fonts.REGULAR,
  },
});

export default NotificationCard;
