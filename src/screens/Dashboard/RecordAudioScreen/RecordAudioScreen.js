import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import {Header, ImageGallery, MainLayout} from '../../../components';
import AudioRecordComponent from '../../../components/AudioRecordComponent';
import {useEffect, useState} from 'react';
import {Colors} from '../../../assets';
import {useSelector, useDispatch} from 'react-redux';
import {addAudioFile} from '../../../redux/Reducers/AudioReducer';
import {FFmpegKit} from 'ffmpeg-kit-react-native';

const RecordAudioScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const bookId = route?.params?.bookId;
  const user = useSelector(state => state.auth.user);
  const [audioPath, setAudioPath] = useState('');
  const [loader, setLoader] = useState(false);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [recording, paused]);

  const handleBackPress = () => {
    if (recording || paused) {
      Alert.alert(
        'Recording in Progress',
        'Please save the recording before going back.',
        [{text: 'OK', onPress: () => {}}],
      );
      return true;
    }
    return false;
  };

  const handleSaveAudio = filePath => {
    setAudioPath(filePath);
    convertToWav(filePath);
  };

  const convertToWav = async inputPath => {
    setLoader(true);
    const timestamp = Date.now();
    const outputWavPath = inputPath.replace(
      /\.(m4a|mp4)$/,
      `_${timestamp}.wav`,
    );
    const command = `-i ${inputPath} ${outputWavPath}`;

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (returnCode.isValueSuccess()) {
      console.log('Conversion to WAV successful');
      console.log(outputWavPath, 'outputWavPath');
      saveDataIntoList(outputWavPath);
      setLoader(false);
    } else {
      Alert.alert('Error', 'Conversion failed');
      return null;
    }
  };

  const saveDataIntoList = outputWavPath => {
    try {
      let data = {
        _id: Math.random(),
        bookId,
        audioPath: outputWavPath,
        timestamp: Date.now(),
        duration: recordingTime,
        user: {
          avatar: user.profilePicture,
          name: `${user.firstName} ${user.lastName}`,
        },
      };
      dispatch(addAudioFile(data));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout
      bottomColor={Colors.BLACK}
      statusbarBackgrund={Colors.WHITE}
      loader={loader}>
      <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <Header
          title={'Book Preview'}
          rightIcons={false}
          handleBackPress={handleBackPress}
        />
        <ImageGallery />

        <AudioRecordComponent
          onSave={handleSaveAudio}
          recording={recording}
          setRecording={setRecording}
          paused={paused}
          setPaused={setPaused}
          recordingTime={recordingTime}
          setRecordingTime={setRecordingTime}
        />
      </View>
    </MainLayout>
  );
};

export default RecordAudioScreen;
