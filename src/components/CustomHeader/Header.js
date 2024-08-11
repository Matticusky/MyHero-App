import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CommonStyles, FontSize, UtilityMethods } from '../../utility';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Icons, Images } from '../../assets';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Routes from '../../navigation/Routes';
import NotificationsIcon from '../NotificationIcon';

const Header = ({
  title,
  logoImage,
  showBackButton = true,
  onPressLeft,
  leftIcon,
  rightcontent,
  isLogout = false,
  logoutOnPress,
  rightIcons = true
}) => {
  const navigation = useNavigation();

  const onPressNotificaiton = () => {
    // navigation.navigate(Routes.NOTIFICATION_SCREEN)
  }

  return (
    <View style={styles.headerCont}>
      <View style={CommonStyles.ROW_VIEW}>

        {leftIcon &&
          <TouchableOpacity
            style={styles.icon}
            onPress={onPressLeft}
          >
            {leftIcon}
          </TouchableOpacity>
        }
        {showBackButton &&
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={25} color={
              Colors.ICON_BLACK
            } />

          </TouchableOpacity>
        }

        {title && 
          <Text style={styles.headerText}>
          {title}
        </Text>}
        {
          logoImage && 
          <Image source={Images.LOGO_HEADER} style={styles.logoImage} resizeMode='contain' />
        }
      </View>

      {rightcontent &&
        <View>
          {rightcontent}
        </View>
      }

      <View style={styles.rightIcons}>
        {rightIcons &&
          <>
            <TouchableOpacity onPress={onPressNotificaiton}>
              <NotificationsIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressNotificaiton}>
              <Icons.settings
                width={UtilityMethods.wp(6)}
                height={UtilityMethods.wp(6)}
              />
            </TouchableOpacity>
          </>
        }



        {isLogout &&
          <TouchableOpacity onPress={logoutOnPress}>
            <Icons.logoutIcon2 />
          </TouchableOpacity>}
      </View>

    </View>
  );
}

export default Header;

const styles = StyleSheet.create({

  headerCont: {
    width: "100%",
    // height: UtilityMethods.hp(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...CommonStyles.PADDING_HORIZONTAL,
  },
  icon: {
    width: UtilityMethods.wp(12),
  },
  headerText: {
    color: Colors.ICON_BLACK,
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.SEMI_BOLD,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: 'center',
    columnGap: UtilityMethods.wp(4)
  },
  logoImage:{
    width: UtilityMethods.wp(32),
    height: UtilityMethods.wp(9),
  }

});
