import React, {useEffect, useRef} from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {Colors, Fonts, Icons} from '../../assets';
import {FontSize, UtilityMethods} from '../../utility';

const FileTransferModal = ({
  isVisible,
  progress,
  type, // 'upload' | 'download'
  fileName,
  onCancel,
}) => {
  const isComplete = (progress || 0) >= 1;
  const dismissTimer = useRef(null);

  // Auto-dismiss after completion
  useEffect(() => {
    if (isComplete && isVisible) {
      dismissTimer.current = setTimeout(() => {
        onCancel?.();
      }, 1500);
    }
    return () => {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, [isComplete, isVisible, onCancel]);

  const titleText = isComplete
    ? type === 'upload'
      ? 'Upload Complete'
      : 'Download Complete'
    : type === 'upload'
    ? 'Uploading'
    : 'Downloading';

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={[
              styles.iconContainer,
              isComplete && styles.iconContainerComplete,
            ]}>
            {type === 'upload' ? (
              <Icons.UploadIcon
                width={UtilityMethods.wp(8)}
                height={UtilityMethods.wp(8)}
              />
            ) : (
              <Icons.DownloadIcon
                width={UtilityMethods.wp(8)}
                height={UtilityMethods.wp(8)}
              />
            )}
          </View>

          <Text style={styles.title}>{titleText}</Text>

          <Text style={styles.fileName} numberOfLines={1}>
            {fileName}
          </Text>

          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={progress || 0}
              width={UtilityMethods.wp(60)}
              color={isComplete ? Colors.parotGreen : Colors.BLACK}
              unfilledColor={Colors.LIGHT_GRAY}
              borderWidth={0}
              height={UtilityMethods.hp(1)}
              borderRadius={UtilityMethods.wp(1)}
            />
          </View>

          <Text
            style={[
              styles.percentage,
              isComplete && styles.percentageComplete,
            ]}>
            {Math.round((progress || 0) * 100)}%
          </Text>

          {!isComplete && (
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(4),
    padding: UtilityMethods.wp(6),
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.MEDIUM_GRAY,
    padding: UtilityMethods.wp(4),
    borderRadius: UtilityMethods.wp(6),
    marginBottom: UtilityMethods.hp(2),
  },
  iconContainerComplete: {
    backgroundColor: Colors.parotGreen + '20',
  },
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(18),
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(1),
  },
  fileName: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
    marginBottom: UtilityMethods.hp(2),
    maxWidth: '90%',
  },
  progressContainer: {
    marginVertical: UtilityMethods.hp(1),
  },
  percentage: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(24),
    color: Colors.BLACK,
    marginTop: UtilityMethods.hp(1),
  },
  percentageComplete: {
    color: Colors.parotGreen,
  },
  cancelButton: {
    marginTop: UtilityMethods.hp(2.5),
    paddingVertical: UtilityMethods.hp(1.2),
    paddingHorizontal: UtilityMethods.wp(8),
    borderRadius: UtilityMethods.wp(2),
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  cancelButtonText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
  },
});

export default FileTransferModal;
