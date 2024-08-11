import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Icons, Colors, Fonts } from '../../assets';  // Make sure these imports are correct
import { UtilityMethods, FontSize } from '../../utility';  // These as well

const SearchBar = ({
  searchValue,
  onSearchChange,
  toggleValue,
  onToggleChange,
  onCancelSearch,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleTogglePress = () => {
    onToggleChange(!toggleValue);
  };

  const handleSearchChange = (text) => {
    onSearchChange(text);
    setIsSearching(text.length > 0);
  };

  const handleCancelPress = () => {
    setIsSearching(false);
    onSearchChange('');
    onCancelSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer} >
          <Icons.SearchIcon style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={Colors.LIGHT_GRAY}
            value={searchValue}
            onChangeText={handleSearchChange}
            selectionColor={Colors.BLACK}
          />
        </View>
        {isSearching ? (
          <TouchableOpacity onPress={handleCancelPress}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleTogglePress}>
            {toggleValue ? (
              <Icons.GridIcon style={styles.toggleIcon} width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
            ) : (
              <Icons.ListIcon2 style={styles.toggleIcon} width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: UtilityMethods.wp(5),

  },
  searchInputContainer: {
    flex: 1,
    marginRight: UtilityMethods.wp(5),
    paddingHorizontal: UtilityMethods.wp(3),
    height: UtilityMethods.hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: UtilityMethods.wp(1.5),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 4,
    borderColor:Colors.LIGHT_GRAY,
    borderWidth:0.5
  },
  searchIcon: {
    tintColor: Colors.GRAY,
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
    marginRight:  UtilityMethods.wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    height: UtilityMethods.hp(6),
    marginTop: Platform.OS === 'android' ?  UtilityMethods.hp(0.5) : null,
  },
  cancelText: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  toggleIcon: {
    tintColor: Colors.BLACK,
    width: UtilityMethods.wp(6),
    height: UtilityMethods.wp(6),
  },
});

export default SearchBar;
