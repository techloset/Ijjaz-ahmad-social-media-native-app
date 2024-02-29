import React from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';
import { styles } from '../../../constants/GlobalStyle';
import { customStyles } from '../FrontendStyle';
import { Colors } from '../../../constants/Colors';
import { ArrowDown, CrossIcon, UploadButton } from '../../../constants/Images';
import useUploadPost from './useUploadPost'
export default function UploadPost() {
  const { isModalVisible, image, imageType, imageSize, loading, state, focusedText, setFocusedText, handleChange, handleCamra, handleGallery, uploadFile, handleCancel, toggleModal } = useUploadPost()
  return (
    <>
      <View style={[styles.flexRow, { backgroundColor: Colors.inputbg, padding: 13, }]}>
        <TouchableOpacity
          onPress={handleCancel}
          style={{ flexGrow: 1 }}
        >
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'cancel' ? 'red' : Colors.textclr, }
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFocusedText('edit')}
          style={{ flexGrow: 1.3 }}
        >
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              { color: focusedText === 'edit' ? 'blue' : Colors.textclr }
            ]}
          >
            Images <ArrowDown />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.flexContainer, styles.horizantalyCenter, { height: "100%" }]}>
        <ScrollView>
          <View style={{ marginVertical: 15 }}>
            {image ?
              <View>
                <Text>Type: {imageType}</Text>
                <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                <Text>Size: {imageSize} KB</Text>
              </View>
              : <TouchableOpacity
                onPress={toggleModal}
              >
                <UploadButton />
              </TouchableOpacity>}
          </View>
          <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", }}>
            <View>
              <Text>
                Post Description
              </Text>
              <TextInput
                style={[styles.formControl, { width: "100%" }]}
                placeholder='Add post description'
                placeholderTextColor={"#D1D3D4"}
                keyboardType='email-address'
                value={state.description}
                onChangeText={(value: string) => handleChange("description", value)}
              />
            </View>
            <View>
              <TouchableOpacity
                style={[customStyles.btn]}
                onPress={() => { uploadFile() }}
                disabled={loading}
              >
                <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>{loading ? "Uploading..." : "Upload"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[customStyles.container]}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={isModalVisible}
              onRequestClose={toggleModal}
            >
              <View style={[customStyles.modalContainer, customStyles.btn]}>
                <TouchableOpacity onPress={toggleModal} style={customStyles.closeButton}>
                  <CrossIcon />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    style={customStyles.btn}
                    onPress={() => { handleCamra() }}
                  >
                    <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Open Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={customStyles.btn}
                    onPress={() => { handleGallery() }}
                  >
                    <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Select from Gallery </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </>
  )
}
