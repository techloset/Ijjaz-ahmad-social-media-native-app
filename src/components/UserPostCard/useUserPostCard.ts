import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {fetchPost} from '../../store/slices/myPosts';
export default function useUserPostCard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState('');
  const [modalImg, setModalImg] = useState('');
  const userPosts = useSelector((state: RootState) => state.myPosts.userPosts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPost());
  }, []);
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
    userPosts,
    toggleModal,
  };
}
