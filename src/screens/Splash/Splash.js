import React from "react";
import { Image, Text, View } from "react-native";
import { Colors, Images } from "../../assets";
import styles from "./styles";
import { MainLayout } from "../../components";

const Splash = ({ navigation }) => {
  return (
    <MainLayout  >
      <View
        style={styles.cont} >
        <Image source={Images.LOGO} style={styles.logo} />
        <Text style={styles.regText}>
          Stories That Connect and Inspire!
        </Text>
      </View>
    </MainLayout>
  );
};

export default Splash;
