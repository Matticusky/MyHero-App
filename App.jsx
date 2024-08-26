

//================================ React Native Imported Files ======================================//
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import React, { createContext, useState } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persister } from './src/redux/Store';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
//================================ Local Imported Files ======================================//

import RootStack from './src/navigation/RootStack';
import { Colors } from './src/assets';
import { AudioRecorderPlayerComponent } from './src/components'


export const navigationRef = createNavigationContainerRef();

export const AUDIO_CONTEXT = createContext()

const App = () => {

  const [audioFiles, setAudioFiles] = useState([])

  return (
    // <ToastProvider
    //   offsetTop={40}
    //   successColor={Colors.parotGreen}>
    //   <Provider store={store}>
    //     <PersistGate persistor={persister}>
    //       <NavigationContainer ref={navigationRef}>
    //        <GestureHandlerRootView>
    //         <PaperProvider>
    //           <AUDIO_CONTEXT.Provider  value={{audioFiles, setAudioFiles}} >
    //           <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    //           <RootStack />
    //           </AUDIO_CONTEXT.Provider>
    //        </PaperProvider>

    //         </GestureHandlerRootView>
    //       </NavigationContainer>
    //     </PersistGate>

    //   </Provider>
    // </ToastProvider>

     <AudioRecorderPlayerComponent/> 

  );
};

export default App;
