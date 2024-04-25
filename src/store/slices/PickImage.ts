import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PickImageProps } from '../../constants/allTypes';


export const fetchImageFromCamera = createAsyncThunk(
  'pickImage/fetchImageFromCamera',
  async () => {
    const result = await launchCamera({mediaType: 'photo'});
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      let itemSize = result.assets[0].fileSize;
      let size = itemSize / 1024;
      size = Number(size.toFixed(2));
      let imageUri = result.assets[0].uri;
      let imageType = result.assets[0].type;
      let imageSize = size;

      return {imageUri, imageType, imageSize};
    } else {
      throw new Error('Failed to fetch image from camera');
    }
  },
);

export const fetchImageFromGallery = createAsyncThunk(
  'pickImage/fetchImageFromGallery',
  async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (
      !result.didCancel &&
      result.assets &&
      result.assets.length > 0 &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      let itemSize = result.assets[0].fileSize;
      let size = itemSize / 1024;
      size = Number(size.toFixed(2));
      let imageUri = result.assets[0].uri;
      let imageType = result.assets[0].type;
      let imageSize = size;

      return {imageUri, imageType, imageSize};
    } else {
      throw new Error('Failed to fetch image from gallery');
    }
  },
);

const initialState: PickImageProps = {
  image: '',
  type: '',
  size: 0,
};

const pickImage = createSlice({
  name: 'pickImage',
  initialState,
  reducers: {
    resetPickImage: (state) => {
      state.image = "";
      state.type = "";
      state.size = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchImageFromCamera.fulfilled, (state, action) => {
        const {imageUri, imageType, imageSize} = action.payload;
        state.image = imageUri;
        state.type = imageType;
        state.size = imageSize;
      })
      .addCase(fetchImageFromGallery.fulfilled, (state, action) => {
        const {imageUri, imageType, imageSize} = action.payload;
        state.image = imageUri;
        state.type = imageType;
        state.size = imageSize;
      });
  },
});
export const {resetPickImage} = pickImage.actions
export default  pickImage.reducer;
