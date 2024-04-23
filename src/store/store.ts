import {combineReducers, configureStore} from '@reduxjs/toolkit';
import postSlice from './slices/postSlice';
import usersData from './slices/usersData';
import authentication from './slices/authentication';
import signUp from './slices/signUp';
import signIn from './slices/signIn';
import {pickImage} from './slices/PickImage';
import uploadPost from './slices/uploadPost';

const rootReducer = combineReducers({
  auth: authentication,
  signUp: signUp,
  signIn: signIn,
  posts: postSlice,
  usersData: usersData,
  pickImage: pickImage,
  uploadPost: uploadPost,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export const Store = configureStore({
  reducer: rootReducer,
});
