// import FastImage from 'react-native-fast-image';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CACHE_CLEAR_INTERVAL } from '../../Data/DummyData';
// import { StyleSheet } from 'react-native';
// export const clearCacheFastImage = async () => {
//     try {
//       const lastCacheClear = await AsyncStorage.getItem('@lastCacheClear');
//       const currentTime = Date.now();

//       if (!lastCacheClear || currentTime - parseInt(lastCacheClear, 10) > CACHE_CLEAR_INTERVAL) {
//         // Clear the cache
//         await FastImage.clearDiskCache();
//         await FastImage.clearMemoryCache();

//         // Update the last cache clear time
//         await AsyncStorage.setItem('@lastCacheClear', currentTime.toString());
//       }
//     } catch (error) {
//       console.error('Error clearing cache:', error);
//     }
//   };

// const FastImageComponent = ({ source = {
//     uri: 'https://unsplash.it/400/400?image=1',
// }, style, resizeMode,onError }) => {

//     return (
//         <FastImage
//             style={{...styles.img, ...style}}
//             source={source}
//             resizeMode={resizeMode}
//             onError={onError}
//         />
//     );
// };

// export default FastImageComponent
// const styles = StyleSheet.create({

// });



import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CACHE_CLEAR_INTERVAL } from '../../Data/DummyData';
import { Colors } from '../../assets';

export const clearCacheFastImage = async () => {
  try {
    const lastCacheClear = await AsyncStorage.getItem('@lastCacheClear');
    const currentTime = Date.now();

    if (!lastCacheClear || currentTime - parseInt(lastCacheClear, 10) > CACHE_CLEAR_INTERVAL) {
      // Clear the cache
      await FastImage.clearDiskCache();
      await FastImage.clearMemoryCache();

      // Update the last cache clear time
      await AsyncStorage.setItem('@lastCacheClear', currentTime.toString());
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

const FastImageComponent = ({ source = { uri: 'https://unsplash.it/400/400?image=1' }, style, resizeMode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCacheFastImage();
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <ActivityIndicator style={styles.activityIndicator} size="large" color={Colors.WHITE} />
      )}
      <FastImage
        style={[styles.img,style]}
        source={source}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
    </View>
  );
};

export default FastImageComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  activityIndicator: {
    position: 'absolute',
  },
});
