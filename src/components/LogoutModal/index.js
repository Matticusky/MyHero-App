import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Colors, Icons, Fonts } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const LogoutModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Icons.LogoutIcon />
          </View>
          <Text style={styles.title}>Logging Out</Text>
          <Text style={styles.message}>
            Are you sure that you want to Logout?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={[styles.buttonText, styles.confirmButtonText]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: UtilityMethods.wp(4),
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: FontSize.VALUE(20),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  message: {
    fontSize: UtilityMethods.hp(2),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
    textAlign: 'center',
    marginBottom: UtilityMethods.hp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: Colors.BLACK,
  },
  buttonText: {
    fontSize: UtilityMethods.hp(2),
    fontFamily: Fonts.REGULAR,
  },
  cancelButtonText: {
    color: Colors.BLACK,
  },
  confirmButtonText: {
    color: Colors.WHITE,
  },
});

export default LogoutModal;
