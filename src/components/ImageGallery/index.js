// import React, { useState } from 'react';
// import { View, FlatList, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { UtilityMethods, } from '../../utility'; // Adjust the import paths based on your project structure
// import FastImageComponent from '../FastImageComponent';
// import { Colors } from '../../assets';

// const images = [
//     { id: '1', uri: 'https://lh5.googleusercontent.com/proxy/sZ3GEJcP2idqKk2ZBYnsRYjrRcCL4ylKRNhG0VNwM90gae7UP-i50Ia5Sov_LUjJlTgrQ5adxPGLoJSYk865uJS6ysi9H4IpgoLgihJR1l1PT24ZtDRRgEK-dUD-yIhQLiSMBwVCLUXBH2av7DnFn3c' },
//     { id: '2', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqdnuzTLeqAxSQGC8QB7NgtP9QE_apqwzng&s' },
//     { id: '3', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7y7BNWSlfKNsbyFVYBVbc5W1YoT8995D2Tiu9Q-ZsYkW53TVrc5dRTK8axBIjFzhP9yQ&usqp=CAU' },
//     { id: '4', uri: 'https://i.pinimg.com/1200x/20/9f/15/209f1552e3dd2b93faa97cbda043ee8f.jpg' },
//     { id: '5', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
//   ];
// const ImageGallery = () => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);  
//   const renderImageItem = ({ item }) => (
//     <TouchableOpacity onPress={() => setSelectedImage(item)} style={[styles.thumbnailContainer,item.id === selectedImage?.id && styles.borderStyle]} >
//       <FastImageComponent source={{ uri: item.uri }} style={styles.thumbnail} />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={images}
//         renderItem={renderImageItem}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.horizontalList}
//       />
//       <View style={styles.selectedImageContainer}>
//         <Image source={{ uri: selectedImage?.uri }} style={styles.selectedImage} resizeMode='contain' />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: UtilityMethods.wp(2),
//   },
//   horizontalList: {
//     paddingVertical: UtilityMethods.hp(1),

//   },
//   thumbnailContainer:{
//     marginRight:UtilityMethods.wp(2),
//     borderRadius: UtilityMethods.wp(2),
//   },
//   thumbnail: {
//     width: UtilityMethods.wp(20),
//     height: UtilityMethods.hp(10),
//     borderRadius: UtilityMethods.wp(2),
//   },
//   selectedImageContainer: {
//     marginTop: UtilityMethods.hp(2),
//     width: '100%',
//     height: UtilityMethods.hp(50),
//     borderRadius: UtilityMethods.wp(3),
//     overflow: 'hidden',
//     height: Platform.OS ==='android' ? UtilityMethods.hp(60) :UtilityMethods.hp(55) ,
//   },
//   selectedImage: {
//     width: '100%',
//     height: '100%',
//     backgroundColor:'black',
//     borderRadius: UtilityMethods.wp(3),
//   },
//   borderStyle:{
//     borderColor:Colors.BLACK,
//     borderWidth:2
//   },
// });

// export default ImageGallery;




// -------------------


// import React, { useState, useRef } from 'react';
// import { View, FlatList, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
// import { UtilityMethods, } from '../../utility'; // Adjust the import paths based on your project structure
// import FastImageComponent from '../FastImageComponent';
// import { Colors } from '../../assets';

// const { width } = Dimensions.get('window');

// const images = [
//   { id: '1', uri: 'https://lh5.googleusercontent.com/proxy/sZ3GEJcP2idqKk2ZBYnsRYjrRcCL4ylKRNhG0VNwM90gae7UP-i50Ia5Sov_LUjJlTgrQ5adxPGLoJSYk865uJS6ysi9H4IpgoLgihJR1l1PT24ZtDRRgEK-dUD-yIhQLiSMBwVCLUXBH2av7DnFn3c' },
//   { id: '2', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
//   { id: '3', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqdnuzTLeqAxSQGC8QB7NgtP9QE_apqwzng&s' },
//   { id: '4', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
//   { id: '5', uri: 'https://i.pinimg.com/1200x/20/9f/15/209f1552e3dd2b93faa97cbda043ee8f.jpg' },
//   { id: '6', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7y7BNWSlfKNsbyFVYBVbc5W1YoT8995D2Tiu9Q-ZsYkW53TVrc5dRTK8axBIjFzhP9yQ&usqp=CAU' },
//   { id: '7', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
  
// ];

// const ImageGallery = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const thumbnailListRef = useRef(null); 
//   const fullImageListRef = useRef(null); 

//   const onThumbnailPress = (index) => {
//     setSelectedIndex(index);
//     fullImageListRef.current?.scrollToIndex({ index, animated: true });
//   };

//   const onFullImageScroll = (event) => {
//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(contentOffsetX / width);
//     setSelectedIndex(index);
//     thumbnailListRef.current?.scrollToIndex({ index, animated: true });
//   };

//   const renderThumbnailItem = ({ item, index }) => (
//     <TouchableOpacity onPress={() => onThumbnailPress(index)} style={[styles.thumbnailContainer, index === selectedIndex && styles.borderStyle]}>
//       <FastImageComponent source={{ uri: item.uri }} style={styles.thumbnail} />
//     </TouchableOpacity>
//   );

//   const renderFullImageItem = ({ item }) => (
//     <View style={styles.selectedImageContainer}>
//       <Image source={{ uri: item.uri }} style={styles.selectedImage} resizeMode='contain' />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Thumbnail FlatList */}
//       <FlatList
//         data={images}
//         renderItem={renderThumbnailItem}
//         keyExtractor={(item) => item.id}
//         horizontal
//         ref={thumbnailListRef}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.horizontalList}
//         getItemLayout={(data, index) => (
//           { length: UtilityMethods.wp(20), offset: UtilityMethods.wp(20) * index , index }
//         )}
//       />

//       {/* Full Image FlatList */}
//       <FlatList
//         data={images}
//         renderItem={renderFullImageItem}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         ref={fullImageListRef}
//         onMomentumScrollEnd={onFullImageScroll}
//         contentContainerStyle={styles.fullImageList}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: UtilityMethods.wp(2),
//   },
//   horizontalList: {
//     paddingVertical: UtilityMethods.hp(1),
//   },
//   thumbnailContainer: {
//     marginRight: UtilityMethods.wp(2),
//     borderRadius: UtilityMethods.wp(2),
//   },
//   thumbnail: {
//     width: UtilityMethods.wp(20),
//     height: UtilityMethods.hp(10),
//     borderRadius: UtilityMethods.wp(2),
//   },
//   selectedImageContainer: {
//     width,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   selectedImage: {
//     width: '100%',
//     height: Platform.OS === 'android' ? UtilityMethods.hp(60) : UtilityMethods.hp(55),
//     borderRadius: UtilityMethods.wp(3),
//   },
//   fullImageList: {
//     marginTop: UtilityMethods.hp(2),
//   },
//   borderStyle: {
//     borderColor: Colors.BLACK,
//     borderWidth: 2,
//   },
// });

// export default ImageGallery;







import React, { useState, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { UtilityMethods } from '../../utility'; // Adjust the import paths based on your project structure
import FastImageComponent from '../FastImageComponent';
import { Colors } from '../../assets';

const { width } = Dimensions.get('window');

const images = [
  { id: '1', uri: 'https://lh5.googleusercontent.com/proxy/sZ3GEJcP2idqKk2ZBYnsRYjrRcCL4ylKRNhG0VNwM90gae7UP-i50Ia5Sov_LUjJlTgrQ5adxPGLoJSYk865uJS6ysi9H4IpgoLgihJR1l1PT24ZtDRRgEK-dUD-yIhQLiSMBwVCLUXBH2av7DnFn3c' },
  { id: '2', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqdnuzTLeqAxSQGC8QB7NgtP9QE_apqwzng&s' },
  { id: '3', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7y7BNWSlfKNsbyFVYBVbc5W1YoT8995D2Tiu9Q-ZsYkW53TVrc5dRTK8axBIjFzhP9yQ&usqp=CAU' },
  { id: '4', uri: 'https://i.pinimg.com/1200x/20/9f/15/209f1552e3dd2b93faa97cbda043ee8f.jpg' },
  { id: '5', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
  { id: '6', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
  { id: '7', uri: 'https://i.pinimg.com/236x/b8/a2/7b/b8a27b55d46c4ee4d882c641e4c7dd74.jpg' },
];

const ImageGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailListRef = useRef(null); 
  const fullImageListRef = useRef(null); 

  const onThumbnailPress = (index) => {
    setSelectedIndex(index);
    fullImageListRef.current?.scrollToIndex({ index, animated: true });
    scrollToCenter(index); 
  };

  const onFullImageScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / UtilityMethods.wp(96));
    setSelectedIndex(index);
    thumbnailListRef.current?.scrollToIndex({ index, animated: true });
  };

  const scrollToCenter = (index) => {
    const offset = index * UtilityMethods.wp(30) -  UtilityMethods.wp(96) / 2 ;
    thumbnailListRef.current?.scrollToOffset({ offset, animated: true });
  };

  const renderThumbnailItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => onThumbnailPress(index)}
      style={[styles.thumbnailContainer, index === selectedIndex && styles.borderStyle]}
    >
      <FastImageComponent source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const renderFullImageItem = ({ item }) => (
    <View style={styles.selectedImageContainer}>
      <Image source={{ uri: item.uri }} style={styles.selectedImage} resizeMode="contain" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thumbnail FlatList */}
      <FlatList
        data={images}
        renderItem={renderThumbnailItem}
        keyExtractor={(item) => item.id}
        horizontal
        ref={thumbnailListRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        getItemLayout={(data, index) => ({ length: UtilityMethods.wp(22), offset: UtilityMethods.wp(22) * index, index })}
      />

      {/* Full Image FlatList */}
      <FlatList
        data={images}
        renderItem={renderFullImageItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        ref={fullImageListRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onFullImageScroll}
        getItemLayout={(data, index) => ({ length: UtilityMethods.wp(96), offset: UtilityMethods.wp(96) * index, index })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: UtilityMethods.wp(2),
  },
  horizontalList: {
    paddingVertical: UtilityMethods.hp(1),
  },
  thumbnailContainer: {
    marginRight: UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(2),
  },
  thumbnail: {
    width: UtilityMethods.wp(20),
    height: UtilityMethods.hp(10),
    borderRadius: UtilityMethods.wp(2),
  },
  selectedImageContainer: {
    marginTop: UtilityMethods.hp(2),
    width: UtilityMethods.wp(96),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius:UtilityMethods.wp(4)
  },
  selectedImage: {
    width: '100%',
    height: Platform.OS === 'android' ? UtilityMethods.hp(60) : UtilityMethods.hp(55),
    borderRadius: UtilityMethods.wp(3),
  },
  fullImageList: {
    marginTop: UtilityMethods.hp(2),
  },
  borderStyle: {
    borderColor: Colors.BLACK,
    borderWidth: 2,
  },
});

export default ImageGallery;
