import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from '../../constants/GlobalStyle';
import {CrossIcon, TabsIcon, User} from '../../constants/Images';
import {customStyles} from '../FrontendStyle';
import {Colors} from '../../constants/Colors';
import {postType} from '../../constants/AllTypes';
import useProfile from './useProfile';
import ProfileCard from '../../components/profileCard/ProfileCard';

export default function Profile() {
  const {isModalVisible, modalImg, profile, toggleModal} = useProfile();
  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.horizantalyCenter]}>
        <Text
          style={[
            styles.fontXxl,
            styles.fontWeightXl,
            styles.SpacingExSm,
            {color: Colors.textclr, marginVertical: 12},
          ]}>
          {profile.user.username}
        </Text>
      <ProfileCard state={profile.user} />
        <View>
          <TabsIcon />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
          {profile.posts.map((item: postType, j: number) => {
            return (
              <View key={j}>
                <TouchableOpacity onPress={() => toggleModal(item.URL)}>
                  <Image
                    source={{uri: item.URL}}
                    style={{width: 120, height: 124}}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>   
      </ScrollView>
      <View style={customStyles.container}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View style={customStyles.modalContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <CrossIcon />
            </TouchableOpacity>
            {modalImg === '' ? (
              ''
            ) : (
              <Image
                source={{uri: modalImg}}
                style={customStyles.fullScreenProfileImg}
              />
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
}
