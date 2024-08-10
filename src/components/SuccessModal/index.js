import React from 'react';
import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Images, Icons } from '../../assets'; // Ensure to import your images and icons correctly
import { Button } from '../../components'; // Ensure Button is imported correctly
import { UtilityMethods, FontSize } from '../../utility';

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image source={Images.CHECK_MARK} style={styles.checkMark} />
          <Text style={styles.message}>Your attendance has been marked successfully.</Text>
          <Button
            text="Go to Home"
            Icon={<Icons.Right />}
            onPress={onClose}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: UtilityMethods.wp(80),
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(4),
    padding: UtilityMethods.wp(6),
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  checkMark: {
    width: UtilityMethods.wp(80),
    height: UtilityMethods.hp(20),
    resizeMode: 'contain',
    marginBottom: UtilityMethods.hp(2),
  },
  message: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    textAlign: 'center',
    marginBottom: UtilityMethods.hp(3),
  },
  button: {
    // backgroundColor: Colors.BLACK,
    // width: '100%',
    // paddingVertical: UtilityMethods.hp(1.5),
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default SuccessModal;
