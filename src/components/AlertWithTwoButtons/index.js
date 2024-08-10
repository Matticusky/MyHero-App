import { Alert } from "react-native";

const AlertWithTwoButtons = ({
  title, 
  subtitle, 
  btnTitleFirst, 
  btnTitleSecond, 

  onPressButtonFirst,
  onPressButtonSecond,

}) => {
  return (
    Alert.alert(
      title, 
      subtitle, 
      [
        { text: btnTitleFirst, onPress: onPressButtonFirst },
        { text: btnTitleSecond, onPress: onPressButtonSecond },

      ],
    )
  );
};

export default AlertWithTwoButtons;




