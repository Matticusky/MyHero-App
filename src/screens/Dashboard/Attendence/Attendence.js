import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Header, MainLayout, ModifiedOTPInput, OtpInput, SuccessModal } from '../../../components';
import { CommonStyles, UtilityMethods } from '../../../utility';
import styles from './styles';
import { Icons, Colors } from '../../../assets'; 
import ClassDetails from '../../../components/ClassDetail';

const MAX_ATTEMPTS = 3;

const Attendance = ({ navigation, route }) => {
  const item = route.params?.item;
  const dispatch = useDispatch();
  const [otpInp, setOtpInp] = useState('');
  const [location, setLocation] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.goBack()
  };

  
  useEffect(() => {
    UtilityMethods.getUserCurrentLocation((location) => {
      setLocation(location);
    });
  }, []);

  const handleSubmit = () => {
    // Simulate OTP validation
    const isValidOTP = otpInp === '123';

    if (isValidOTP) {
      // Alert.alert("Success", "OTP is correct, you've joined the class!");
      setAttemptsLeft(MAX_ATTEMPTS);
      setErrorMessage('');
      handleShowModal()
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 > 0) {
        setErrorMessage(`Wrong Code, You have ${attemptsLeft - 1} Attempts Left.`);
      } else {
        setErrorMessage("No Attempts Left, You’ve been marked absent!");
      }
    }
  };

  const handleRequestExcusedAbsence = () => {
    Alert.alert("Request Submitted", "Your request for an excused absence has been submitted.");
  };

  return (
    <MainLayout>
      <Header title={"Mark Attendance"} showBackButton={true} DrawerHeader={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Text style={styles.title}>Enter the One Time Code to Join the Class</Text>

        <ModifiedOTPInput
          value={otpInp}
          setValue={setOtpInp}
          style={styles.otpContainer}
        />

        <Button
          text={attemptsLeft > 0 ? "Submit" : "Request Excused Absence"}
          Icon={<Icons.Right />}
          onPress={attemptsLeft > 0 ? handleSubmit : handleRequestExcusedAbsence}
        />

        <Text style={[styles.error, { color: attemptsLeft < MAX_ATTEMPTS ? Colors.RED : Colors.BLACK }]}>
          {errorMessage || `You have total ${MAX_ATTEMPTS} Attempts`}
        </Text>

        <ClassDetails
          section={item.classSection}
          instructor={item.classInstructor}
          date={item.date}
          timeSlot={item.timeSLot}
        />

        <View style={styles.container}>
          <Text style={styles.noteTitle}>Please Note:</Text>
          <View style={styles.noteBody}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.noteText}>
              You can attempt for the maximum of <Text style={styles.highlightText}>3 Times.</Text>
            </Text>
          </View>
          <View style={styles.noteBody}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.noteText}>
              After you are out of all attempts, you’ll be marked absent.
            </Text>
          </View>
          <View style={styles.noteBody}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.noteText}>
              Your location will be recorded at the time of marking the attendance.
            </Text>
          </View>
        </View>
      </ScrollView>
      <SuccessModal visible={isModalVisible} onClose={handleCloseModal} />
    </MainLayout>
  );
};

export default Attendance;
