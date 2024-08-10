import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, StatusBar, StyleSheet } from "react-native";
import Routes from "../Routes";
import BottomTab from "./BottomTab";
import { Colors } from "../../assets";
import SliderScreen from "../../screens/Dashboard/SliderScreen.js/SliderScreen";
import { UtilityMethods } from "../../utility";
import { MainLayout } from "../../components";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
  
<Drawer.Navigator
    drawerContent={(props) => <SliderScreen {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerInactiveBackgroundColor: "transparent",
       
        drawerHideStatusBarOnOpen: Platform.OS === "ios" ? true : false,
       
       
        drawerStyle: styles.drawerStyle,
        sceneContainerStyle: styles.sceneStyle,
        gestureEnabled: true,
        drawerType: "front",
        drawerPosition: "left",
      }}
    >
      <Drawer.Screen name={Routes.BOTTOM_TAB} component={BottomTab} />
      

    </Drawer.Navigator>
   
    
  );
};

export default DrawerNavigator;
const styles = StyleSheet.create({
  drawerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    width: "80%",
    borderTopEndRadius:UtilityMethods.wp(6),
    borderBottomEndRadius:UtilityMethods.wp(6),
    marginTop:Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
   
   

  },
  sceneStyle: {
    backgroundColor: Colors.WHITE,
  },
});
