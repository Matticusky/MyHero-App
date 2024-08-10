import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ExcuseInformationSection, FileUploadComponent, Header, MainLayout, ReasonTextInput } from '../../../components';
import styles from './styles';
import Routes from '../../../navigation/Routes';


const ExcuseAttendanceDetailScreen = ({ navigation }) => {
  const [reason, setReason] = useState('');
  const [file, setFile] = useState([]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    navigation.navigate(Routes.EXCUSE_ATTENDANCE_SUCCESS_SCREEN)
  };

  return (
    <MainLayout>
      <Header title="Excused Absence" onBackPress={handleBackPress} />
      <ExcuseInformationSection
        className="Advanced Data Structures & Algorithm Analysis"
        classSection="Section X"
        dateTime="15/04/2024, 4:30 PM to 5:30 PM"
      />
      <ReasonTextInput reason={reason} setReason={setReason} />
      <FileUploadComponent file={file} setFile={setFile} />
      <Button 
        text={'Request Excused Absence'} 
        onPress={handleSubmit}
        style={styles.buttonContainer}
        />
    </MainLayout>
  );
};


export default ExcuseAttendanceDetailScreen;
