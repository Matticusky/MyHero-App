import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, RefreshControl, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BooksCardComponent, BooksListComponent, Button, ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput, SearchBar, SortAndFilter } from '../../../components';
import styles from './styles';
import { DummyBooksData, membersData, MyClasses, PhysicalBooks } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate, { getCurrentDateInFormat, getRelativeTime } from '../../../utility/FormateDate';
import { Icons } from '../../../assets';


const numColumns = 3;

const formatDataIntoRows = (data, numColumns) => {
  const rows = [];
  for (let i = 0; i < data.length; i += numColumns) {
    rows.push(data.slice(i, i + numColumns));
  }
  return rows;
};



const MyExchangeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [searchValue, setSearchValue] = useState('');
  const [isGrid, setIsGrid] = useState(true);



  const [filteredData, setFilteredData] = useState(PhysicalBooks);
  const [selectedMember, setSelectedMember] = useState('all');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [sortByDate, setSortByDate] = useState('newest');

  const searchTimeoutRef = useRef(null); // Ref to store the debounce timeout

  const dataSections = [
    { index: 0, title: "Books", data: formatDataIntoRows(PhysicalBooks, numColumns), },
    { index: 1, title: "Dolls", data: formatDataIntoRows(PhysicalBooks, numColumns), }
  ];

  const handleSearchChange = (text) => {
    setSearchValue(text);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      filterAndSortData(text);
    }, 300);
  };

  const handleToggleChange = (value) => {
    setIsGrid(value);
    // Handle additional logic if needed
  };

  const handleCancelSearch = () => {
    setSearchValue('');
    // Handle additional logic if needed
  };

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



  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   getInstructorClasses(false).then(() => setRefreshing(false));
  // }, []);



  const filterAndSortData = (searchQuery = '') => {
    let filtered = DummyBooksData.filter(_ => _.id !== 0)

    // Search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    setFilteredData([{ id: 0 }, ...filtered]);
  };




  const renderGridItem = ({ item, index }) => (

    <View style={styles.row}>
      {item.map((subItem, subIndex) => (
        <BooksCardComponent
          key={subIndex}
          imageSource={subItem.image}
          title={subItem.title}
          isPaid={true}
          onPress={() => { }}
        />
      ))}
    </View>
  );

  const renderListItem = ({ item, index }) => (

    <View >
      {item.map((subItem, subIndex) => (
        <BooksListComponent
          key={subIndex}
          imageSource={subItem.image}
          title={subItem.title}
          time={getRelativeTime(subItem.createdAt)}
        />
      ))}
    </View>
  );

  const renderSectionHeader = ({ section: { title, index } }) => (
    <Text style={styles.booksTitle}>{title}</Text>
  )

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header
          logoImage={true}
          showBackButton={false}
          DrawerHeader={true}
        />
        
        <SectionList
          listStyle={styles.listStyle}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          ListEmptyComponent={() => (
            <EmptyComponent
              title={'No Books Found!'}
              desc={'Sorry we cannot find any Book.'}
            />
          )}
          ListHeaderComponent={
            <View style={styles.header}>
              <SearchBar
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                toggleValue={isGrid}
                onToggleChange={handleToggleChange}
                onCancelSearch={handleCancelSearch}
              />
              <Text style={styles.creditsTitle}>Available Credits : 300</Text>
            </View>
          }
          renderSectionHeader={renderSectionHeader}
          keyboardShouldPersistTaps={'handled'}
          sections={dataSections}
          key={isGrid ? '_' : '#'}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={isGrid ? renderGridItem : renderListItem}
          numColumns={isGrid ? 3 : 1}
          contentContainerStyle={styles.listContainer}
        />
      </View>

       
      <View style={styles.purchaseButton}>
          <Button
            text="Purchase Credits"
            LeftIcon={<Icons.cardWhite/>}
            onPress={()=>{ navigation.navigate(Routes.PurchaseCreditScreen)}}
          />
        </View>

    </MainLayout>
  );
}

export default MyExchangeScreen;

