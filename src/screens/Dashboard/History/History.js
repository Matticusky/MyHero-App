import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate, { getCurrentDateInFormat } from '../../../utility/FormateDate';

const LibraryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  // useEffect(() => {
  //   getInstructorClasses();
  // }, []);

  // const getInstructorClasses = async (isRefresh=true) => {
  //   if(isRefresh)
  //     setLoader(true);
    
  //   try {
  //     let response = await axiosWrapper('GET', `${API_URLS.GET_CLASSES}?date=${getCurrentDateInFormat()}`, null, token, false, 'json', false);
  //     setClasses(response.data);
  //   } catch (error) {
      
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleAttendance = (item) => {
    // navigation.navigate(Routes.ATTENDANCE, { item });
  };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   getInstructorClasses(false).then(() => setRefreshing(false));
  // }, []);

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          DrawerHeader={true}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          ListEmptyComponent={() => (
            <EmptyComponent 
            title={'No Classes Found!'}
            desc={'Sorry we cannot find any registered classes for you. Please contact your instructor to add you to their class lists.'}
            />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.headerText}>My Classes</Text>
              <Text style={styles.regText}>
                for {formatDate(new Date())}
              </Text>
            </View>
          }
          data={classes}
          keyExtractor={(item,index) => index?.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              buttonText="Mark Attendance"
              onPress={() => handleAttendance(item)}
            />
          )}
        />
      </View>
    </MainLayout>
  );
}

export default LibraryScreen;
