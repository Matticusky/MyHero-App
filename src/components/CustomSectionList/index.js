import { View, Text, SectionList } from "react-native";
import React from "react";
import UtilityMethods from "../../utility/UtilityMethods";

export const CustomSectionList = ({
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
  ...props
}) => {
  return (
    <SectionList
      stickySectionHeadersEnabled={false}
      contentContainerStyle={[
        { paddingBottom: UtilityMethods.hp(2), flexGrow: 1 },
        contentContainerStyle,
      ]}
      {...props}
    />
  );
};
