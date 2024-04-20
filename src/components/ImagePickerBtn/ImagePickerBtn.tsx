import {View} from 'react-native';
import React from 'react';
import useUploadPost from '../../screens/uploadPost/useUploadPost';
import PageNavigateBtn from '../buttons/PageNavigateBtn';

export default function ImagePickerBtn() {
  const {handleCamra, handleGallery} = useUploadPost();
  return (
    <View>
      <PageNavigateBtn label='Open Camera' onPress={() => {
          handleCamra();
        }} />
      <PageNavigateBtn label=' Select from Gallery' onPress={() => {
          handleGallery();
        }} />
    </View>
  );
}
