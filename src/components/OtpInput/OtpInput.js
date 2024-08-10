import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { CommonStyles, FontSize, UtilityMethods } from '../../utility';
import { Colors, Fonts } from '../../assets';

const { wp, hp } = UtilityMethods;

const OtpInput = ({ numOfDigits = 4, onComplete, reset }) => {
    const [digits, setDigits] = useState(Array(numOfDigits).fill(''));
    const inputRefs = useRef(digits.map(() => React.createRef()));
    
    useEffect(() => {
        if (reset) {
            setDigits(Array(numOfDigits).fill(''));
            inputRefs.current[0].current.focus();
        }
    }, [reset]);

/// Handle change text ///
    const handleChangeText = (text, index) => {
        const newDigits = [...digits];
        newDigits[index] = text;
        setDigits(newDigits);

        if (text && index < numOfDigits - 1) {
            inputRefs.current[index + 1].current.focus();
        } else if (!text && index > 0) {
            inputRefs.current[index - 1].current.focus();
        }

        // if (index === numOfDigits - 1 && text) {
            onComplete(newDigits.join(''));
        // }
    };
  /// Handle backspace /// 
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            {digits.map((digit, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    value={digit}
                    ref={inputRefs.current[index]}
                    autoFocus={index === 0}
                    cursorColor={Colors.ICON_BLACK}
                    selectionColor={Colors.BLACK}
                    selectionHandleColor={Colors.BLACK}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        
        borderRadius: hp(1),
        width: wp(12),
        height: wp(12),
        textAlign: 'center',
        
        backgroundColor: Colors.GRAY_OTP,
        color: Colors.ICON_BLACK,
        borderRadius:wp(100),
        fontFamily:Fonts.REGULAR,
        fontSize:FontSize.VALUE(16),
        borderColor:Colors.PLACEHOLDER_COLOR,
        borderWidth:1

    },
});

export default OtpInput;
