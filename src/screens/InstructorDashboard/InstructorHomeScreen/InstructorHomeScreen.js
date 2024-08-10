import React, { useCallback, useEffect, useState } from 'react';
import { Text, View,RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, LogoutModal, MainLayout, ShowDropdown } from '../../../components';
import styles from './styles';
import { genders, instructorClasses } from '../../../Data/DummyData';
import { resetAuth } from '../../../redux/Reducers/AuthReducer';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import Routes from '../../../navigation/Routes';
import { getCurrentDateInFormat, sortClassesByDateTime, sortClassesByDayAndTime } from '../../../utility/FormateDate';



const Home = ({ navigation }) => {
 
  const [loader, setLoader] = useState(false)
  const [classes, setClasses] = useState([])
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(resetAuth())
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getInstructorClasses()
  }, [])

  const getInstructorClasses = async (isRefresh=true) => {
    if(isRefresh)
      setLoader(true);
    try {
      let response = await axiosWrapper('GET', `${API_URLS.GET_CLASSES}?date=${getCurrentDateInFormat()}`, null, token, false, 'json', false);
      let classes = sortClassesByDayAndTime(response.data)
      setClasses(classes)
    } catch (error) {
    } finally {
      setLoader(false)
    }

  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getInstructorClasses(false).then(() => setRefreshing(false));
  }, []);

  const handleNavigation = (item) =>{
    // navigation.navigate(Routes.INSTRUCTOR_ATTENDENCE_SCREEN,{item})
  }


  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          isLogout={true}
          logoutOnPress={() => setModalVisible(true)}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent 
            title={'No Classes Found!'}
            desc={'Sorry we cannot find any registered classes for you.'}
          
            />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.welcome}>Welcome {user?.firstName},</Text>
              <Text style={styles.desc}>Please select a class to mark attendance</Text>
              <Text style={styles.headerText}>Classes to be held</Text>
            </View>
          }
          data={classes}
          keyExtractor={(item,index) => index?.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              buttonText="Take Attendance"
              onPress={()=>handleNavigation(item)}
            />
          )}
        />

        <LogoutModal
          visible={modalVisible}
          onConfirm={handleLogout}
          onCancel={handleCancel}
        />
      </View>
    </MainLayout>



  );
}

export default Home;
