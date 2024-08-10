import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';

const ShowDropdown = ({
  data,
  value,
  setValue,
  label,
  placeTxt = "",
  style,
  labelField = "label",
  valueField = "value",
  selectedTextStyle = {},
  containerStyle,
  maxHeight = 100,
  search = false,
  renderLeftIcon,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[styles.dropdown, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle, ]}
        iconStyle={styles.iconStyle}
        renderLeftIcon={renderLeftIcon}
        containerStyle={containerStyle}
        data={data}
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        search={search}
        placeholder={placeTxt}
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        itemTextStyle={[styles.selectedTextStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: UtilityMethods.hp(6),
    borderColor: Colors.ICON_BLACK,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: UtilityMethods.wp(4),
    backgroundColor: Colors.WHITE,
    // marginHorizontal: UtilityMethods.wp(3),

  },
  placeholderStyle: {
    fontSize: FontSize.VALUE(16),
    color: Colors.LIGHT_COLOR,
    fontFamily: Fonts.REGULAR,
  },
  label: {
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
    marginBottom:UtilityMethods.hp(0.5),
    marginLeft:UtilityMethods.wp(1)
  },
  selectedTextStyle: {
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  iconStyle: {
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
    tintColor: Colors.BLACK,
  },
});

export default ShowDropdown;
