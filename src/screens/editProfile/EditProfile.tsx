import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from '../../constants/GlobalStyle';
import {Colors} from '../../constants/Colors';
import useEditProfile from './useEditProfile';
import ActionBtnsRow from '../../components/buttons/ActionBtnsRow';
import ProfileInput from '../../components/inputs/ProfileInput';
import BottomModel from '../../components/CustomModel/BottomModel';
import ProfileAvatar from '../../components/profileCard/ProfileAvatar';
export default function EditProfile() {
  const {
    state,
    isModalVisible,
    image,
    focusedText,
    setFocusedText,
    handleChange,
    handleCamra,
    handleGallery,
    toggleModal,
    handleCancel,
    handleSubmit,
    loading,
  } = useEditProfile();
  return (
    <View style={[styles.flexContainer]}>
      <ActionBtnsRow
        focusedText={focusedText}
        loading={loading}
        onCancel={handleCancel}
        onEdit={() => setFocusedText('edit')}
        onSubmit={handleSubmit}
      />
      <ScrollView>
        <ProfileAvatar state={state} image={image} onPress={toggleModal} />
        <View style={{margin: 20}}>
          <ProfileInput
            onChangeText={(value: string) => handleChange('name', value)}
            placeholder="Not set"
            type="text"
            value={state.name}
            label="Name"
          />
          <ProfileInput
            onChangeText={(value: string) => handleChange('username', value)}
            placeholder="Not set"
            type="text"
            value={state.username}
            label="Username"
          />
          <ProfileInput
            onChangeText={(value: string) => handleChange('website', value)}
            placeholder="Not set"
            type="text"
            value={state.website}
            label="Website"
          />
          <ProfileInput
            onChangeText={(value: string) => handleChange('bio', value)}
            placeholder="Not set"
            type="text"
            value={state.bio}
            label="Bio"
          />
          <View style={{marginVertical: 14}}>
            <Text
              style={[
                styles.fontM,
                styles.fontWeightXl,
                styles.SpacingM,
                {color: Colors.textclr},
              ]}>
              Private Information
            </Text>
          </View>
          <ProfileInput
            onChangeText={(value: string) => handleChange('email', value)}
            placeholder="Not set"
            type="text"
            value={state.email}
            label="Email"
          />
          <ProfileInput
            onChangeText={(value: string) => handleChange('phone', value)}
            placeholder="Not set"
            type="text"
            value={state.phone}
            label="Phone"
          />
          <ProfileInput
            onChangeText={(value: string) => handleChange('gender', value)}
            placeholder="Not set"
            type="text"
            value={state.gender}
            label="Gender"
          />
        </View>
      </ScrollView>
      <BottomModel
        isModalVisible={isModalVisible}
        onPress={toggleModal}
        onRequestClose={toggleModal}
        handleCamra={handleCamra}
        handleGallery={handleGallery}
      />
    </View>
  );
}
