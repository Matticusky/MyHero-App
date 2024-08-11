import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, RefreshControl, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate, { getCurrentDateInFormat } from '../../../utility/FormateDate';
import { Images } from '../../../assets';

const Home = ({ navigation }) => {
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
        <Header 
          logoImage={true}
          showBackButton={false}
          DrawerHeader={true}
        />

        <View style={styles.container} >
          <Image source={Images.LOGO_LARGE} style={styles.logoLarge} />
          <Button
            text="Connect with members"
          />

        </View>
      </View>
    </MainLayout>
  );
}

export default Home;
