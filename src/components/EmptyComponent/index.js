import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Images } from '../../assets'; 
import { FontSize, UtilityMethods } from '../../utility'; 

const EmptyComponent = ({title,desc}) => {
  return (
    <View style={styles.container}>
      <Image source={Images.EMPTY_IMAGE} style={styles.image} /> 
      {title && <Text style={styles.title}>{title}</Text>}
      {desc &&
        <Text style={styles.description}>{desc}</Text>
      }
    </View>
  )
}

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: UtilityMethods.wp(24),
    alignItems: 'center',
    padding: UtilityMethods.wp(6),
  },
  image: {
    width: UtilityMethods.wp(40), 
    height: UtilityMethods.hp(20), 
    resizeMode: 'contain',
    marginBottom: UtilityMethods.hp(1),

  },
  title: {
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(1),
  },
  description: {
    fontSize: FontSize.VALUE(14),
    lineHeight:FontSize.VALUE(20),
    fontFamily: Fonts.BOLD,
    color: Colors.LIGHT_GRAY,
    textAlign: 'center',
  },
});
