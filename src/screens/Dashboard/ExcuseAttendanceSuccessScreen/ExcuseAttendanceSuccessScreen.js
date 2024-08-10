import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, MainLayout } from '../../../components';
import { Colors, Fonts, Images } from '../../../assets';
import { FontSize, UtilityMethods } from '../../../utility';
import { Header } from '../../../components';
import Routes from '../../../navigation/Routes';

const ExcuseAttendanceSuccessScreen = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOkayPress = () => {
    navigation.navigate(Routes.HOME); 
  };

  return (
    <MainLayout>
      <Header title="Excused Absence" onBackPress={handleOkayPress} />
      <View style={styles.container}>
        <Image source={Images.CHECK_MARK} style={styles.icon} />
        <Text style={styles.message}>
          An Excused Absence Request has been sent to your instructor. You’ll be notified as soon as they respond!
        </Text>
        <Button
          text={"Okay"}
          onPress={handleOkayPress}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: UtilityMethods.wp(4),
  },
  icon: {
    width: UtilityMethods.wp(60),
    height: UtilityMethods.wp(60),
    marginBottom: UtilityMethods.hp(3),
  },
  message: {
    fontSize: FontSize.VALUE(18),
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    marginBottom: UtilityMethods.hp(4),
    color: Colors.BLACK,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: UtilityMethods.hp(1.5),
    paddingHorizontal: UtilityMethods.wp(10),
    borderRadius: UtilityMethods.wp(2),
  },
  buttonText: {
    fontSize: FontSize.VALUE(16),
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
});

export default ExcuseAttendanceSuccessScreen;
