import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { Colors } from "../../assets";
const returnLoadingComponent = () => {
  return <ActivityIndicator size="small" color={Colors.WHITE} />;
};

const returnNormalView = (text, textStyle, Icon, customButton, disabled,LeftIcon) => {
  return (
    
       <View style={styles.buttonWithIcon}>
          {LeftIcon && 
            <View style={styles.leftIconView}>
            {LeftIcon}
            </View>
            }
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          <View style={styles.iconView}>
          {Icon}
          </View>
         
        </View>
      
  
  );
};
 const Button = ({
  style,
  text,
  textStyle,
  Icon,
  disabled = false,
  onPress,
  loading = false,
  customButton = false,
  LeftIcon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, style]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      hitSlop={7}
    >
      {loading
        ? returnLoadingComponent()
        : returnNormalView(text, textStyle, Icon, customButton, disabled,LeftIcon)}
    </TouchableOpacity>
  );
};

export default Button;
