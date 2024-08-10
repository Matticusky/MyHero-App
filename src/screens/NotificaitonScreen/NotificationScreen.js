// NotificationsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Button, MainLayout, NotificationCard, ScreenWrapper } from '../../components';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';
import { notifications } from '../../Data/DummyData';


const NotificationsScreen = ({ navigation }) => {
  return (
    <MainLayout>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          contentContainerStyle={styles.flatListContent}
        />

        <Button
          text={"Back to Home"}
          LeftIcon={<Icons.ArrowBack />}
          style={styles.button}
          textStyle={styles.textStyle}
          onPress={() => navigation.goBack()}
        />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: UtilityMethods.hp(2),
    backgroundColor: Colors.WHITE,
  },
  headerTitle: {
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  markAllRead: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  flatListContent: {
    paddingHorizontal: UtilityMethods.wp(4),
  },
  button: {
    marginTop: UtilityMethods.hp(2),
    paddingHorizontal:UtilityMethods.wp(4),
    backgroundColor:Colors.WHITE,
    alignSelf:'center',
    borderColor:Colors.BLACK,
    borderWidth:1,
    width:'86%',
    marginBottom: Platform.OS === 'android' ?  UtilityMethods.hp(2) : null,
  },
  textStyle:{
    color:Colors.BLACK
  }
});

export default NotificationsScreen;
