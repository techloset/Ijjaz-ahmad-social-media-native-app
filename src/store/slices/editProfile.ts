import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {notify} from '../../constants/GlobalStyle';

import {FIRE_BASE_COLLECTION} from '../../constants/Collections';
import {userType} from '../../constants/AllTypes';
type EditProfileFunProps = {
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
export const editProfileFun = createAsyncThunk(
  'post/upload',
  async ({type, image, uid, state}: EditProfileFunProps) => {
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
    builder.addCase(editProfileFun.pending, state => {
      // console.log("🚀 ~ builder.addCase ~ state: pending", state);
    });
    builder.addCase(editProfileFun.fulfilled, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:fulfilled", action);
      // console.log("🚀 ~ builder.addCase ~ state:fulfilled", state);
    });
    builder.addCase(editProfileFun.rejected, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:rejected", action);
      // console.log("🚀 ~ builder.addCase ~ state:rejected", state);
    });
  },
});

export const {} = uploadPost.actions;
export default uploadPost.reducer;
