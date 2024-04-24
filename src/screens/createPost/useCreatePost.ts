import {useState} from 'react';
import {fetchPost} from '../../store/slices/postSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchImageFromCamera,
  fetchImageFromGallery,
  resetPickImage,
} from '../../store/slices/PickImage';
import {uploadPostFun} from '../../store/slices/uploadPost';
const initialState = {description: ''};
export default function useCreatePost() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [focusedText, setFocusedText] = useState('');
  const {image, type, size} = useSelector(
    (state: RootState) => state.pickImage,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };

  const handleCamra = async () => {
    await dispatch(fetchImageFromCamera());
    setModalVisible(false);
  };

  const handleGallery = async () => {
    await dispatch(fetchImageFromGallery());
    setModalVisible(false);
  };

  const uploadFile = async () => {
    setLoading(true);
    const {description} = state;
    const uid = user.uid;
    await dispatch(uploadPostFun({type, image, uid, description}));
    setLoading(false);
    setState(initialState);
    dispatch(resetPickImage());
    await dispatch(fetchPost());
  };

  const handleCancel = () => {
    setFocusedText('cancel');
    setState(initialState);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return {
    isModalVisible,
    image,
    type,
    size,
    loading,
    state,
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
