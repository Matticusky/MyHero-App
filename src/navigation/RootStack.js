//================================ React Native Imported Files ======================================//

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
/// ====================================== Local Imported Files ======================================//
import Routes from "./Routes";
import { AuthStack, DashboardStack } from "./Stacks";
import { useSelector } from "react-redux";
import { Splash, } from "../screens";


const Stack = createNativeStackNavigator();

const RootStack = () => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  const [initialLoading, setInitialLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(Routes.SPLASH);

  useEffect(() => {
    // This will run only once on component mount
    const timer = setTimeout(() => {
      setInitialLoading(false); // End the initial loading state after 30 seconds
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // This will run on initial mount and whenever `user` or `initialLoading` changes
    if (!initialLoading) {
      setInitialRoute((token) ? Routes.DASHBOARD_STACK : Routes.AUTH_STACK);
    }
  }, [token,initialLoading]); // Depend on `user` and `initialLoading`


 
  

  return (
    <Stack.Navigator screenOptions={{ headerShown: false,
      animation:"none"
     }}>
      {initialRoute === Routes.SPLASH && <Stack.Screen name={Routes.SPLASH} component={Splash} />}
      {initialRoute === Routes.AUTH_STACK && <Stack.Screen name={Routes.AUTH_STACK} component={AuthStack} />}
      {initialRoute === Routes.DASHBOARD_STACK && <Stack.Screen name={Routes.DASHBOARD_STACK} component={DashboardStack} />}
    </Stack.Navigator>
  );
};

export default RootStack;
