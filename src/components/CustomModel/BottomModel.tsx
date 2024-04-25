import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/colors';
import PageNavigateBtn from '../buttons/PageNavigateBtn';
import { BottomModelProps } from '../../constants/allTypes';

export default function BottomModel({
  isModalVisible,
  onRequestClose,
  onPress,
  handleGallery,
  handleCamra,
}: BottomModelProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1, backgroundColor: Colors.lineColor}}
        onPress={onPress}>
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
          <PageNavigateBtn label="Open Camera" onPress={handleCamra} />
          <PageNavigateBtn
            label=" Select from Gallery"
            onPress={handleGallery}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
