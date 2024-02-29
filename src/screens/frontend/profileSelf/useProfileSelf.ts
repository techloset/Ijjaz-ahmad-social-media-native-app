import  { useEffect, useState } from 'react'
import { notify } from '../../../constants/GlobalStyle'

import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../../context/AuthContext'
import {  rootStatePost } from '../../../constants/AllTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchPost } from '../../../store/slices/postSlice'
import { firebase } from '@react-native-firebase/storage'
import { FIRE_BASE_COLLECTION } from '../../../constants/Collections'
export default function useProfileSelf() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [postId, setPostId] = useState("");
    const [modalImg, setModalImg] = useState("");
    const { dispatch, user } = useAuthContext()
    const userPosts = useSelector((state: rootStatePost) => state.posts.userPosts);
    const reduxDispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      reduxDispatch(fetchPost());
    }, [])
    const toggleModal = (item: any) => {
      setPostId(item.uid)
      setModalImg(item.URL)
      setModalVisible(!isModalVisible);
    };
    const handleDelete = async () => {
      try {
        const userPostsRef = firebase.firestore().collection(FIRE_BASE_COLLECTION.POST).doc(postId).collection(FIRE_BASE_COLLECTION.USER_POSTS);
        const subDocSnapshot = await userPostsRef.where('URL', '==', modalImg).get();
        const subDocId = subDocSnapshot.docs[0].id;
        await userPostsRef.doc(subDocId).delete();
        const storageRef = firebase.storage().refFromURL(modalImg);
        await storageRef.delete();
        reduxDispatch(fetchPost());
        notify("Success", "Post has been deleted", "success");
        setModalVisible(false);
    } catch (error) {
        notify("Error", `${error}`, "error");
    }
    
    }
    const handleLogout = () => {
      auth()
        .signOut()
        .then(() => {
          dispatch({ type: "Logout", payload: {} })
          notify("User Logout!", "", "success");
        });
    }
  return {isModalVisible, setModalVisible,postId, setPostId,modalImg, setModalImg,userPosts ,user,toggleModal,handleDelete,handleLogout }
}