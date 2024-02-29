import React from 'react'
import { View, Text, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
import { styles } from '../../../constants/GlobalStyle'
import { CrossIcon, Delete, TabsIcon, User } from '../../../constants/Images'
import { customStyles } from '../FrontendStyle'
import { Colors } from '../../../constants/Colors'
import { STACK_SCREENS } from '../../../constants/Navigation'
import { postType, } from '../../../constants/AllTypes'
import useProfileSelf from './useProfileSelf'
export default function ProfileSelf({ navigation }: any) {
  const { isModalVisible, user, modalImg, userPosts, toggleModal, handleDelete, handleLogout } = useProfileSelf()
  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.horizantalyCenter]} >
        <View style={[customStyles.border, { overflow: "hidden" }]}>
          <TouchableOpacity
          >{
              user.profileImage === "" ?
                <User width="86" height="86" style={customStyles.profileImg} />
                :
                <Image source={{ uri: user.profileImage }} style={customStyles.profileImg} />
            }
          </TouchableOpacity>
        </View>
        <View style={[styles.horizantalyCenter, customStyles.bio]}>
          <Text style={[styles.fontL, styles.fontWeightXl, styles.SpacingSm, { color: Colors.textclr }]}>{user.username}</Text>
          <Text style={[customStyles.textCenter, styles.fontSm, styles.fontWeightM, styles.lineHightFirst, { color: Colors.textclr }]} >{user.bio}</Text>
        </View  >
        <View style={{ width: "90%" }}>
          <TouchableOpacity
            style={customStyles.btn}
            onPress={() => navigation.navigate(STACK_SCREENS.PROFILE_EDIT)}
          >
            <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={customStyles.btn}
            onPress={() => handleLogout()}
          >
            <Text style={[styles.fontWeightXl, styles.fontM, { textAlign: "center", color: Colors.textclr }]}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TabsIcon />
        </View>
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" }}>
          {
            userPosts.map((item: postType, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity onPress={() => toggleModal(item)}>
                    <Image source={{ uri: item.URL }} style={{ width: 120, height: 124 }} />
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
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
          <TouchableOpacity onPress={handleDelete} style={{ position: "absolute", top: 10, left: 30, }}>
            <Delete width={24} />
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  )
}

