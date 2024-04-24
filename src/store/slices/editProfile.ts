import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {notify} from '../../constants/globalStyle';

import {FIRE_BASE_COLLECTION} from '../../constants/collections';
import {userType} from '../../constants/allTypes';
type UpdateProfileFunProps = {
  type: string;
  image: string;
  uid: string | undefined;
  state: userType;
};
type uploadFileFunProps = {
  type: string;
  image: string;
  uid: string | undefined;
};
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

const uploadPost = createSlice({
  name: 'uploadPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(UpdateProfileFun.pending, state => {
      // console.log("🚀 ~ builder.addCase ~ state: pending", state);
    });
    builder.addCase(UpdateProfileFun.fulfilled, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:fulfilled", action);
      // console.log("🚀 ~ builder.addCase ~ state:fulfilled", state);
    });
    builder.addCase(UpdateProfileFun.rejected, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:rejected", action);
      // console.log("🚀 ~ builder.addCase ~ state:rejected", state);
    });
  },
});

export const {} = uploadPost.actions;
export default uploadPost.reducer;
