import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, FlatList, Image, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Colors, Fonts,  } from '../../assets'; // assuming these are the paths
import { FontSize,UtilityMethods } from '../../utility'; // adjust this path to where your FontSize is stored

const SyncWithRecorderModal = ({ isVisible, onClose, data, onSync }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSync = () => {
    if (selectedId) {
      const selectedItem = data?.find(item => item._id === selectedId?._id);
      if(selectedItem.length === 0) return Alert.alert("Warning","No item selected...")
      onClose();
      onSync(selectedItem?.audioPath);
    }else{
      return Alert.alert("Warning","No Item selected...")
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedId(item)} style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item?.user?.avatar }} style={styles.avatar} />
        <Text style={styles.nameText}>{item?.user?.name}</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <View style={[styles.radioButton, selectedId?._id === item._id && styles.radioSelected]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Sync With Recorder</Text>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.flatListContent}
              />
              <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
                <Text style={styles.syncButtonText}>Sync With Recorder</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SyncWithRecorderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Backdrop
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(2),
    padding: UtilityMethods.wp(4),
  },
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(18),
    textAlign: 'center',
    marginBottom: UtilityMethods.hp(2),
    color: Colors.BLACK,
  },
  flatListContent: {
    paddingBottom: UtilityMethods.hp(2),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: UtilityMethods.hp(1.5),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: UtilityMethods.wp(12),
    height: UtilityMethods.wp(12),
    borderRadius: UtilityMethods.wp(6),
    marginRight: UtilityMethods.wp(3),
  },
  nameText: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
  },
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.GRAY,
    padding:UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(2.5),
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
  },
  radioButton: {
    width: UtilityMethods.wp(3),
    height: UtilityMethods.wp(3),
   
    borderRadius: UtilityMethods.wp(2.5),

  },
  radioSelected: {
    backgroundColor: Colors.BLACK,
    
  },
  syncButton: {
    marginTop: UtilityMethods.hp(2),
    backgroundColor: Colors.BLACK,
    paddingVertical: UtilityMethods.hp(1.5),
    borderRadius: UtilityMethods.wp(2),
    alignItems: 'center',
  },
  syncButtonText: {
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.VALUE(14),
    color: Colors.WHITE,
  },
});
