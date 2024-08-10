import { useNavigation } from '@react-navigation/native';
import React, { forwardRef, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Icons, Images } from '../../assets';
import { UtilityMethods } from '../../utility';
import styles from './styles';
import MaskInput from 'react-native-mask-input';

const InputText = forwardRef(({
  fieldInfo,
  onChange,
  InputContStyle,
  titleStyle,
  inputStyle,
  isPhoneNumber,
  style,
  onSubmitEditing,
  ...props
},ref) => {
  const [showPassword, setShowPassword] = useState(true);
 
  const navigation = useNavigation();
  const [show, setShow] = useState(false);


  // const USPhoneNumberMask = ['+','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  const USPhoneNumberMask = ['+','1',' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  return (
    <View style={[styles.mainCont, style]}>
      {fieldInfo?.title && (
        <View style={styles.titleCont}>
          <Text style={[styles.TitleStyle, titleStyle]}>{fieldInfo?.title}</Text>
          <Text style={[styles.hashText, titleStyle]}>*</Text>
        </View>

      )}
      <View
        style={{
          height: fieldInfo?.title ? UtilityMethods.hp(1) : null,
        }}
      />
      <View style={[styles.container(
        fieldInfo?.error?.length > 0 ? true : false
      ), InputContStyle]}>
        {/* Left Icon */}
        {(fieldInfo?.leftIcon || fieldInfo?.type == "email" || fieldInfo?.type == "password") ? (
          <View style={styles.leftIconCont}>
            {fieldInfo?.leftIcon && (
              <>

                {fieldInfo?.leftIcon}
              </>
            )}

            {fieldInfo?.type === "email" && (
              <Icons.Email />

            )}

            {fieldInfo?.type === "password" && (
              <Icons.Password />
            )}
          </View>
        ) : null}


        <View style={{ flex: 1, }}>

          {!isPhoneNumber ?
            < TextInput
              ref={ref}
              placeholder={fieldInfo?.placeholder}
              onFocus={fieldInfo?.onFocus}
              value={fieldInfo?.value}
              onChangeText={onChange}
              style={[styles.input, inputStyle]}
              secureTextEntry={fieldInfo?.type === "password" && showPassword}
              keyboardType={fieldInfo?.type === "email" ? 'email-address' : props?.keyboardType}
              placeholderTextColor={Colors.PLACEHOLDER_COLOR}
              numberOfLines={props?.numberOfLines ? props?.numberOfLines : 1}
              maxLength={props?.maxLength ? props?.maxLength : 40}
              autoCapitalize={(fieldInfo?.type === "email" || fieldInfo?.type === "password") ? 'none' : props?.autoCapitalize}
              returnKeyType='next'
              onSubmitEditing={onSubmitEditing}
              {...props}
            />
            :
            <MaskInput
              ref={ref}
              placeholder={fieldInfo?.placeholder}
              onFocus={fieldInfo?.onFocus}
              value={fieldInfo?.value}
              onChangeText={onChange}
              mask={USPhoneNumberMask}
              style={[styles.input, inputStyle]}
              secureTextEntry={fieldInfo?.type === "password" && showPassword}
              keyboardType={fieldInfo?.type === "email" ? 'email-address' : props?.keyboardType}
              placeholderTextColor={Colors.PLACEHOLDER_COLOR}
              numberOfLines={props?.numberOfLines ? props?.numberOfLines : 1}
              maxLength={props?.maxLength ? props?.maxLength : 40}
              autoCapitalize={(fieldInfo?.type === "email" || fieldInfo?.type === "password") ? 'none' : props?.autoCapitalize}
              {...props}
            />

          }

        </View>
        {/* Right Icon */}
        {fieldInfo?.RightIcon || fieldInfo?.type === "password" ? (
          <View style={styles.rightIconCont}>
            {fieldInfo?.RightIcon && (
              <Image
                source={
                  fieldInfo?.RightIcon
                }
                style={{
                  width: UtilityMethods.wp(5),
                  height: UtilityMethods.wp(5),
                }}
              />
            )}

            {fieldInfo?.type === "password" && (
              <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
                {showPassword ? (
                  <Icons.EyeClose />
                ) : (
                  <Icons.EyeOpen
                    width={UtilityMethods.wp(7)}
                    height={UtilityMethods.wp(7)}
                  />
                )}
              </TouchableOpacity>
            )}


          </View>
        ) : null}



      </View>

      {fieldInfo?.error?.length > 0 ? <Text style={styles.ErrorText}>{
        fieldInfo?.error
      }</Text> : null}
    </View>
  );
})



export default InputText;
