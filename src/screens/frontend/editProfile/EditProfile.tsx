import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '../../../constants/GlobalStyle'
import { customStyles } from '../FrontendStyle'
import { Colors } from '../../../constants/Colors'
import { CrossIcon, User } from '../../../constants/Images'
import useEditProfile from './useEditProfile';
export default function EditProfile() {
  const { state, isModalVisible, image, focusedText, setFocusedText, handleChange, handleCamra, handleGallery, toggleModal, handleCancel, handleSubmite,loading } = useEditProfile()
  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.flexRow, styles.horizantalyBetween, { backgroundColor: Colors.inputbg, padding: 12 }]}>
        <TouchableOpacity
          onPress={handleCancel}
        >
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'cancel' ? 'red' : Colors.textclr }
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFocusedText('edit')}
        >
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              { color: focusedText === 'edit' ? 'blue' : Colors.textclr }
            ]}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        {
          loading? 
          <ActivityIndicator size="small" color={Colors.primary} />
          :<TouchableOpacity
          onPress={handleSubmite}
        >
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'done' ? 'green' : Colors.textclr }
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
        }
        
      </View>
      <ScrollView>
        <View style={[styles.horizantalyCenter]} >
          <View style={[styles.horizantalyCenter, { marginTop: 19 }]}>
            {
              !state.profileImage ?
                !image ?
                  <User width="86" height="86" style={customStyles.profileImg} />
                  :
                  <Image source={{ uri: image }} style={customStyles.profileImg} />
                :
                <Image source={{ uri: state.profileImage }} style={customStyles.profileImg} />
            }
            <View style={[styles.horizantalyCenter, customStyles.bio]}>
              {
                !state.profileImage ?
                  <TouchableOpacity
                    onPress={toggleModal}
                  >
                    <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingM, { color: Colors.primary }]}>Upload Profile Photo</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity
                    onPress={toggleModal}
                  >
                    <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingM, { color: Colors.primary }]}>Change Profile Photo</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Name</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="default"
              value={state.name}
              onChangeText={(value: string) => handleChange("name", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Username</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="default"
              value={state.username}
              onChangeText={(value: string) => handleChange("username", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Website</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="url"
              value={state.website}
              onChangeText={(value: string) => handleChange("website", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Bio</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="default"
              value={state.bio}
              onChangeText={(value: string) => handleChange("bio", value)}
            />
          </View>
          <View style={{ marginVertical: 14 }}>
            <Text style={[styles.fontM, styles.fontWeightXl, styles.SpacingM, { color: Colors.textclr }]}>
              Private Information
            </Text>
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Email</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType='email-address'
              value={state.email}
              onChangeText={(value: string) => handleChange("email", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Phone</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}
              keyboardType="phone-pad"
              value={state.phone}
              onChangeText={(value: string) => handleChange("phone", value)}
            />
          </View>
          <View style={[styles.flexRow, styles.horizantalyCenter,]}>
            <View style={{ width: "30%", }}>
              <Text style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingSm, { color: Colors.textclr }]}>Gender</Text>
            </View>
            <TextInput
              style={[styles.fontSm, styles.fontWeightM, styles.lineHightFirst, styles.SpacingExSm, { color: Colors.textclr, borderBottomWidth: 0.33, borderColor: Colors.borderColor, width: "70%", }]}
              placeholder='Not set'
              placeholderTextColor={"#D1D3D4"}

              value={state.gender}
              onChangeText={(value: string) => handleChange("gender", value)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={[customStyles.modalCenter]}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={[customStyles.modalContainer, customStyles.btn, { backgroundColor: Colors.inputbg }]}>
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
    </View>
  )
}