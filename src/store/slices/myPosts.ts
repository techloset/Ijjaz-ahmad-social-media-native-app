import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postState, postType, uploadPostFunProps} from '../../constants/allTypes';
import auth from '@react-native-firebase/auth';
import { FIRE_BASE_COLLECTION } from '../../constants/collections';
import storage from '@react-native-firebase/storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {notify} from '../../constants/globalStyle';

export const fetchPost = createAsyncThunk('post/fetchPost', async () => {
  try {
    const currentUser = auth().currentUser;
    const userId = currentUser ? currentUser?.uid : null;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const querySnapshot = await firestore()
      .collection(FIRE_BASE_COLLECTION.POST)
      .doc(userId)
      .collection(FIRE_BASE_COLLECTION.USER_POSTS)
      .get();
    const userPosts: postType[] = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      const Post: postType = {
        URL: data.URL,
        id: data.id,
        uid: data.uid,
        description: data.description,
        dateCreated: data.dateCreated.toMillis(),
      };
      userPosts.push(Post);
    });
    return {userPosts};
  } catch (error) {
    throw error;
  }
});

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
const initialState: postState = {
  isLoading: false,
  userPosts: [],
  isError: false,
};

const myPosts = createSlice({
  name: 'myPosts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPost.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userPosts = action.payload.userPosts;
    });
    builder.addCase(uploadPostFun.fulfilled, (state, action) => {
    });
    builder.addCase(fetchPost.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default myPosts.reducer;
