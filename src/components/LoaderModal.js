import React from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
// import colors from "../assets/config/colors";
import { Colors } from "../assets";
const LoaderModal = ({ loading }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={loading}
      statusBarTranslucent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size={'large'}
            color={Colors.BLACK}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'rgba(0,0,0,0.1)'
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
  },
});
export { LoaderModal };