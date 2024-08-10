import { Alert, Platform, ToastAndroid } from 'react-native';
import { Toast } from "react-native-toast-notifications";

class alertService {
  toastPrompt = (msg, type = 'success',) => {
    
    if (type === 'error')
      Toast.show(msg, { duration: 2000, type: "danger",placement: "bottom", });
    else
      Toast.show(msg, {
        type: "success",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
  }
  show(title, message) {
    Alert.alert(title, message, [
      {
        text: 'OK',
        style: 'destructive'
      }
    ])
  }

  deleteAlert() {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Delete",
        "Are you sure you want to delete?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              resolve(true);
            }
          }
        ]
      );
    })
  }

  confirm(message, okText, cancelText, title) {
    return new Promise((resolve, reject) => {
      Alert.alert(
        title ? title : null,
        message,
        [
          {
            text: cancelText || "Cancel",
            onPress: () => { reject(); },
            style: "cancel",
          },
          { text: okText || "OK", onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  }

}
const AlertService = new alertService();
export default AlertService;

//   Toast.show("custom_toast", {
//     type: "custom_toast",
//     duration: 5000,
//     data: {
//       title: msg1,
//       message: msg1,
//       // text: remoteMessage?.data?.userName,
//       // image:
//       //   remoteMessage?.data?.status == "MESSAGE"
//       //     ? require("../../assets/toastMessage.png")
//       //     : remoteMessage?.data?.status == "HARPOON"
//       //     ? require("../../assets/toastHarpoon.png")
//       //     : require("../../assets/catchIcon.png"),
//     },
// })