import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { UtilityMethods, FontSize } from '../../utility';
import { Colors, Fonts } from '../../assets';

const BooksListComponent = ({ imageSource, title, time, onPress }) => {
  return (
    <Pressable style={styles.listContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: UtilityMethods.wp(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.MEDIUM_GRAY,
  },
  image: {
    width: UtilityMethods.wp(15),
    height: UtilityMethods.wp(15),
    borderRadius: UtilityMethods.wp(2),
    resizeMode: 'cover',
    marginRight: UtilityMethods.wp(3),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
  },
  time: {
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
    fontFamily: Fonts.REGULAR,
    marginTop: UtilityMethods.hp(0.1),
  },
});

export default BooksListComponent;
