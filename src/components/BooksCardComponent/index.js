import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { UtilityMethods, FontSize } from '../../utility';
import { Colors, Fonts, Icons } from '../../assets';

const BooksCardComponent = ({ imageSource, title, style, onPress, isAddButton }) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, style]} onPress={onPress}>
      {isAddButton ?
        <>
          <View style={styles.addButton}>
            {/* <Text style={styles.plus}>+</Text> */}
            <Icons.Add  width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
            <Text style={styles.addText}>Add new book</Text>
          </View>
        </>
        :
        <>
          <Image source={imageSource} style={styles.image} />
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: UtilityMethods.wp(30),  // Adjust size as needed
    marginTop: UtilityMethods.hp(2),
    marginRight: UtilityMethods.wp(1),
    backgroundColor:Colors.WHITE,
  },
  addButton:{
    backgroundColor:Colors.WHITE,
    width: UtilityMethods.wp(29),  
    height: UtilityMethods.wp(40),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    // elevation: 2,
    borderColor:Colors.LIGHT_GRAY,
    borderWidth:0.5,
    borderRadius:UtilityMethods.wp(2),
    justifyContent:'center',
    alignItems:'center'
  },
  plus:{
    fontSize:FontSize.VALUE(50),
    fontFamily:Fonts.REGULAR,
    color:Colors.BLACK,
  },
  addText:{
    fontSize:FontSize.VALUE(12),
    fontFamily:Fonts.MEDIUM,
    color:Colors.BLACK,
    marginTop:UtilityMethods.hp(2)
  },
  image: {
    width: UtilityMethods.wp(29),  // Adjust size as needed
    height: UtilityMethods.wp(30),  // Making it square
    borderRadius: UtilityMethods.wp(2),
    resizeMode: 'cover',
  },
  title: {
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    marginTop: UtilityMethods.hp(1),
    width: '100%',
  },
});

export default BooksCardComponent;
