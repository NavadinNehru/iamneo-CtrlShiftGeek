import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

const ThreeDotModal = ({ modalVisible, toggleModal, optionList }) => {
  const closeModal = () => {
    toggleModal(false);
  };
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay} className="" >
          <TouchableWithoutFeedback>
            <View className="rounded-[4px]" style={styles.modalContainer}>
              {optionList.map((option, index) => (
                <TouchableOpacity key={index} style={styles.optionButton} onPress={() => {
                  option.action();
                  closeModal();
                }}>
                  <Text className="text-[14px] font-[400] leading-[20px] px-3 py-1 bg-white" style={[styles.optionText,styles.font]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
    font: {
        fontFamily: 'Helvetica Neue',
      },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
    paddingRight: 10,
  },
  modalContainer: {
    justifyContent:'center',
    backgroundColor: 'white',
    // borderRadius: 8,
    // paddingVertical: 10,
    shadowColor: '#939CA3', // Equivalent to rgba(147, 156, 163, 0.36)
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.36,
    shadowRadius: 2,
    elevation: 4, // For Android
    // Additional shadow for the second part
    shadowColor: '#939CA3', // Equivalent to rgba(147, 156, 163, 0.12)
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  optionButton: {
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // backgroundColor: 'white',
  },
  optionText: {
    color:'#08090A',
  },
});

export default ThreeDotModal;
