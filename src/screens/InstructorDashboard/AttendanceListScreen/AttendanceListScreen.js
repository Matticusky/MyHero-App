// ParentComponent.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { UtilityMethods, } from '../../../utility';
import { Header, MainLayout, StudentAttendanceListCard } from '../../../components';
import { attendanceListData } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';

const AttendanceListScreen = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <StudentAttendanceListCard
                student={item}
                locationPress={() => navigation.navigate(Routes.ATTENDENCE_LOCATION_SCREEN)}
            />
        )
    }

    return (
        <MainLayout>
            <View style={styles.container}>
                <Header
                    title={"Attendance List"}
                    showBackButton={true}
                    DrawerHeader={false}
                />
                <FlatList
                    data={attendanceListData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    contentContainerStyle: {
        paddingVertical: UtilityMethods.hp(2)
    }
});

export default AttendanceListScreen;
