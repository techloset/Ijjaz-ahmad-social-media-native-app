import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import ImagePickerBtn from '../ImagePickerBtn/ImagePickerBtn';
import {Colors} from '../../constants/Colors';

type BottomModelProps = {
  isModalVisible: boolean;
  onRequestClose: () => void;
  onPress: () => void;
};

export default function BottomModel({
  isModalVisible,
  onRequestClose,
  onPress,
}: BottomModelProps) {
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible} // Ensure modal visibility is controlled by props
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        activeOpacity={1} // Prevents touch events from passing through
        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onPress={onPress} // Close modal when overlay is tapped
      >
        <View
          style={{
            backgroundColor: Colors.white,
            position: 'absolute',
            width: '100%',
            height: '25%',
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          }}>
          <ImagePickerBtn />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
