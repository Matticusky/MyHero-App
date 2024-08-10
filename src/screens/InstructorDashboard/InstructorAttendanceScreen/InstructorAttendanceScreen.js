import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 // Update the path to the actual file
import { Button, Header, MainLayout, ScreenWrapper,ShowDropdown } from '../../../components';
import { Colors, Fonts, Icons } from '../../../assets';
import { UtilityMethods, FontSize } from '../../../utility';
import styles from './styles';
import Routes from '../../../navigation/Routes';
import { attemptsData, expiryData } from '../../../Data/DummyData';


const InstructorAttendenceScreen = ({ navigation, route }) => {
  const item = route.params?.item;
  const [otp, setOtp] = useState('XXX');
  const [attempts, setAttempts] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [timer, setTimer] = useState(0);


  const generateOtp = () => {
    const newOtp = Math.floor(100 + Math.random() * 900).toString();
    setOtp(newOtp);
  };

  const startTimer = (minutes) => {
    setTimer(minutes * 60);
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer);
    const seconds = 0
    return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <MainLayout>
      <Header 
        title={"Generate Code"}
        showBackButton={true} 
        DrawerHeader={false} 
        />
      <ScreenWrapper style={styles.container}>
        <View style={styles.otpContainer}>
          <Text style={styles.otpText}>{otp}</Text>
          <Text style={styles.timerText}>{formatTimer()}</Text>
        </View>
        <Text style={styles.instructionText}>
          Please share this code with students to mark their attendance.
        </Text>
        <ShowDropdown
          data={attemptsData}
          value={attempts}
          setValue={setAttempts}
          placeTxt="3 Times"
          label="Code Attempts"
          style={styles.dropdown}
        />
        <ShowDropdown
          data={expiryData}
          value={expiryTime}
          setValue={(value) => {
            setExpiryTime(value);
            setTimer(value)
          }}
          placeTxt="Code Expiry Time"
          label="Code Expiry Time"
          style={styles.dropdown}
          renderLeftIcon={() =>
          (<View style={{marginRight:UtilityMethods.wp(2)}}> 
            <Icons.ClockIcon  />
          </View>)}
        />
        <Button
          text={"Generate New Code"}
          Icon={<Icons.Reload />}
          style={styles.generateButton}
          onPress={generateOtp}
        />
        <Button
          text={"Show Attendance List"}
          Icon={<Icons.List />}
          style={styles.listButton}
          onPress={() => navigation.navigate(Routes.ATTENDENCE_LIST_SCREEN)}
          textStyle={styles.listButtonText}
        />
      </ScreenWrapper>
    </MainLayout>
  );
};

export default InstructorAttendenceScreen;
