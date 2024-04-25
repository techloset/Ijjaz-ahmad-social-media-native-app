import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {notify} from '../../constants/globalStyle';

import {FIRE_BASE_COLLECTION} from '../../constants/collections';
import {UpdateProfileFunProps, uploadFileFunProps, userType} from '../../constants/allTypes';

const uploadFileFun = async ({type, image, uid}: uploadFileFunProps) => {
  try {
    const fileType = type.split('/').pop();
    const childPath = `/profile/${uid}/profileImage.${fileType}`;
    const reference = storage().ref().child(childPath);
    await reference.putFile(image);
    const URL: string = await reference.getDownloadURL();
    notify('success', 'image uploaded', 'success');
    return URL;
  } catch (err) {
    notify('error', 'Post upload failed', 'error');
    return '';
  }
};
export const UpdateProfileFun = createAsyncThunk(
  'post/upload',
  async ({type, image, uid, state}: UpdateProfileFunProps) => {
    try {
      if (image) {
        let profileImg = '';
        profileImg = await uploadFileFun({type, image, uid});
        state.profileImage = profileImg;
      }

      await firestore()
        .collection(FIRE_BASE_COLLECTION.USERS)
        .doc(uid)
        .update(state);
      notify('Success', 'Profile successfully updated!', 'success');
    } catch (error) {
      notify('Error', 'Error updating profile', 'error');
    }
  },
);

const initialState = {};

const myProfile = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(UpdateProfileFun.pending, state => {
    });
    builder.addCase(UpdateProfileFun.fulfilled, (state, action) => {
    });
    builder.addCase(UpdateProfileFun.rejected, (state, action) => {
    });
  },
});

export const {} = myProfile.actions;
export default myProfile.reducer;
