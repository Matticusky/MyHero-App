import React from 'react';
import { Text, StyleSheet, Platform, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Colors, Fonts } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const CELL_COUNT = 3;

const ModifiedOtpInput = ({ value, setValue, style }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoFocus
      autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell,style, (isFocused || symbol) && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : <View style={styles.footer}><View style={styles.noCursor} /></View>)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginHorizontal: UtilityMethods.wp(15),
  },
  cell: {
    width: UtilityMethods.wp(16),
    height: UtilityMethods.wp(23),
    fontSize: FontSize.VALUE(40),
    textAlign: 'center',
    color: Colors.BLACK,
    lineHeight: UtilityMethods.hp(2.5),
    borderRadius: UtilityMethods.wp(1),
    borderWidth: 2,
    borderColor: Colors.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical:'center',
    paddingTop: UtilityMethods.wp(12),
    backgroundColor: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
  focusCell: {
    borderColor: Colors.BLACK,
  },
  // footer: {
  //   width: UtilityMethods.wp(13),
  //   height: UtilityMethods.wp(11),
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // noCursor: {
  //   width: UtilityMethods.wp(5),
  //   borderBottomColor: Colors.LIGHT_GRAY,
  //   borderBottomWidth: 1,
  // },
});

export default ModifiedOtpInput;
