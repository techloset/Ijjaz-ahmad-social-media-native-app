import {useState} from 'react';
import {useRoute} from '@react-navigation/native';

export default function useProfile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const route = useRoute();
  const {profile} = route.params;
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
