// NotificationsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Button, Header, MainLayout, NotificationCard, ScreenWrapper } from '../../components';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';
import { notificationData, notifications } from '../../Data/DummyData';
import Routes from '../../navigation/Routes';


const NotificationsScreen = ({ navigation, route }) => {

  const isFamilyMember = route?.params?.isFamilyMember

  const RenderRightContent = () => {
    return (
      <Button
        text={"Add"}
        style={styles.changePassowrd}
        textStyle={styles.changePassowrdText}
        onPress={() => { navigation.navigate(Routes.AddMembersScreen) }}
      />
    )
  }



  return (
    <MainLayout>
      <Header title={isFamilyMember ? "Family members" : "Notificaitons" }
        showBackButton={true}
        DrawerHeader={false}
        rightIcons={false}
        rightcontent={isFamilyMember && <RenderRightContent />}
      />

      <FlatList
        data={notificationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />

    </MainLayout>
  );
};

const styles = StyleSheet.create({
  
  listContainer: {
    paddingVertical: UtilityMethods.hp(2),
    paddingHorizontal: UtilityMethods.wp(4),
  },
  changePassowrd: {
    width: UtilityMethods.wp(24),
    height: UtilityMethods.hp(4),
  },
  changePassowrdText: {
    fontSize: FontSize.VALUE(12)
  }
});

export default NotificationsScreen;
