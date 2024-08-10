import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../assets';
import { CommonStyles, FontSize } from '../../utility';

const CountdownTimer = ({ setonCounterFinished, contStyle, countDownTime, reset, counterStarted, expiredPress }) => {
  const [seconds, setSeconds] = useState(countDownTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (expiredPress || reset) {
      setSeconds(countDownTime);
      counterStarted();
      startTimer();
    }
  }, [expiredPress, reset]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalRef.current);
      setonCounterFinished(true);
    }
  }, [seconds]);

  const startTimer = () => {
    clearInterval(intervalRef.current); // Clear any existing timer
    intervalRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalRef.current); // Stop the timer if seconds reach 0
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  // Format the remaining seconds into MM:SS format
  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')} : ${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <View style={contStyle}>
      <Text style={styles.texStyle}>{formattedTime}</Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  texStyle: {
    fontSize: FontSize.VALUE(24),
    color: Colors.LIGHT_GRAY,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
  },
});
