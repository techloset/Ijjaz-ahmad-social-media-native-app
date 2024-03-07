import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {allPosts} from '../../../constants/AllTypes';

export default function useProfile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const route = useRoute();
  const {profile} = route.params as {profile: allPosts};
  const toggleModal = (post: any) => {
    setModalImg(post);
    setModalVisible(!isModalVisible);
  };
  return {
    isModalVisible,
    setModalVisible,
    modalImg,
    setModalImg,
    profile,
    toggleModal,
  };
}
