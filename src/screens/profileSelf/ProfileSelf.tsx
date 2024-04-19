import React from 'react'
import { View, Text, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
import { styles } from '../../constants/GlobalStyle'
import { CrossIcon, Delete, TabsIcon, User } from '../../constants/Images'
import { customStyles } from '../FrontendStyle'
import { Colors } from '../../constants/Colors'
import { STACK_SCREENS } from '../../constants/Navigation'
import { postType, } from '../../constants/AllTypes'
import useProfileSelf from './useProfileSelf'
import PageNavigateBtn from '../../components/buttons/PageNavigateBtn'
import ProfileCard from '../../components/profileCard/ProfileCard'
import UserPostCard from '../../components/UserPostCard/UserPostCard'
export default function ProfileSelf({ navigation }: any) {
  const { isModalVisible, modalImg, userPosts, toggleModal, handleDelete, handleLogout } = useProfileSelf()
  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.horizantalyCenter]} >
        <ProfileCard/>
          <PageNavigateBtn   onPress={() => navigation.navigate(STACK_SCREENS.PROFILE_EDIT)} label='Edit Profile'/>
          <PageNavigateBtn   onPress={handleLogout} label='Logout'/>
        <View>
          <TabsIcon />
        </View>
      </View>
      {/* <ScrollView>
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
      </ScrollView> */}
      <UserPostCard/>
      {/* <View style={customStyles.container}>
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
      </View> */}
    </View>
  )
}

