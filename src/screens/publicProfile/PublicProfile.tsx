import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from '../../constants/globalStyle';
import {CrossIcon, TabsIcon, User} from '../../constants/images';
import {customStyles} from '../screenStyling';
import {Colors} from '../../constants/colors';
import {postType} from '../../constants/allTypes';
import usePublicProfile from './usePublicProfile';
import ProfileCard from '../../components/profileCard/ProfileCard';

export default function PublicProfile() {
  const {isModalVisible, modalImg, profile, toggleModal} = usePublicProfile();
  return (
    <>
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
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View
            style={{
              backgroundColor: Colors.profileBorder,
              position: 'absolute',
              width: '100%',
              height: '75%',
              top: '10%',
              borderRadius: 20,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 20,
              }}>
              <TouchableOpacity onPress={toggleModal}>
                <CrossIcon />
              </TouchableOpacity>
            </View>
            {modalImg ? (
              <Image
                source={{uri: modalImg}}
                style={customStyles.fullScreenProfileImg}
              />
            ) : (
              ''
            )}
          </View>
        </Modal>
      </View>
    </>
  );
}
