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

const ScanningModal = ({
  isVisible,
  onClose,
  isScanning,
  devices,
  onSelectDevice,
  onStopScan,
  onStartScan,
}) => {
  const renderDevice = ({ item }) => (
    <TouchableOpacity
      onPress={() => onSelectDevice(item)}
      style={styles.deviceItem}
    >
      <View style={styles.deviceInfo}>
        <View style={styles.deviceIconContainer}>
          <Icons.doll width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
        </View>
        <View style={styles.deviceText}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceRssi}>Signal: {item.rssi} dBm</Text>
        </View>
      </View>
      <Icons.RightArrow width={UtilityMethods.wp(4)} height={UtilityMethods.wp(4)} />
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No devices found</Text>
      <Text style={styles.emptySubtext}>
        Make sure your MyHero device is powered on and nearby
      </Text>
    </View>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Add New Device</Text>

              {isScanning ? (
                <View style={styles.scanningContainer}>
                  <ActivityIndicator size="large" color={Colors.BLACK} />
                  <Text style={styles.scanningText}>
                    Scanning for MyHero devices...
                  </Text>
                  <TouchableOpacity
                    style={styles.stopButton}
                    onPress={onStopScan}
                  >
                    <Text style={styles.stopButtonText}>Stop Scanning</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <FlatList
                    data={devices}
                    renderItem={renderDevice}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={renderEmptyList}
                    style={styles.deviceList}
                    contentContainerStyle={styles.deviceListContent}
                  />
                  <TouchableOpacity
                    style={styles.scanButton}
                    onPress={onStartScan}
                  >
                    <Text style={styles.scanButtonText}>Scan Again</Text>
                  </TouchableOpacity>
                </>
              )}

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
    maxHeight: '70%',
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(3),
    padding: UtilityMethods.wp(4),
  },
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(18),
    textAlign: 'center',
    marginBottom: UtilityMethods.hp(2),
    color: Colors.BLACK,
  },
  scanningContainer: {
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(4),
  },
  scanningText: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
    marginTop: UtilityMethods.hp(2),
    marginBottom: UtilityMethods.hp(2),
  },
  stopButton: {
    backgroundColor: Colors.LIGHT_GRAY,
    paddingVertical: UtilityMethods.hp(1),
    paddingHorizontal: UtilityMethods.wp(6),
    borderRadius: UtilityMethods.wp(2),
  },
  stopButtonText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
  },
  deviceList: {
    maxHeight: UtilityMethods.hp(30),
  },
  deviceListContent: {
    paddingBottom: UtilityMethods.hp(1),
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(1.5),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIconContainer: {
    backgroundColor: Colors.MEDIUM_GRAY,
    padding: UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(2),
    marginRight: UtilityMethods.wp(3),
  },
  deviceText: {
    flex: 1,
  },
  deviceName: {
    fontFamily: Fonts.SEMI_BOLD,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
  },
  deviceRssi: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(12),
    color: Colors.GRAY,
    marginTop: UtilityMethods.hp(0.3),
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
  scanButton: {
    marginTop: UtilityMethods.hp(2),
    backgroundColor: Colors.BLACK,
    paddingVertical: UtilityMethods.hp(1.5),
    borderRadius: UtilityMethods.wp(2),
    alignItems: 'center',
  },
  scanButtonText: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(14),
    color: Colors.WHITE,
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

export default ScanningModal;
