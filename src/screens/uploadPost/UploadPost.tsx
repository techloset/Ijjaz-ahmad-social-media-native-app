import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import {styles} from '../../constants/GlobalStyle';
import {customStyles} from '../FrontendStyle';
import {Colors} from '../../constants/Colors';
import {ArrowDown, CrossIcon, UploadButton} from '../../constants/Images';
import useUploadPost from './useUploadPost';
import PageNavigateBtn from '../../components/buttons/PageNavigateBtn';
import Input from '../../components/inputs/Input';
import BottomModel from '../../components/CustomModel/BottomModel';
export default function UploadPost() {
  const {
    isModalVisible,
    image,
    imageType,
    imageSize,
    loading,
    state,
    focusedText,
    setFocusedText,
    handleChange,
    handleCamra,
    handleGallery,
    uploadFile,
    handleCancel,
    toggleModal,
  } = useUploadPost();
  return (
    <>
      <View
        style={[
          styles.flexRow,
          {backgroundColor: Colors.inputbg, padding: 13},
        ]}>
        <TouchableOpacity onPress={handleCancel} style={{flexGrow: 1}}>
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              {color: focusedText === 'cancel' ? 'red' : Colors.textclr},
            ]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFocusedText('edit')}
          style={{flexGrow: 1.3}}>
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              {color: focusedText === 'edit' ? 'blue' : Colors.textclr},
            ]}>
            Images <ArrowDown />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.flexContainer, styles.horizantalyCenter]}>
        <ScrollView>
          <View style={{marginVertical: 15}}>
            {image ? (
              <View>
                <Text>Type: {imageType}</Text>
                <Image
                  source={{uri: image}}
                  style={{width: 300, height: 300}}
                />
                <Text>Size: {imageSize} KB</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={toggleModal}>
                <UploadButton />
              </TouchableOpacity>
            )}
          </View>

          <View style={{width: '111%'}}>
            <Text>Post Description</Text>
            <Input
              placeholder={'Add post description'}
              value={state.description}
              onChangeText={(value: string) =>
                handleChange('description', value)
              }
              type={'text'}
            />
            <PageNavigateBtn onPress={uploadFile} label="Upload" />
          </View>
        </ScrollView>
      </View>
      <BottomModel isModalVisible={isModalVisible} onRequestClose={toggleModal} onPress={toggleModal} />
    </>
  );
}
