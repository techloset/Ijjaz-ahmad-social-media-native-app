import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {customStyles} from '../../screens/FrontendStyle';
import {CrossIcon, Delete} from '../../constants/Images';
import {Colors} from '../../constants/Colors';
import {FIRE_BASE_COLLECTION} from '../../constants/Collections';
import {notify} from '../../constants/GlobalStyle';
import {firebase} from '@react-native-firebase/storage';
import {AppDispatch} from '../../store/store';
import {fetchPost} from '../../store/slices/postSlice';
import {useDispatch} from 'react-redux';
import usePostCard from '../UserPostCard/usePostCard';

type ModelProps = {
  isModalVisible: boolean;
  postId: string;
  modalImg: string;
  onPress: (item: any) => void;
  onRequestClose: (item: any) => void;
};
export default function CustomModel({
  isModalVisible,
  postId,
  modalImg,
  onPress,
  onRequestClose,
}: ModelProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setisLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setisLoading(true);
      const userPostsRef = firebase
        .firestore()
        .collection(FIRE_BASE_COLLECTION.POST)
        .doc(postId)
        .collection(FIRE_BASE_COLLECTION.USER_POSTS);
      const subDocSnapshot = await userPostsRef
        .where('URL', '==', modalImg)
        .get();
      const subDocId = subDocSnapshot.docs[0].id;
      await userPostsRef.doc(subDocId).delete();
      const storageRef = firebase.storage().refFromURL(modalImg);
      await storageRef.delete();
      dispatch(fetchPost());
      notify('Success', 'Post has been deleted', 'success');
      // setModalVisible(false);
      setisLoading(false);
    } catch (error) {
      notify('Error', `${error}`, 'error');
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={onRequestClose}>
        <View
          style={{
            backgroundColor: Colors.profileBorder,
            position: 'absolute',
            width: '100%',
            height: '75%',
            top: '10%',
            borderRadius: 20,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 20,
            }}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <TouchableOpacity onPress={handleDelete}>
                <Delete width={24} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onPress}>
              <CrossIcon />
            </TouchableOpacity>
          </View>

          <Image
            source={{uri: modalImg}}
            style={[customStyles.fullScreenProfileImg]}
          />
        </View>
      </Modal>
    </View>
  );
}
