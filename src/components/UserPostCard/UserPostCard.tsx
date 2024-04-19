import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {postType} from '../../constants/AllTypes';
import usePostCard from './usePostCard';
import useCustomModel from '../CustomModel/useCustomModel';

export default function UserPostCard() {
  const {
    isModalVisible,
    setModalVisible,
    postId,
    setPostId,
    modalImg,
    setModalImg,
    userPosts,
  } = usePostCard();
  const {toggleModal} =useCustomModel()
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
        {userPosts.map((item: postType, i) => {
          return (
            <View key={i}>
              <TouchableOpacity onPress={() => toggleModal(item)}>
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
  );
}
