import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
import {userType} from '../../constants/allTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {readUserProfile} from '../../store/slices/authentication';
import {
  fetchImageFromCamera,
  fetchImageFromGallery,
  resetPickImage,
} from '../../store/slices/PickImage';
import { UpdateProfileFun } from '../../store/slices/editProfile';
type RootStackParamList = {
  MY_PROFILE: undefined;
};
type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

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
export default function useUpdateProfile() {
  const {image, type, size} = useSelector(
    (state: RootState) => state.pickImage,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [focusedText, setFocusedText] = useState('');
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch();

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
    await dispatch(fetchImageFromCamera() as any);
    setModalVisible(false);
  };

  const handleGallery = async () => {
    await dispatch(fetchImageFromGallery() as any);
    setModalVisible(false);
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
    dispatch(resetPickImage());
    setFocusedText('cancel');
    navigation.navigate('MY_PROFILE');
  };

  const handleSubmit = async () => {
    setFocusedText('done');
    setLoading(true);
    let uid = user.uid;
    await dispatch(UpdateProfileFun({type, image, uid, state}) as any);
    await dispatch(readUserProfile(user) as any);
    dispatch(resetPickImage());
    setLoading(false);
  };

  return {
    user,
    loading,
    state,
    isModalVisible,
    image,
    focusedText,
    setFocusedText,
    handleChange,
    handleCamra,
    handleGallery,
    toggleModal,
    handleCancel,
    handleSubmit,
  };
}
