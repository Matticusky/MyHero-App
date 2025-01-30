import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const pickImage = async (multiple = false) => {
  try {
    if (multiple) {
      const assets = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 30,
        mediaType: 'any',
      });
      return assets.map(asset => formateData(asset));
    } else {
      const asset = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      return formateData(asset);
    }
  } catch (error) {
    throw error;
  }
};

const formateData = response => {
  return Platform.OS === 'android'
    ? {
        uri: response.path,
        name: getFileName(response.path),
        type: response.mime,
        width: response.width,
        height: response.height,
      }
    : {
        uri: response.path,
        name: response.filename,
        type: response.mime,
        width: response.width,
        height: response.height,
      };
};
const getFileName = filePath => {
  return filePath.split('/').pop();
};

export default pickImage;
