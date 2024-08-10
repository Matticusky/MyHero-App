import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Header, MainLayout } from '../../../components';
import { attendanceData } from '../../../Data/DummyData';
import AttendanceHistoryComponent from '../../../components/AttendanceHistoryComponent';
import styles from './style';

const History = () => {

  const renderItem = ({ item }) => (
    <AttendanceHistoryComponent
      status={item.status}
      className={item.className}
      dateTime={item.dateTime}
    />
  );

  return (
    <MainLayout>
      <Header title="Attendance History"
        showBackButton={false}
        DrawerHeader={true}
      />

      {/* <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      /> */}

      <View style={styles.imgContainer}>

        <Image
          source={{ uri: 'http://15.235.162.99:3556/assets/coming-soon-DrP5VIqS.png' }}
          style={styles.image}
          resizeMode='contain'
        />

      </View>

    </MainLayout>
  );
}

export default History;
