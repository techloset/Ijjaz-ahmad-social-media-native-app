import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {notify} from '../../constants/GlobalStyle';
import {FIRE_BASE_COLLECTION} from '../../constants/Collections';
import {fetchPost} from '../../store/slices/postSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
const initialState = {description: ''};
export default function useUploadPost() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>('');
  const [imageType, setImageType] = useState<string>('');
  const [imageSize, setImageSize] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [focusedText, setFocusedText] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };
  const handleCamra = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type);
      let itemSize = result.assets[0].fileSize;
      let size = itemSize / 1024;
      size = Number(size.toFixed(2));
      setImageSize(size);
      setModalVisible(false);
    }
  };

  const handleGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type);
      let itemSize = result.assets[0].fileSize;
      let size = itemSize / 1024;
      size = Number(size.toFixed(2));
      setImageSize(size);
      setModalVisible(false);
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    const {description} = state;
    try {
      const fileType = imageType;
      const uriPath = image;
      const Type = fileType.split('/').pop();
      const id = Math.random().toString(36).slice(2);
      const childPath = `/post/${user.uid}/${id}.${Type}`;
      const reference = storage().ref().child(childPath);
      await reference.putFile(uriPath);
      const URL = await reference.getDownloadURL();
      await firestore()
        .collection(FIRE_BASE_COLLECTION.POST)
        .doc(user.uid)
        .collection(FIRE_BASE_COLLECTION.USER_POSTS)
        .doc(id)
        .set({
          URL,
          description,
          dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user.uid,
          id: id,
        })
        .then(() => {
          notify('Success', 'Post upload Successfully', 'success');
          setLoading(false);
          dispatch(fetchPost());
          setImage('');
          setImageSize(null);
          setImageType('');
          setState(initialState);
        })
        .catch(error => {
          notify('error', 'Post upload failed', 'error');
        });
      notify('success', 'Post uploaded', 'success');
    } catch (err) {
      notify('error', 'Post upload failed', 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setFocusedText('cancel');
    setImage('');
    setState(initialState);
    setImageSize(null);
    setImageType('');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return {
    isModalVisible,
    setModalVisible,
    image,
    setImage,
    imageType,
    setImageType,
    imageSize,
    setImageSize,
    loading,
    setLoading,
    state,
    setState,
    focusedText,
    setFocusedText,
    handleChange,
    handleCamra,
    handleGallery,
    uploadFile,
    handleCancel,
    toggleModal,
  };
}
