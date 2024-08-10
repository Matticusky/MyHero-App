import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, History } from '../../screens';
import Routes from '../Routes';
import { Colors, Fonts, Icons } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const BottomTab = () => {
    const Tab = createBottomTabNavigator();

    const tabBarIconandText = ({focused, icon, text}) => {
        return (
            <View style={styles.textCont}>
                 {icon}
                <Text style={
                    styles.textStyle(focused)
                }>{text}</Text>
            </View>
        )
    }

  return (
    
        <Tab.Navigator
          initialRouteName={Routes.HOME}
          screenOptions={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: [styles.tabBarStyle],
          }}
           >
            <Tab.Screen name={Routes.HISTORY} component={History} 
              options={{
                tabBarIcon: ({focused}) => (
                  tabBarIconandText({focused, icon:focused?<Icons.ClockCounterFilled
                    width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)}
                    />:<Icons.ClockCounterUnfilled
                    width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)}
                    />, text: "History"})
                )
              }}
            
            />
            <Tab.Screen name={Routes.HOME} component={Home} 
              options={{
                tabBarIcon: ({focused}) => (
                  tabBarIconandText({focused, icon:focused?<Icons.HouseFilled
                  width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)}
                  />:<Icons.HouseUnfilled
                  width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)}
                  />, text: "Home"})
                )
              
              }}
            
            />
            <Tab.Screen name={Routes.PROFILE} component={Profile} 
              options={{
                tabBarIcon: ({focused}) => (
                  tabBarIconandText({focused, icon:focused?<Icons.UserFilled
                    width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)}
                    />:<Icons.UserUnfilled
                    width={UtilityMethods.wp(8)} height={UtilityMethods.wp(8)}
                    />, text: "Account"})
                )
              }}

            
            />
            
        </Tab.Navigator>
    
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopLeftRadius: UtilityMethods.wp(5),
    borderTopRightRadius: UtilityMethods.wp(5),
    height:UtilityMethods.hp(8),
    backgroundColor: Colors.WHITE,
    shadowColor: Platform.OS == "ios" ? Colors.TransParentBackground : Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderTopWidth:0
  },
  textCont:{
    alignItems: 'center',
    // height:UtilityMethods.hp(4),
   
    justifyContent: 'space-between',
    marginTop: Platform.OS == "ios" ? UtilityMethods.hp(2) : 0,
  
  },

  textStyle:(focused) => ({
    color: focused ? Colors.ICON_BLACK : Colors.TABBARARINCTIVECOLOR,
    fontSize: FontSize.VALUE(12),
    fontFamily: Fonts.REGULAR,
  })

  
  
  
})
