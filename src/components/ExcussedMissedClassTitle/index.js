import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize, CommonStyles } from '../../utility';

const ExcussedMissedClassTitle = ({title,  onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.iconContainer}>
        <Icons.RightArrow />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: UtilityMethods.wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.BOX_HEADER,
    paddingHorizontal: UtilityMethods.wp(4),
    paddingVertical: UtilityMethods.hp(1.2),
    borderRadius: UtilityMethods.wp(2),
    alignSelf: 'center',
    ...CommonStyles.shadow,
  },
  text: {
    fontSize: FontSize.VALUE(16),
    color: Colors.ICON_BLACK,
    fontFamily: Fonts.SEMI_BOLD,
  },
  iconContainer: {
  
  },
});

export default ExcussedMissedClassTitle;
