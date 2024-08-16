import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { UtilityMethods, FontSize,  } from '../../utility';
import { Colors, Icons,Fonts } from '../../assets';
import pickImage from '../../utility/cropImagePicker';

const AssetsUploaderComponent = ({ assets, setAssets }) => {

    const handlePickAssets = async () => {
        try {
            const pickedAssets = await pickImage(true);
            setAssets([...assets, ...pickedAssets]);
        } catch (error) {
            console.log('Error picking assets: ', error);
        }
    };

    const removeAsset = (index) => {
        const newAssets = [...assets];
        newAssets.splice(index, 1);
        setAssets(newAssets);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.uploadButton} onPress={handlePickAssets}>
                <Icons.UploadIcon />
                <Text style={styles.uploadText}>Upload photos & videos</Text>
            </TouchableOpacity>
            <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                {assets.map((asset, index) => (
                    <View key={index} style={styles.assetContainer}>
                        {asset.mime.startsWith('image/') ? (
                            <Image source={{ uri: asset.uri }} style={styles.asset} />
                        ) : (
                            <View style={styles.assetVideoContainer}>
                                <Video
                                    source={{ uri: asset.uri }}
                                    style={styles.asset}
                                    paused
                                    resizeMode="cover"
                                />
                                <View style={styles.playIcon}>
                                    <Icons.PlayIcon />
                                </View>
                            </View>
                        )}
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeAsset(index)}>
                            <Icons.RemoveIcon />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AssetsUploaderComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: UtilityMethods.wp(0.5),
        // backgroundColor: Colors.BACKGROUND_COLOR,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: UtilityMethods.wp(4),
        borderWidth: 1,
        borderColor: Colors.BLACK,
        borderStyle: 'dashed',
        borderRadius: UtilityMethods.wp(2),
        backgroundColor: Colors.LIGHT_BLUE,
        marginBottom: UtilityMethods.hp(2),
        marginHorizontal: UtilityMethods.wp(4)
    },
    uploadText: {
        marginLeft: UtilityMethods.wp(2),
        fontSize: FontSize.VALUE(16),
        fontFamily: Fonts.BOLD,
        color: Colors.BLACK,
    },
    scrollView: {
        paddingHorizontal: UtilityMethods.wp(4)
    },
    assetContainer: {
        position: 'relative',
        marginRight: UtilityMethods.wp(3),
    },
    assetVideoContainer: {
        width: UtilityMethods.wp(30),
        height: UtilityMethods.wp(20),
        borderRadius: UtilityMethods.wp(2),
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: Colors.BLACK,
    },
    asset: {
        width: UtilityMethods.wp(30),
        height: UtilityMethods.wp(20),
        borderRadius: UtilityMethods.wp(2),
    },
    playIcon: {
        position: 'absolute',
        width: UtilityMethods.wp(30),
        height: UtilityMethods.wp(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.TransParentBackground1,
    },
    removeButton: {
        position: 'absolute',
        top: UtilityMethods.wp(1),
        right: UtilityMethods.wp(1),
        backgroundColor: Colors.WHITE,
        borderRadius: UtilityMethods.wp(1),
        padding: UtilityMethods.wp(1),
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
