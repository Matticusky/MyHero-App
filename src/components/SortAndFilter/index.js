import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ShowDropdown from '../ShowDropdown'; // Your dropdown component
import { Colors, Fonts, Icons } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const SortAndFilter = ({ 
  members, 
  selectedMember, 
  selectedDateOrder, 
  selectedSort, 
  onPersonChange, 
  onDateChange, 
  onSortChange 
}) => {

  const ProfileCard = ({ name, image,svg:Svg, props }) => {
    return (
      <View style={styles.profileContainer} {...props}>
        {Svg && <Svg width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} style={styles.image}  />}
       {image && <Image source={image} style={styles.image} />}
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  };


  const memberDropdown = useMemo(() => (
    <ShowDropdown
      data={members}
      value={selectedMember}
      setValue={(value)=>onPersonChange(value._id)}
      labelField="name"
      valueField="_id"
      placeTxt="Select Member"
      style={styles.members}
      renderItem={ProfileCard}
    />
  ), [members, selectedMember, onPersonChange]);

  const dateDropdown = useMemo(() => (
    <ShowDropdown
      data={[
        { label: 'Newest', value: 'newest' },
        { label: 'Oldest', value: 'oldest' },
      ]}
      value={selectedDateOrder}
      setValue={(value) => onDateChange(value.value)}
      placeTxt="Sort By Date"
      style={styles.timeDropDown}
    />
  ), [selectedDateOrder, onDateChange]);

  const sortButton = useMemo(() => (
    <TouchableOpacity onPress={onSortChange} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.textAZ}>{selectedSort === 'A-Z' ? 'A-Z' : 'Z-A'}</Text>
      <Icons.AZIcon />
    </TouchableOpacity>
  ), [selectedSort, onSortChange]);

  return (
    <View style={styles.container}>
      {memberDropdown}
      {dateDropdown}
      {sortButton}
    </View>
  );
};

export default SortAndFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: UtilityMethods.wp(3),
  },
  members: {
    width: UtilityMethods.wp(46),
    borderRadius: UtilityMethods.wp(2),
    height: UtilityMethods.hp(5),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 4,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 0.5,
  },
  timeDropDown: {
    width: UtilityMethods.wp(30),
    borderRadius: UtilityMethods.wp(2),
    height: UtilityMethods.hp(5),
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 4,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 0.5,
  },
  textAZ: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    marginRight: UtilityMethods.wp(1),
    color: Colors.BLACK,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(1),
  },
  image: {
    width: UtilityMethods.wp(8),
    height: UtilityMethods.wp(8),
    borderRadius: UtilityMethods.wp(7.5),
    marginHorizontal: UtilityMethods.wp(4),
  },
  name: {
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
});
