import {useEffect, useState} from 'react';
import {rootStatePost} from '../../constants/AllTypes';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {fetchPost} from '../../store/slices/postSlice';
export default function usePostCard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState('');
  const [modalImg, setModalImg] = useState('');
  const userPosts = useSelector(
    (state: rootStatePost) => state.posts.userPosts,
  );
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
