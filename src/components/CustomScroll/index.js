import { View, Text, ScrollView } from "react-native";
import React from "react";
import UtilityMethods from "../../utility/UtilityMethods";

export const CustomScroll = ({
  children,
  containerStyle,
  scrollEnabled,
  style,
}) => {
  return (
    <ScrollView
      style={[{ flex: 1 }, style]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ flexGrow: 1 }, containerStyle]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps="always"
    >
      {children}
    </ScrollView>
  );
};
