

//================================ React Native Imported Files ======================================//
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persister } from './src/redux/Store';
import { StatusBar } from 'react-native';

//================================ Local Imported Files ======================================//

import RootStack from './src/navigation/RootStack';
import { Colors } from './src/assets';
import { AudioRecorderPlayerComponent } from './src/components'


export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <ToastProvider
      offsetTop={40}
      successColor={Colors.parotGreen}>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <NavigationContainer ref={navigationRef}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar backgroundColor="#fff" barStyle="dark-content" />
              <RootStack />

            </GestureHandlerRootView>
          </NavigationContainer>
        </PersistGate>

      </Provider>
    </ToastProvider>

    //  <AudioRecorderPlayerComponent/> 

  );
};

export default App;
