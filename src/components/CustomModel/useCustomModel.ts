import {useState} from 'react';

export default function useCustomModel() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState('');
  const [modalImg, setModalImg] = useState('');
  
  const toggleModal = (item: any) => {
    setPostId(item.uid);
    setModalImg(item.URL);
    setModalVisible(!isModalVisible);
  };
 
  return {
    isModalVisible,
    setModalVisible,
    postId,
    setPostId,
    modalImg,
    setModalImg,
    toggleModal,
  };
}
