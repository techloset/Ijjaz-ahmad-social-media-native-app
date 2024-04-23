import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {notify} from '../../constants/GlobalStyle';

import {FIRE_BASE_COLLECTION} from '../../constants/Collections';
type uploadPostFunProps = {
  type: string;
  image: string;
  uid: string | undefined;
  description: string;
};
export const uploadPostFun = createAsyncThunk(
  'post/upload',
  async ({type, image, uid, description}: uploadPostFunProps) => {
    try {
      const fileType = type;
      const uriPath = image;
      const Type = fileType.split('/').pop();
      const id = Math.random().toString(36).slice(2);
      const childPath = `/post/${uid}/${id}.${Type}`;
      const reference = storage().ref().child(childPath);
      await reference.putFile(uriPath);
      const URL = await reference.getDownloadURL();
      await firestore()
        .collection(FIRE_BASE_COLLECTION.POST)
        .doc(uid)
        .collection(FIRE_BASE_COLLECTION.USER_POSTS)
        .doc(id)
        .set({
          URL,
          description,
          dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
          uid: uid,
          id: id,
        })
        .then(() => {
          notify('Success', 'Post upload Successfully', 'success');
        })
        .catch(error => {
          notify('error', 'Post upload failed', 'error');
        });
      notify('success', 'Post uploaded', 'success');
    } catch (err) {
      notify('error', 'Post upload failed', 'error');
    }
  },
);

const initialState = {};

const uploadPost = createSlice({
  name: 'uploadPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(uploadPostFun.pending, state => {
      // console.log("🚀 ~ builder.addCase ~ state: pending", state);
    });
    builder.addCase(uploadPostFun.fulfilled, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:fulfilled", action);
      // console.log("🚀 ~ builder.addCase ~ state:fulfilled", state);
    });
    builder.addCase(uploadPostFun.rejected, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:rejected", action);
      // console.log("🚀 ~ builder.addCase ~ state:rejected", state);
    });
  },
});

export const {} = uploadPost.actions;
export default uploadPost.reducer;
