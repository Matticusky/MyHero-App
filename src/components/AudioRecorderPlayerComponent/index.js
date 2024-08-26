import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, PermissionsAndroid, Linking, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CryptoJS from 'crypto-js';
// import WifiManager from 'react-native-wifi-reborn';
import axios from 'axios';
const audioRecorderPlayer = new AudioRecorderPlayer();
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFetchBlob from 'rn-fetch-blob';

const checkPermissions = async () => {
  if (Platform.OS === 'android') {
    const recordAudioPermission = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (recordAudioPermission !== RESULTS.GRANTED) {
      return false;
    }

    if (Platform.Version < 30) {
      const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (writePermission !== RESULTS.GRANTED) {
        return false;
      }
    } 
  } else {
    return true
  }
  return true;
};


const key = [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35];
const secretKey = key.map(hex => String.fromCharCode(hex)).join('');


const AudioRecorderPlayerComponent = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [wavFilePath, setWavFilePath] = useState(null);

  // const secretKey = '0123456789012345';

  useEffect(() => {
    async function initPermissions() {
      const hasAllPermissions = await checkPermissions();
      setHasPermission(hasAllPermissions);
    }

    initPermissions();
  }, []);

  const startRecording = async () => {
    if (isRecording) {
      console.warn('Already recording!');
      return;
    }
    setAudioFile(null)
    setIsRecording(true);
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording: ', e);
    });

    console.log('Recording result: ', result);
  };

  const convertToWav = async (inputPath) => {
    const timestamp = Date.now();
    const outputWavPath = inputPath.replace(/\.(m4a|mp4)$/, `_${timestamp}.wav`);
    const command = `-i ${inputPath} ${outputWavPath}`;

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();
  
    if (returnCode.isValueSuccess()) {
      console.log('Conversion to WAV successful');
      setWavFilePath(outputWavPath); // Save the .wav file path
      return outputWavPath;
    } else {
      console.log('Conversion failed');
      return null;
    }
  };

  const stopRecording = async () => {
    if (!isRecording) {
      console.warn('Not recording!');
      return;
    }

    setIsRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioFile(result);
    console.log('Stop recording result: ', result);
    const a = await convertToWav(result);
    console.log(a,"hello")
  };

  const playRecording = async () => {
    if (isPlaying) {
      console.warn('Already playing!');
      return;
    }

    if (!audioFile) {
      Alert.alert("Warning", "No Audio file to play");
      return;
    }

    setIsPlaying(true);
    const msg = await audioRecorderPlayer.startPlayer(wavFilePath);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        console.log('Finished playing');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsPlaying(false);
      }
    });

    console.log('Playing result: ', msg);
  };

  const deleteAudio = () =>{
        console.log('Finished playing');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setAudioFile(null)
        setIsPlaying(false);
  }

  const saveRecording = async () => {
    if (!audioFile) {
      console.warn('No audio file to save!');
      return;
    }
  
    const appFolder = `${RNFS.DocumentDirectoryPath}/UmboBooks`;
  
    // Check if the folder exists, if not, create it
    if (!(await RNFS.exists(appFolder))) {
      await RNFS.mkdir(appFolder);
    }
  
    const destPath = `${appFolder}/test.mp3`;
  
    try {
      await RNFS.copyFile(audioFile, destPath);
      console.warn('Audio file saved as MP3:', destPath);
    } catch (error) {
      console.warn('Failed to save audio file:', error);
    }
  };
  

  const downloadFile = async () => {
    const url = 'https://file-examples.com/storage/fe44eeb9cb66ab8ce934f14/2017/11/file_example_MP3_700KB.mp3';
    const appFolder = `${RNFS.DownloadDirectoryPath}/UmboBooks`;

    // Check if the folder exists, if not, create it
    if (!(await RNFS.exists(appFolder))) {
      await RNFS.mkdir(appFolder);
    }

    const filePath = `${appFolder}/downloaded_file_${Date.now()}.mp3`;

    try {
      const downloadResult = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert("File Downloaded successfully", filePath)
      } else {
        console.warn('Failed to download file');
      }
    } catch (error) {
      console.warn('Error downloading file:', error);
    }
  };

   // Read and encrypt file
  //  const readAndEncryptFile = async (path, key) => {
  //   try {
  //     const fileData = await RNFS.readFile(path, 'base64');
  //     const encryptedData = CryptoJS.AES.encrypt(fileData, key).toString();
  //     return encryptedData;
  //   } catch (error) {
  //     console.error('Error reading/encrypting file:', error);
  //     throw error;
  //   }
  // };

   // Send file to IoT device
  //  const sendFileToDevice = async (encryptedData, deviceIp) => {
  //   try {
  //     setLoader(true)
  //     await axios.post(`http://${deviceIp}/upload`, { file: encryptedData, });
  //     Alert.alert('File sent successfully');
  //   } catch (error) {
  //     // console.error('Error sending file to device:', error);
  //     Alert.alert('Failed to send file to device',error.message);
  //     console.log(error,"error")
  //   }
  // };


  const readAndEncryptFile = async (path, key) => {
    try {
      const fileData = await RNFS.readFile(path, 'base64');
      const encryptedData = CryptoJS.AES.encrypt(fileData, key).toString();
      const encryptedPath = `${RNFS.CachesDirectoryPath}/encrypted.mp3`;
      await RNFS.writeFile(encryptedPath, encryptedData, 'base64');
      return encryptedPath;
    } catch (error) {
      console.error('Error reading/encrypting file:', error);
      throw error;
    }
  };

  const sendFileToDevice = async (encryptedData, deviceIp) => {
    setLoader(true)
    // console.log(wavFilePath,'I am audioFile')
    // return
    try {
      const formData = new FormData();
      formData.append('file', {
        // uri: `data:application/octet-stream;base64,${encryptedData}`,
        // uri:`file:///${encryptedData}`,
        // uri:`file:///${wavFilePath}`,
        uri:`${wavFilePath}`,
        name: `sound_${Date.now()}.wav`,
        type: 'audio/wav',
      });
      // console.log(`file:///${encryptedData}`,audioFile,'encryptedData')
      // const response = await axios.post(`http://${deviceIp}/posts`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // 'Content-Type': 'application/json',
      //   },
      //   timeout:60000,
      // });

      // if (response.status === 200) {
      //   Alert.alert('File sent successfully',response.data.status);
      // } else {
      //   Alert.alert(`Failed to send file. Status code: ${response.status}`);
      // }


      RNFetchBlob.fetch('POST', `http://${deviceIp}/posts`, {
        'Content-Type': 'multipart/form-data',
      }, [
        { name: 'file', filename: `sound_${Date.now()}.wav`, data: RNFetchBlob.wrap(wavFilePath) },
      ]).then((resp) => {
        Alert.alert('File sent successfully',response.data.status);
        console.log('File upload response: ', resp);
      }).catch((err) => {
        console.error('File upload error: ', err);
      });




    } catch (error) {
      Alert.alert('Failed to send file to device', error.message);
      console.log(error.message, "error");
    }
    finally{
      setLoader(false)
    }
  };








  const handleFileTransfer = async () =>{
    try {
      const encryptedData = await readAndEncryptFile(audioFile, secretKey);
      const deviceIp = '192.168.89.161'; // Replace with your IoT device IP address
      await sendFileToDevice(encryptedData, deviceIp);
    } catch (error) {
      Alert.alert('File transfer failed',error?.message);
    }
    finally{
      setLoader(false)
    }
  }





  // const sendData = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');

  //   const raw = JSON.stringify({
  //     Cmd: '0x01',
  //     Timer: timer.toString(),
  //     Style: style,
  //     Speed: speed,
  //   });

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   };

  //   try {
  //     const response = await fetch('http://192.168.4.1/post', requestOptions);

  //     if (response.ok) {
  //       const result = await response.text();
  //       Alert.alert('Success', 'Patting device started.');
  //       setIsStarted(true);
  //     } else {
  //       const errorText = await response.text();
  //       Alert.alert('Error', `Failed to send data: ${errorText}`);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to send data: ' + error.message);
  //   }
  // };




  if (!hasPermission) {
    return <Text>No access to microphone or storage</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={[styles.button,isRecording && { backgroundColor:'black' }]}>
        <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
     {
      audioFile && !isRecording &&
     <TouchableOpacity onPress={playRecording} style={[styles.button, ]}>
        <Text style={styles.buttonText}>Play Recording</Text>
      </TouchableOpacity>}

      {
        audioFile && !isRecording &&
        <TouchableOpacity onPress={handleFileTransfer} style={styles.button}>
        <Text style={styles.buttonText}>Send Audio to Doll</Text>
      </TouchableOpacity>
      }

      {
        audioFile && !isRecording &&
        <TouchableOpacity onPress={deleteAudio} style={[styles.button,{backgroundColor:'red'}]}>
        <Text style={styles.buttonText}>Delete Audio</Text>
      </TouchableOpacity>
      }

      {
        loader && 
        <ActivityIndicator size={'large'}  color={'black'} />
      }

      {/* <TouchableOpacity onPress={saveRecording} style={styles.button}>
        <Text style={styles.buttonText}>Save Recording</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={downloadFile} style={styles.button}>
        <Text style={styles.buttonText}>Download File</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AudioRecorderPlayerComponent;


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    rowGap:20,
    backgroundColor:'white'
  },
  button:{
    backgroundColor:'green',
    width:'90%',
    paddingVertical:10,
    marginLeft:'2%',
    paddingHorizontal:16,
    alignItems:'center'
  },
  buttonText:{
    color:'white'
  }
})