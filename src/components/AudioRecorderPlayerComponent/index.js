// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Platform, PermissionsAndroid, Linking, Alert, StyleSheet, ActivityIndicator } from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import RNFS from 'react-native-fs';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import CryptoJS from 'crypto-js';
// // import WifiManager from 'react-native-wifi-reborn';
// import axios from 'axios';
// const audioRecorderPlayer = new AudioRecorderPlayer();
// import { FFmpegKit } from 'ffmpeg-kit-react-native';
// import RNFetchBlob from 'rn-fetch-blob';

// import TcpSocket from 'react-native-tcp-socket';


// const checkPermissions = async () => {
//   if (Platform.OS === 'android') {
//     const recordAudioPermission = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
//     if (recordAudioPermission !== RESULTS.GRANTED) {
//       return false;
//     }

//     if (Platform.Version < 30) {
//       const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//       if (writePermission !== RESULTS.GRANTED) {
//         return false;
//       }
//     } 
//   } else {
//     return true
//   }
//   return true;
// };


// const key = [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35];
// const secretKey = key.map(hex => String.fromCharCode(hex)).join('');


// const AudioRecorderPlayerComponent = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioFile, setAudioFile] = useState(null);
//   const [loader, setLoader] = useState(false);
//   const [wavFilePath, setWavFilePath] = useState(null);

//   // const secretKey = '0123456789012345';

//   const [devices, setDevices] = useState([]);
//   let peersUpdatesSubscription;
//   let connectionInfoUpdatesSubscription;
//   let thisDeviceChangedSubscription;



//   useEffect(() => {
//     async function initPermissions() {
//       const hasAllPermissions = await checkPermissions();
//       setHasPermission(hasAllPermissions);
//     }

//     initPermissions();
//   }, []);

//   const startRecording = async () => {
//     if (isRecording) {
//       console.warn('Already recording!');
//       return;
//     }
//     setAudioFile(null)
//     setIsRecording(true);
//     const result = await audioRecorderPlayer.startRecorder();
//     audioRecorderPlayer.addRecordBackListener((e) => {
//       console.log('Recording: ', e);
//     });

//     console.log('Recording result: ', result);
//   };

//   // const convertToWav = async (inputPath) => {
//   //   const timestamp = Date.now();
//   //   const outputWavPath = inputPath.replace(/\.(m4a|mp4)$/, `_${timestamp}.wav`);
//   //   const command = `-i ${inputPath} ${outputWavPath}`;

//   //   const session = await FFmpegKit.execute(command);
//   //   const returnCode = await session.getReturnCode();
  
//   //   if (returnCode.isValueSuccess()) {
//   //     console.log('Conversion to WAV successful');
//   //     setWavFilePath(outputWavPath); // Save the .wav file path
//   //     return outputWavPath;
//   //   } else {
//   //     console.log('Conversion failed');
//   //     return null;
//   //   }
//   // };

//   const convertToWav = async (inputPath) => {
//     try {
//       const timestamp = Date.now();
      
//       // Determine the public Documents directory path
//       const documentsDirectory = Platform.OS === 'ios'
//         ? `${RNFS.DocumentDirectoryPath}/UmboBooks`
//         : `${RNFS.ExternalStorageDirectoryPath}/Documents/UmboBooks`;
  
//       // Check if the "UmboBooks" directory exists, and create it if it doesn't
//       const directoryExists = await RNFS.exists(documentsDirectory);
//       if (!directoryExists) {
//         await RNFS.mkdir(documentsDirectory);
//       }
  
//       // Set the output path to the public directory
//       const outputWavPath = `${documentsDirectory}/audio_${timestamp}.wav`;
//       const command = `-i ${inputPath} ${outputWavPath}`;
  
//       const session = await FFmpegKit.execute(command);
//       const returnCode = await session.getReturnCode();
  
//       if (returnCode.isValueSuccess()) {
//         console.log('Conversion to WAV successful');
//         return outputWavPath; // Return the public path of the .wav file
//       } else {
//         console.log('Conversion failed');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error during conversion:', error);
//       return null;
//     }
//   };




//   const stopRecording = async () => {
//     if (!isRecording) {
//       console.warn('Not recording!');
//       return;
//     }

//     setIsRecording(false);
//     const result = await audioRecorderPlayer.stopRecorder();
//     audioRecorderPlayer.removeRecordBackListener();
//     setAudioFile(result);
//     console.log('Stop recording result: ', result);
//     const a = await convertToWav(result);
//     console.log(a,"hello")
//   };

//   const playRecording = async () => {
//     if (isPlaying) {
//       console.warn('Already playing!');
//       return;
//     }

//     if (!audioFile) {
//       Alert.alert("Warning", "No Audio file to play");
//       return;
//     }

//     setIsPlaying(true);
//     const msg = await audioRecorderPlayer.startPlayer(wavFilePath);
//     audioRecorderPlayer.addPlayBackListener((e) => {
//       if (e.currentPosition === e.duration) {
//         console.log('Finished playing');
//         audioRecorderPlayer.stopPlayer();
//         audioRecorderPlayer.removePlayBackListener();
//         setIsPlaying(false);
//       }
//     });

//     console.log('Playing result: ', msg);
//   };

//   const deleteAudio = () =>{
//         console.log('Finished playing');
//         audioRecorderPlayer.stopPlayer();
//         audioRecorderPlayer.removePlayBackListener();
//         setAudioFile(null)
//         setIsPlaying(false);
//         setWavFilePath(null)
//   }

//   const saveRecording = async () => {
//     if (!audioFile) {
//       console.warn('No audio file to save!');
//       return;
//     }
  
//     const appFolder = `${RNFS.DocumentDirectoryPath}/UmboBooks`;
  
//     // Check if the folder exists, if not, create it
//     if (!(await RNFS.exists(appFolder))) {
//       await RNFS.mkdir(appFolder);
//     }
  
//     const destPath = `${appFolder}/test.mp3`;
  
//     try {
//       await RNFS.copyFile(audioFile, destPath);
//       console.warn('Audio file saved as MP3:', destPath);
//     } catch (error) {
//       console.warn('Failed to save audio file:', error);
//     }
//   };
  

//   const downloadFile = async () => {
//     const url = 'https://file-examples.com/storage/fe44eeb9cb66ab8ce934f14/2017/11/file_example_MP3_700KB.mp3';
//     const appFolder = `${RNFS.DownloadDirectoryPath}/UmboBooks`;

//     // Check if the folder exists, if not, create it
//     if (!(await RNFS.exists(appFolder))) {
//       await RNFS.mkdir(appFolder);
//     }

//     const filePath = `${appFolder}/downloaded_file_${Date.now()}.mp3`;

//     try {
//       const downloadResult = await RNFS.downloadFile({
//         fromUrl: url,
//         toFile: filePath,
//       }).promise;

//       if (downloadResult.statusCode === 200) {
//         Alert.alert("File Downloaded successfully", filePath)
//       } else {
//         console.warn('Failed to download file');
//       }
//     } catch (error) {
//       console.warn('Error downloading file:', error);
//     }
//   };

//    // Read and encrypt file
//   //  const readAndEncryptFile = async (path, key) => {
//   //   try {
//   //     const fileData = await RNFS.readFile(path, 'base64');
//   //     const encryptedData = CryptoJS.AES.encrypt(fileData, key).toString();
//   //     return encryptedData;
//   //   } catch (error) {
//   //     console.error('Error reading/encrypting file:', error);
//   //     throw error;
//   //   }
//   // };

//    // Send file to IoT device
//   //  const sendFileToDevice = async (encryptedData, deviceIp) => {
//   //   try {
//   //     setLoader(true)
//   //     await axios.post(`http://${deviceIp}/upload`, { file: encryptedData, });
//   //     Alert.alert('File sent successfully');
//   //   } catch (error) {
//   //     // console.error('Error sending file to device:', error);
//   //     Alert.alert('Failed to send file to device',error.message);
//   //     console.log(error,"error")
//   //   }
//   // };


//   const readAndEncryptFile = async (path, key) => {
//     try {
//       const fileData = await RNFS.readFile(path, 'base64');
//       const encryptedData = CryptoJS.AES.encrypt(fileData, key).toString();
//       const encryptedPath = `${RNFS.CachesDirectoryPath}/encrypted.mp3`;
//       await RNFS.writeFile(encryptedPath, encryptedData, 'base64');
//       return encryptedPath;
//     } catch (error) {
//       console.error('Error reading/encrypting file:', error);
//       throw error;
//     }
//   };

//   const sendFileToDevice = async (encryptedData, deviceIp) => {
//     setLoader(true)
//     // console.log(wavFilePath,'I am audioFile')
//     // return
//     try {
//       const formData = new FormData();
//       formData.append('file', {
//         // uri: `data:application/octet-stream;base64,${encryptedData}`,
//         // uri:`file:///${encryptedData}`,
//         // uri:`file:///${wavFilePath}`,
//         uri:`${wavFilePath}`,
//         name: `sound_${Date.now()}.wav`,
//         type: 'audio/wav',
//       });
//       // console.log(`file:///${encryptedData}`,audioFile,'encryptedData')
//       // const response = await axios.post(`http://${deviceIp}/posts`, formData, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data',
//       //     // 'Content-Type': 'application/json',
//       //   },
//       //   timeout:60000,
//       // });

//       // if (response.status === 200) {
//       //   Alert.alert('File sent successfully',response.data.status);
//       // } else {
//       //   Alert.alert(`Failed to send file. Status code: ${response.status}`);
//       // }


//       // RNFetchBlob.fetch('POST', `http://${deviceIp}/posts`, {
//       //   'Content-Type': 'multipart/form-data',
//       // }, [
//       //   { name: 'file', filename: `sound_${Date.now()}.wav`, data: RNFetchBlob.wrap(wavFilePath)},
//       // ]).then((resp) => {
//       //   Alert.alert('File sent successfully');
//       //   console.log('File upload response: ', resp);
//       // }).catch((err) => {
//       //   console.error('File upload error: ', err);
//       // });



//       const fileData = await RNFS.readFile(wavFilePath, 'base64'); 
//       const binaryData = Buffer.from(fileData, 'base64'); 

//       const client = TcpSocket.createConnection({ host: deviceIp, port: 80 }, () => {
//         console.log('Connected to ESP32!');

//         // Send the binary data over the socket
//         client.write(binaryData);

//         // Close the connection
//         client.destroy();
//         console.log('File sent successfully');
//       });

//       client.on('data', (data) => {
//         console.log('Response from ESP32:', data.toString());
//       });

//       client.on('error', (error) => {
//         console.error('Connection error:', error);
//       });

//       client.on('close', () => {
//         console.log('Connection closed');
//       });
  

//     } catch (error) {
//       Alert.alert('Failed to send file to device', );
//       console.log(error.message, "error");
//     }
//     finally{
//       setLoader(false)
//     }
//   };







//   const handleFileTransfer = async () =>{
//     try {
//       const encryptedData = await readAndEncryptFile(audioFile, secretKey);
//       const deviceIp = '192.168.89.161'; // Replace with your IoT device IP address
//       await sendFileToDevice(encryptedData, deviceIp);
//     } catch (error) {
//       Alert.alert('File transfer failed',error?.message);
//     }
//     finally{
//       setLoader(false)
//     }
//   }





//   // const sendData = async () => {
//   //   const myHeaders = new Headers();
//   //   myHeaders.append('Content-Type', 'application/json');

//   //   const raw = JSON.stringify({
//   //     Cmd: '0x01',
//   //     Timer: timer.toString(),
//   //     Style: style,
//   //     Speed: speed,
//   //   });

//   //   const requestOptions = {
//   //     method: 'POST',
//   //     headers: myHeaders,
//   //     body: raw,
//   //     redirect: 'follow',
//   //   };

//   //   try {
//   //     const response = await fetch('http://192.168.4.1/post', requestOptions);

//   //     if (response.ok) {
//   //       const result = await response.text();
//   //       Alert.alert('Success', 'Patting device started.');
//   //       setIsStarted(true);
//   //     } else {
//   //       const errorText = await response.text();
//   //       Alert.alert('Error', `Failed to send data: ${errorText}`);
//   //     }
//   //   } catch (error) {
//   //     Alert.alert('Error', 'Failed to send data: ' + error.message);
//   //   }
//   // };




//   if (!hasPermission) {
//     return <Text>No access to microphone or storage</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={[styles.button,isRecording && { backgroundColor:'black' }]}>
//         <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
//       </TouchableOpacity>
//      {
//       audioFile && !isRecording &&
//      <TouchableOpacity onPress={playRecording} style={[styles.button, ]}>
//         <Text style={styles.buttonText}>Play Recording</Text>
//       </TouchableOpacity>}

//       {
//         audioFile && !isRecording &&
//         <TouchableOpacity onPress={handleFileTransfer} style={styles.button}>
//         <Text style={styles.buttonText}>Send Audio to Doll</Text>
//       </TouchableOpacity>
//       }

//       {
//         audioFile && !isRecording &&
//         <TouchableOpacity onPress={deleteAudio} style={[styles.button,{backgroundColor:'red'}]}>
//         <Text style={styles.buttonText}>Delete Audio</Text>
//       </TouchableOpacity>
//       }

//       {
//         loader && 
//         <ActivityIndicator size={'large'}  color={'black'} />
//       }

//       {/* <TouchableOpacity onPress={saveRecording} style={styles.button}>
//         <Text style={styles.buttonText}>Save Recording</Text>
//       </TouchableOpacity> */}
//       {/* <TouchableOpacity onPress={downloadFile} style={styles.button}>
//         <Text style={styles.buttonText}>Download File</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// export default AudioRecorderPlayerComponent;


// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',
//     rowGap:20,
//     backgroundColor:'white'
//   },
//   button:{
//     backgroundColor:'green',
//     width:'90%',
//     paddingVertical:10,
//     marginLeft:'2%',
//     paddingHorizontal:16,
//     alignItems:'center'
//   },
//   buttonText:{
//     color:'white'
//   }
// })




import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, PermissionsAndroid, Linking, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CryptoJS from 'crypto-js';
import RNFetchBlob from 'rn-fetch-blob';
// import WifiManager from 'react-native-wifi-reborn';
import axios from 'axios';
import {Buffer} from 'buffer';

const audioRecorderPlayer = new AudioRecorderPlayer();
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import TcpSocket from 'react-native-tcp-socket';

// import {
//   initialize,
//   startDiscoveringPeers,
//   connect,
//   sendFile,
//   subscribeOnPeersUpdates,
// } from 'react-native-wifi-p2p';

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
  const [devices, setDevices] = useState([]);
  const peersUpdatesSubscription = useRef(null);

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
    try {
      const timestamp = Date.now();
      
      // Determine the public Documents directory path
      const documentsDirectory = Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/UmboBooks`
        : `${RNFS.ExternalStorageDirectoryPath}/Documents/UmboBooks`;
  
      // Check if the "UmboBooks" directory exists, and create it if it doesn't
      const directoryExists = await RNFS.exists(documentsDirectory);
      if (!directoryExists) {
        await RNFS.mkdir(documentsDirectory);
      }
  
      // Set the output path to the public directory
      const outputWavPath = `${documentsDirectory}/audio_new.wav`;
      const command = `-i ${inputPath} ${outputWavPath}`;
  
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();
  
      if (returnCode.isValueSuccess()) {
        console.log('Conversion to WAV successful');
        return outputWavPath; // Return the public path of the .wav file
      } else {
        console.log('Conversion failed');
        return null;
      }
    } catch (error) {
      console.error('Error during conversion:', error);
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


  // const readAndEncryptFile = async (path, key) => {
  //   try {
  //     const fileData = await RNFS.readFile(path, 'base64');
  //     const encryptedData = CryptoJS.AES.encrypt(fileData, key).toString();
  //     const encryptedPath = `${RNFS.CachesDirectoryPath}/encrypted.mp3`;
  //     await RNFS.writeFile(encryptedPath, encryptedData, 'base64');
  //     return encryptedPath;
  //   } catch (error) {
  //     console.error('Error reading/encrypting file:', error);
  //     throw error;
  //   }
  // };

  // const sendFileToDevice = async (wavFilePath, deviceIp) => {
  //   setLoader(true);
  
  //   try {
  //     const fileData = await RNFS.readFile(wavFilePath, 'base64'); 
  //     const binaryData = Buffer.from(fileData, 'base64'); 
  
  //     // Create start and end markers
  //     //const startMarker = Buffer.from("ST");
  //     const endMarker = Buffer.from("ND");
  
  //     // Combine markers with file data
  //     const dataToSend = Buffer.concat([binaryData, endMarker]);
  
  //     const client = TcpSocket.createConnection({ host: deviceIp, port: 80 }, () => {
  //       console.log('Connected to ESP32!');
  
  //       // Send the binary data with markers over the socket
  //       client.write(dataToSend);
  
  //       // Close the connection
  //       client.destroy();
  //       console.log('File sent successfully');
  //     });
  
  //     client.on('data', (data) => {
  //       console.log('Response from ESP32:', data.toString());
  //     });
  
  //     client.on('error', (error) => {
  //       console.error('Connection error:', error);
  //     });
  
  //     client.on('close', () => {
  //       console.log('Connection closed');
  //     });
  
  //   } catch (error) {
  //     Alert.alert('Failed to send file to device', error.message);
  //     console.log(error, "error");
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  async function sendChunk(client, chunk) {
    return new Promise((resolve, reject) => {
      let totalSent = 0;
  
      function sendNextPart() {
        if (totalSent < chunk.length) {
          const sent = client.write(chunk.slice(totalSent), (error) => {
            if (error) {
              reject(error);
            } else {
              totalSent += sent;
              sendNextPart(); // Send the next part of the chunk
            }
          });
        } else {
          resolve(totalSent);
        }
      }
  
      sendNextPart(); // Start sending the chunk
    });
  }

  // const readAndEncryptFile = async (path, key) => {
  //   try {
  //     const fileData = await RNFS.readFile(path, 'base64');
  //     const encryptedData = CryptoJS.AES.encrypt(fileData, key).toString();
  //     const encryptedPath = `${RNFS.CachesDirectoryPath}/encrypted.mp3`;
  //     await RNFS.writeFile(encryptedPath, encryptedData, 'base64');
  //     return encryptedPath;
  //   } catch (error) {
  //     console.error('Error reading/encrypting file:', error);
  //     throw error;
  //   }
  // };

  const sendFileToDevice = async (wavFilePath, deviceIp) => {
    setLoader(true);
  
  try {
  const fileData = await RNFS.readFile(wavFilePath, 'base64');
  const binaryData = Buffer.from(fileData, 'base64');
  
  // Split the data into chunks of 4096 bytes
  const chunkSize = 4096;
  let offset = 0;

  const client = TcpSocket.createConnection({
    host: deviceIp,
    port: 80,
    keepAlive: true,
    timeout: 90000, // Adjust the timeout value
    noDelay: true,  // Disable Nagle's algorithm
  }, () => {
    console.log('Connected to ESP32!');

    const sendNextChunk = () => {
      if (offset < binaryData.length) {
        const end = Math.min(offset + chunkSize, binaryData.length);
        const chunk = binaryData.slice(offset, end);

        // Send the chunk
        client.write(chunk);

        // Wait for "OK" response
        client.once('data', (data) => {
          if (data.toString().trim() === 'OK' || data.toString().trim() === 'OKOK') {
            console.log('Chunk acknowledged, sending next chunk');
            offset = end;
            sendNextChunk();  // Send the next chunk
          } else {
            console.error('Unexpected response:', data.toString());
          }
        });
      } else {
        // All data sent, now send the end marker
        client.write(Buffer.from("ND"));
        console.log('File sent successfully');
        client.destroy();  // Close the connection
      }
    };

    // Start sending the first chunk
    sendNextChunk();
  });

    client.on('error', (error) => {
      console.error('Connection error:', error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });

  } catch (error) {
    Alert.alert('Failed to send file to device', error.message);
    console.log(error, "error");
  } finally {
    setLoader(false);
  }
  };

  // const connectAndSendFile = async () => {
  //   if (devices.length === 0) {
  //     console.log('No devices found');
  //     return;
  //   }

  //   try {
  //     // Connect to the first available device
  //     await connect(devices[0].deviceAddress);
  //     console.log('Successfully connected');

  //     const filePath = '/path/to/your/audiofile.wav'; // Replace with the actual file path

  //     // Request storage permissions
  //     await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Access to read storage',
  //         message: 'READ_EXTERNAL_STORAGE',
  //       }
  //     );

  //     // Send the file
  //     const metaInfo = await sendFile(filePath);
  //     console.log('File sent successfully', metaInfo);
  //   } catch (err) {
  //     console.error('Error in connection or file sending:', err);
  //   }
  // };

  // console.log("devices ",devices);

  const handleFileTransfer = async () =>{
    try {
      // Determine the public Documents directory path
      const documentsDirectory2 = Platform.OS === 'ios'
      ? `${RNFS.DocumentDirectoryPath}/UmboBooks`
      : `${RNFS.ExternalStorageDirectoryPath}/Documents/UmboBooks`;
      const outputWavPath2 = `${documentsDirectory2}/audio_new.wav`;
      console.log("file path to send ",outputWavPath2)

      //const encryptedData = await readAndEncryptFile(audioFile, secretKey);
      const deviceIp = '192.168.89.162'; // Replace with your IoT device IP address
      await sendFileToDevice(outputWavPath2, deviceIp);
    } catch (error) {
      console.log("test ",error.response.data);
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