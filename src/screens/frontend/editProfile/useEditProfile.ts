import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {notify} from '../../../constants/GlobalStyle';
import storage from '@react-native-firebase/storage';
import {FIRE_BASE_COLLECTION} from '../../../constants/Collections';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/Store';
import {userType} from '../../../constants/AllTypes';
const initialState: userType = {
  bio: '',
  email: '',
  gender: '',
  name: '',
  phone: '',
  profileImage: '',
  role: '',
  status: '',
  username: '',
  website: '',
};

export default function useEditProfile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>('');
  const [imageType, setImageType] = useState<string>('');
  const [imageSize, setImageSize] = useState<number | null>();
  const [focusedText, setFocusedText] = useState('');
  useEffect(() => {
    let {name, username, website, bio, email, phone, gender, profileImage} =
      user;
    state.name = name;
    state.username = username;
    state.website = website;
    state.bio = bio;
    state.email = email;
    state.phone = phone;
    state.gender = gender;
    state.profileImage = profileImage;
  }, []);

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
    try {
      const fileType = imageType;
      const uriPath = image;
      const Type = fileType.split('/').pop();
      const id = Math.random().toString(36).slice(2);
      const childPath = `/profile/${user.uid}/profileImage.${Type}`;
      const reference = storage().ref().child(childPath);
      await reference.putFile(uriPath);
      const URL: string = await reference.getDownloadURL();
      notify('success', 'image uploaded', 'success');
      return URL;
    } catch (err) {
      notify('error', 'Post upload failed', 'error');
      return '';
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    let {name, username, website, bio, email, phone, gender, profileImage} =
      user;
    state.name = name;
    state.username = username;
    state.website = website;
    state.bio = bio;
    state.email = email;
    state.phone = phone;
    state.gender = gender;
    state.profileImage = profileImage;
    setFocusedText('cancel');
    setImage('');
    setImageSize(null);
    setImageType('');
  };

  const handleSubmite = async () => {
    setFocusedText('done');
    try {
      var profileImg = '';
      if (image !== '') {
        profileImg = await uploadFile();
      }

      if (profileImg === '') {
        state.profileImage = user.profileImage;
      } else {
        state.profileImage = profileImg;
      }
      await firestore()
        .collection(FIRE_BASE_COLLECTION.USERS)
        .doc(user.uid)
        .update(state);
      notify('Success', 'Profile successfully updated!', 'success');
    } catch (error) {
      notify('Error', 'Error updating profile', 'error');
    }
  };

  return {
    user,
    loading,
    setLoading,
    state,
    setState,
    isModalVisible,
    setModalVisible,
    image,
    setImage,
    imageType,
    setImageType,
    imageSize,
    setImageSize,
    focusedText,
    setFocusedText,
    handleChange,
    handleCamra,
    handleGallery,
    toggleModal,
    handleCancel,
    handleSubmite,
  };
}
