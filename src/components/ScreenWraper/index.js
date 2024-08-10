import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

 const ScreenWrapper = ({
  children,
  style,
  model = false,
  ref,
  req = true,
  contentContainerStyle
}) => {
  return (
    <KeyboardAwareScrollView
      style={[styles.containerMain, style]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[{ flexGrow: 1, },contentContainerStyle]}
      // enableOnAndroid={true}
      // enableAutomaticScroll={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      extraScrollHeight={16}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      // resetScrollToCoords={{ x: 0, y: 0 }}
      >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS == "android" ? 15 : 0,
  },
  containerMain: {
    flex: 1,
  },
});

export default ScreenWrapper;
