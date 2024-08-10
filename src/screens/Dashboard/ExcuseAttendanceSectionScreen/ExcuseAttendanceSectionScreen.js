import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, CustomizedInput, DatePickerComponent, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { dummyExcuseData, MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate from '../../../utility/FormateDate';

const ExcuseAttendanceSectionScreen = ({ navigation, route }) => {
  const title = route?.params?.title
  const index = route?.params?.index
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  const [search, setSearch] = useState({
    inputType: "text",
    value: "",
    type: "text",
    error: "",
    placeholder: "Search your missed class....",
    leftIcon: <Icons.SearchIcon />
  });

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header title={title}
          showBackButton={true}
          DrawerHeader={false}
        />

        {
          index === 0 ?
            <CustomizedInput
              fieldInfo={search}
              onChange={(text) => {
                setSearch({ ...search, value: text, error: "" });
              }}
              InputContStyle={styles.searchInput}
            />
            : (
              <DatePickerComponent
                date={selectedDate}
                setDate={setSelectedDate}
                placeholder="Select a date"
              />
            )
        }

        <CustomFlatList
          listStyle={styles.listStyle}
          ListEmptyComponent={() => (
            <EmptyComponent />
          )}
          data={dummyExcuseData}
          keyExtractor={(item) => item?._id?.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              buttonText="Request Excused Absence"
              onPress={() => { }}
            />
          )}
        />
      </View>
    </MainLayout>
  );
}

export default ExcuseAttendanceSectionScreen;
