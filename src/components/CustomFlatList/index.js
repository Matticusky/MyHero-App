import { View, Text } from "react-native";
import React from "react";
import UtilityMethods from "../../utility/UtilityMethods";
import { FlatList } from "react-native-gesture-handler";

 const CustomFlatList = ({
  item,
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  listFooterComponent,
  listStyle,
  ListEmptyComponent,
  refreshControl,
  refreshing,
  onEndReached,
  onRefresh,
  onEndReachedThreshold,
  keyboardShouldPersistTaps,
  ...props
}) => {
  return (
    <FlatList
      data={data}
     
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      style={[{ flex: 1 }, listStyle]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        { paddingBottom: UtilityMethods.hp(2), flexGrow: 1 },
        contentContainerStyle,
      ]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={listFooterComponent}
      refreshControl={refreshControl}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      {...props}
    />
  );
};

export default CustomFlatList;
