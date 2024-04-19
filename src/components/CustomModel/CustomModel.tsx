import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { customStyles } from '../../screens/FrontendStyle'
import { CrossIcon, Delete } from '../../constants/Images'
import { Colors } from '../../constants/Colors'
import useCustomModel from './useCustomModel'

export default function CustomModel() {
 const {
    isModalVisible,
    postId,
    modalImg,
    toggleModal,
  } = useCustomModel();

  return (
    <View style={customStyles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={[customStyles.modalContainer, { backgroundColor: Colors.inputbg }]}>
            <TouchableOpacity onPress={toggleModal} style={customStyles.closeButton}>
              <CrossIcon />
            </TouchableOpacity>
            <Image source={{ uri: modalImg }} style={customStyles.fullScreenProfileImg} />
          </View>
          <TouchableOpacity  style={{ position: "absolute", top: 10, left: 30, }}>
            <Delete width={24} />
          </TouchableOpacity>
        </Modal>
      </View>
  )
}