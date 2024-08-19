import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, BackHandler, Platform, Pressable } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { FontSize, UtilityMethods, } from '../../utility'; // Adjust the import paths based on your project structure
import { Colors, Fonts, Icons } from '../../assets';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
 
const audioRecorderPlayer = new AudioRecorderPlayer();


const formatToMMSS = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes ? minutes : '00'}:${seconds < 10 ? '0' : ''}${seconds}`;
};


const AudioRecordComponent = ({ onSave,recording, setRecording,paused, setPaused,recordingTime, setRecordingTime }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [recordTime, setRecordTime] = useState('00:00');
    const [audioFilePath, setAudioFilePath] = useState('');

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

    useEffect(()=>{
        async function initPermissions() {
            const hasAllPermissions = await checkPermissions();
            setHasPermission(hasAllPermissions);
          }
      
          initPermissions();
    })

    

    const onStartRecord = async () => {
        if(!hasPermission){
            return Alert.alert('Error', 'Please grant the necessary permissions to record audio');
        }

        try {
            if (!recording) {
                const result = await audioRecorderPlayer.startRecorder();
                setAudioFilePath(result);
                audioRecorderPlayer.addRecordBackListener((e) => {
                    setRecordTime(formatToMMSS(e.currentPosition));
                    setRecordingTime(e.currentPosition)
                });
                setRecording(true);
                setPaused(false);
            } 
            else if(paused){
                onResumeRecord();
            }
            else {
                onPauseRecord();
            }
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const onResumeRecord = async () => {
        try {
            const result = await audioRecorderPlayer.resumeRecorder();
            setPaused(false);
            console.log('Recording resumed:', result);
        } catch (error) {
            console.error('Failed to resume recording', error);
        }
    };

    const onPauseRecord = async () => {
        try {
            const result = await audioRecorderPlayer.pauseRecorder();
            setPaused(true);
            console.log('Recording paused:', result);
        } catch (error) {
            console.error('Failed to pause recording', error);
        }
    };

    const onStopRecord = async () => {
        try {
            await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setRecording(false);
            setPaused(false);
            onSave(audioFilePath); // Pass the file path to the parent
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };
 
    return (
        <View style={styles.container}>
              <Pressable style={styles.recordButton} onPress={onStartRecord}>
                {
                    recording && !paused ? 
                    <Icons.PauseIcon/>
                    :
                    <Icons.MicIcon/>
                }
            </Pressable>  
            <View style={styles.bottomBar}>
            {audioFilePath && (
                <Text style={styles.recordTime}>{recordTime}</Text>
            )}
          
                {audioFilePath && (
                    <TouchableOpacity style={styles.checkButton} onPress={onStopRecord}>
                        <Text style={styles.checkIcon}>Save</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BLACK,
        height:Platform.OS === 'android' ? UtilityMethods.hp(10) : UtilityMethods.hp(6),
        position:'relative'
    },
    recordButton: {
        backgroundColor: Colors.BLACK,
        width: UtilityMethods.wp(24),
        height: UtilityMethods.wp(24),
        borderRadius: UtilityMethods.wp(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.WHITE,
        position:'absolute',
        top:Platform.OS ==='android' ?-UtilityMethods.hp(6): -UtilityMethods.hp(6),
        left:UtilityMethods.wp(38)
    },
    recordIcon: {
        fontSize: FontSize.VALUE(30),
        color: Colors.WHITE,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: UtilityMethods.wp(10),
        alignItems: 'center',
        marginTop: UtilityMethods.hp(2),
    },
    recordTime: {
        fontSize: FontSize.VALUE(16),
        color: Colors.WHITE,
        fontFamily: Fonts.REGULAR,
    },
    checkButton: {
        backgroundColor: Colors.BLACK,
        // width: UtilityMethods.wp(10),
        height: UtilityMethods.wp(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        fontSize: FontSize.VALUE(20),
        color: Colors.WHITE,
    },
});

export default AudioRecordComponent;
