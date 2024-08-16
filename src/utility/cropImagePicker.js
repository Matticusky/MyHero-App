import ImagePicker from 'react-native-image-crop-picker';

const pickImage = async (multiple = false) => {
  try {
    if (multiple) {
      const assets = await ImagePicker.openPicker({
        multiple: true,
        maxFiles:30,
        mediaType: 'any',
      });
      return assets.map(asset => ({
        uri: asset.path,
        width: asset.width,
        height: asset.height,
        mime: asset.mime,
      }));
    } else {
      const asset = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping:true
      });
      return {
        uri: asset.path,
        width: asset.width,
        height: asset.height,
        mime: asset.mime,
      };
    }
  } catch (error) {
    throw error;
  }
};

export default pickImage;
