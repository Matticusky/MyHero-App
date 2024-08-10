import React from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterailIcon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../assets';
import { UtilityMethods } from '../../utility';
import styles from './styles';




const CustomDropDown = ({
  type,
  LeftIcon,
  RightIcon,
  RightIconType = 'svg',
  style,
  keyboardType,
  onPress,
  InputContStyle,
  isInValidField = false,
  setIsInValidField,
  Error,
  setError,
  FirstScreen = true,
  maxLength,
  inputWithBorder = false,
  iconSource,
  TextArea = false,
  iconStyle,
  inputContStyle,
  onFocus,
  optional,
  countryCode,
  onChangeCountryCode,
  inputStyle,
  titleStyle,
  ...props
}) => {




  return (
    <View style={[styles.mainCont, style]}>
      {props?.title && (
        <Text style={[styles.TitleStyle, titleStyle]}>{props?.title}</Text>
      )}
      <View
        style={{
          height: props?.title ? UtilityMethods.hp(1) : null,
        }}
      />
      <View style={[styles.container(isInValidField), InputContStyle]}>
        {LeftIcon && (
          <>
            <LeftIcon width={UtilityMethods.hp(15)} height={UtilityMethods.hp(15)} />
            <View style={{ width: 10 }} />
          </>
        )}

        <Dropdown
          placeholder={props?.placeholder}
          data={props?.data ? props?.data : []}
          maxHeight={300}
          value={props?.value}
          onChange={props?.onChangeText}
          style={[styles.input, inputStyle,]}
          inputStyle={{ color: Colors.BLACK }}
          placeholderStyle={{ color: Colors.DARK_GRAY }}
          // containerStyle={{ width: '100%' }}
          // dropdownStyle={{ width: '100%' }}
          // dropDownContainerStyle={{ width: '100%' }}
          labelField={"label"}
          valueField={"value"}
          renderRightIcon={() => (
            <MaterailIcon
              name="down"
              size={20}
              color={Colors.BLACK}
            />
          )
          }
        />




      </View>

      {Error?.length > 0 ? <Text style={styles.ErrorText}>{Error}</Text> : null}
    </View>
  );
};



export default CustomDropDown;
