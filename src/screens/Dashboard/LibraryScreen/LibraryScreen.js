import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BooksCardComponent, BooksListComponent, ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput, SearchBar, SortAndFilter } from '../../../components';
import styles from './styles';
import { DummyBooksData, membersData, MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate, { getCurrentDateInFormat, getRelativeTime } from '../../../utility/FormateDate';

const LibraryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [searchValue, setSearchValue] = useState('');
  const [isGrid, setIsGrid] = useState(true);



  const [filteredData, setFilteredData] = useState(DummyBooksData);
  const [selectedMember, setSelectedMember] = useState('all');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [sortByDate, setSortByDate] = useState('newest');

  const searchTimeoutRef = useRef(null); // Ref to store the debounce timeout



  const handleSearchChange = (text) => {
    setSearchValue(text);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      filterAndSortData(selectedMember, sortByDate, text);
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


  useEffect(() => {
    filterAndSortData(selectedMember, sortByDate, searchValue);
  }, [selectedMember, sortByDate]);


  const filterAndSortData = (memberId, dateOrder, searchQuery = '') => {
    let filtered = DummyBooksData.filter(_ => _.id !== 0)

    // Filter based on memberId
    if (memberId !== 'all') {
      filtered = filtered.filter(item => item.member && item.member._id === memberId);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    // sortBy Date
    const sortedByDate = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredData([{ id: 0 }, ...sortedByDate]);
  };

  const handlePersonChange = (personId) => {
    setSelectedMember(personId);
  };

  const handleDateChange = (order) => {
    setSortByDate(order);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'A-Z' ? 'Z-A' : 'A-Z';
    setSortOrder(newSortOrder);
    const data = filteredData.filter(item => item?.id !== 0)
    const sortedData = data?.sort((a, b) => {
      if (newSortOrder === 'A-Z') {
        return a?.title?.localeCompare(b?.title);
      } else {
        return b?.title?.localeCompare(a?.title);
      }
    });
    setFilteredData([{ id: 0 }, ...sortedData])
  };

  const renderGridItem = ({ item, index }) => (
    index === 0 ?
      <BooksCardComponent
        isAddButton={true}
        onPress={() => navigation.navigate(Routes.AddNewBook)}
      />
      :
      <BooksCardComponent
        imageSource={item.image}
        title={item.title}
        onPress={() => { }}
      />
  );

  const renderListItem = ({ item, index }) => (
    index === 0 ? <></> :
      <BooksListComponent
        imageSource={item.image}
        title={item.title}
        time={getRelativeTime(item.createdAt)}
      />
  );

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header
          logoImage={true}
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
              title={'No Books Found!'}
              desc={'Sorry we cannot find any Book.'}
            />
          )}
          ListHeaderComponent={
            <>
              <SearchBar
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
                toggleValue={isGrid}
                onToggleChange={handleToggleChange}
                onCancelSearch={handleCancelSearch}
              />
              <SortAndFilter
                members={membersData}
                selectedMember={selectedMember}
                selectedDateOrder={sortByDate}
                selectedSort={sortOrder}
                onPersonChange={handlePersonChange}
                onDateChange={handleDateChange}
                onSortChange={handleSortChange}
              />
            </>
          }
          keyboardShouldPersistTaps={'handled'}
          data={filteredData}
          key={isGrid ? '_' : '#'}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={isGrid ? renderGridItem : renderListItem}
          numColumns={isGrid ? 3 : 1}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </MainLayout>
  );
}

export default LibraryScreen;

