import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const FileListModal = ({
  isVisible,
  onClose,
  files,
  isLoading,
  onUpload,
  onDownload,
  onDelete,
  onRefresh,
}) => {
  const renderFile = ({ item }) => (
    <View style={styles.fileItem}>
      <View style={styles.fileInfo}>
        <View style={styles.fileIconContainer}>
          <Icons.MicIcon width={UtilityMethods.wp(5)} height={UtilityMethods.wp(5)} />
        </View>
        <View style={styles.fileText}>
          <Text style={styles.fileName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.fileSize}>{formatFileSize(item.size)}</Text>
        </View>
      </View>
      <View style={styles.fileActions}>
        <TouchableOpacity
          onPress={() => onDownload(item)}
          style={styles.actionBtn}
        >
          <Icons.DownloadIcon
            width={UtilityMethods.wp(5)}
            height={UtilityMethods.wp(5)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item)}
          style={styles.actionBtn}
        >
          <Icons.DeleteBlackIcon
            width={UtilityMethods.wp(5)}
            height={UtilityMethods.wp(5)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No files on device</Text>
      <Text style={styles.emptySubtext}>
        Upload audio files to transfer them to your MyHero device
      </Text>
    </View>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.title}>Device Files</Text>
                <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
                  <Icons.Reload
                    width={UtilityMethods.wp(5)}
                    height={UtilityMethods.wp(5)}
                  />
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={Colors.BLACK} />
                  <Text style={styles.loadingText}>Loading files...</Text>
                </View>
              ) : (
                <FlatList
                  data={files}
                  renderItem={renderFile}
                  keyExtractor={(item, index) => item.name + index}
                  ListEmptyComponent={renderEmptyList}
                  style={styles.fileList}
                  contentContainerStyle={styles.fileListContent}
                />
              )}

              <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
                <Icons.UploadIcon
                  width={UtilityMethods.wp(5)}
                  height={UtilityMethods.wp(5)}
                />
                <Text style={styles.uploadButtonText}>Upload Audio File</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(3),
    padding: UtilityMethods.wp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: UtilityMethods.hp(2),
  },
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(18),
    color: Colors.BLACK,
  },
  refreshBtn: {
    padding: UtilityMethods.wp(2),
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(4),
  },
  loadingText: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
    marginTop: UtilityMethods.hp(1),
  },
  fileList: {
    maxHeight: UtilityMethods.hp(35),
  },
  fileListContent: {
    paddingBottom: UtilityMethods.hp(1),
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(1.5),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIconContainer: {
    backgroundColor: Colors.MEDIUM_GRAY,
    padding: UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(2),
    marginRight: UtilityMethods.wp(3),
  },
  fileText: {
    flex: 1,
  },
  fileName: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
  },
  fileSize: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(12),
    color: Colors.GRAY,
    marginTop: UtilityMethods.hp(0.3),
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    padding: UtilityMethods.wp(2),
    marginLeft: UtilityMethods.wp(1),
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(4),
  },
  emptyText: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
  },
  emptySubtext: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(12),
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: UtilityMethods.hp(1),
    paddingHorizontal: UtilityMethods.wp(4),
  },
  uploadButton: {
    marginTop: UtilityMethods.hp(2),
    backgroundColor: Colors.BLACK,
    paddingVertical: UtilityMethods.hp(1.5),
    borderRadius: UtilityMethods.wp(2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(14),
    color: Colors.WHITE,
    marginLeft: UtilityMethods.wp(2),
  },
  closeButton: {
    marginTop: UtilityMethods.hp(1.5),
    paddingVertical: UtilityMethods.hp(1.5),
    borderRadius: UtilityMethods.wp(2),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  closeButtonText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
  },
});

export default FileListModal;
