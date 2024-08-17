import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { UtilityMethods, FontSize } from '../../utility';
import { Colors, Fonts, Icons } from '../../assets';
import MaterialDropDown from '../MaterialDropDown';
import { menu } from '../../Data/DummyData';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioPlayComponent = ({ audioUri, user }) => {
    const [loader, setLoader] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPositionSec, setCurrentPositionSec] = useState(0);
    const [currentDurationSec, setCurrentDurationSec] = useState(0);
    const [playTime, setPlayTime] = useState('00:00');
    const [durationTime, setDurationTime] = useState('00:00');

    useEffect(() => {
        getAudioDuration()
    }, [audioUri])




    const formatToMMSS = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes ? minutes : '00'}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const getAudioDuration = async () => {
        try {
            await audioRecorderPlayer.startPlayer(audioUri);
            audioRecorderPlayer.addPlayBackListener((e) => {
                if (e.duration > 0) {
                    setCurrentDurationSec(e.duration);
                    setDurationTime(formatToMMSS(e.duration));
                    audioRecorderPlayer.stopPlayer();
                    audioRecorderPlayer.removePlayBackListener();

                    setLoader(false)
                }
            });
        } catch (error) {
            console.error('Error getting audio duration:', error);
        }

    };

    const onStartPlay = async () => {
        await audioRecorderPlayer.startPlayer(audioUri);

        audioRecorderPlayer.addPlayBackListener((e) => {
            setCurrentPositionSec(e.currentPosition);
            setPlayTime(formatToMMSS(e.currentPosition));
            setCurrentDurationSec(e.duration);

            if (e.currentPosition === e.duration) {
                onPausePlay();
            }
        });

        setIsPlaying(true);
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
        setIsPlaying(false);
    };

    const onSeek = async (value) => {
        await audioRecorderPlayer.seekToPlayer(value);
        setCurrentPositionSec(value);
        setPlayTime(formatToMMSS(value));
    };



    const onPressMenu = () => {

    }

    return (
        <View style={styles.container}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.content}>
                <Text style={styles.userName}>{user.name}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={currentDurationSec}
                    value={currentPositionSec}
                    onValueChange={onSeek}
                    minimumTrackTintColor={Colors.BLACK}
                    maximumTrackTintColor={Colors.LIGHT_COLOR}
                    thumbTintColor={Colors.SECONDARY}

                />
                <Text style={styles.time}>{playTime}</Text>
            </View>
            <View style={styles.controls}>
                {
                    loader ?
                        <View style={styles.playIcons}>
                            <ActivityIndicator size={'small'} color={Colors.BLACK} />
                        </View>
                        :
                        <View style={styles.playIcons}>
                            <TouchableOpacity onPress={isPlaying ? onPausePlay : onStartPlay} style={styles.playIconInner}>
                                {
                                    isPlaying ? (
                                        <Icons.PauseAudio width={24} height={24} />
                                    ) : (
                                        <Icons.PlayAudio width={24} height={24} />
                                    )}
                            </TouchableOpacity>
                            <Text style={styles.duration}>{durationTime}</Text>
                        </View>
                }

                <MaterialDropDown
                    menuData={menu}
                    onPress={onPressMenu}
                    onRequestClose={() => {
                        console.log("close")
                    }}
                />

            </View>
        </View>
    );
};

export default AudioPlayComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: UtilityMethods.wp(2),
        borderRadius: UtilityMethods.wp(2),
        marginBottom: UtilityMethods.hp(2),
        borderWidth: 1,
        borderColor: Colors.BLUE_BORDER,
        position:'relative'
    },
    avatar: {
        width: UtilityMethods.wp(12),
        height: UtilityMethods.wp(12),
        borderRadius: UtilityMethods.wp(6),
        marginRight: UtilityMethods.wp(3),
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: FontSize.VALUE(12),
        fontFamily: Fonts.REGULAR,
        color: Colors.BLACK,
    },
    slider: {
        width: UtilityMethods.wp(55),
        height: Platform.OS === 'android' ? UtilityMethods.hp(2) : UtilityMethods.hp(1),

    },
    time: {
        fontSize: FontSize.VALUE(12),
        fontFamily: Fonts.REGULAR,
        color: Colors.BLACK,
        width: Platform.OS === 'android' ? UtilityMethods.wp(52) : UtilityMethods.wp(55),
        textAlign: 'right'
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        width: UtilityMethods.wp(20),
        justifyContent: 'space-between',
        position:'relative'
    },
    playIcons: {
        justifyContent: 'center',
        alignItems: 'center',
        width: UtilityMethods.wp(15),
    },
    playIconInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    duration: {
        marginLeft: UtilityMethods.wp(2),
        fontSize: FontSize.VALUE(14),
        fontFamily: Fonts.REGULAR,
        color: Colors.BLACK,
    },
});
