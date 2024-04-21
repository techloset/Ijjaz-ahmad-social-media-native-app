import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {styles} from '../../constants/GlobalStyle';
import {Colors} from '../../constants/Colors';
import {UploadButton} from '../../constants/Images';
import useUploadPost from './useUploadPost';
import Input from '../../components/inputs/Input';
import BottomModel from '../../components/CustomModel/BottomModel';
import EditCancelBtn from '../../components/buttons/EditCancelBtn';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
export default function UploadPost() {
  const {
    isModalVisible,
    image,
    imageType,
    imageSize,
    loading,
    state,
    focusedText,
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
          {backgroundColor: Colors.inputbg, padding: 13, gap: 100},
        ]}>
        <EditCancelBtn
          focusedText={focusedText}
          onCancel={handleCancel}
          onEdit={toggleModal}
          label="Edit Post"
        />
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
            <PrimaryBtn loading={loading} onPress={uploadFile} label="Upload" />
          </View>
        </ScrollView>
      </View>
      <BottomModel
        isModalVisible={isModalVisible}
        onRequestClose={toggleModal}
        onPress={toggleModal}
        handleCamra={handleCamra}
        handleGallery={handleGallery}
      />
    </>
  );
}
