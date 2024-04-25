import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authentication from './slices/authentication';
import pickImage from './slices/PickImage';
import myPosts from './slices/myPosts';
import myProfile from './slices/myProfile';
import usersFeed from './slices/usersFeed';

const rootReducer = combineReducers({
  auth: authentication,
  myPosts: myPosts,
  usersFeed: usersFeed,
  pickImage: pickImage,
  myProfile: myProfile,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export const Store = configureStore({
  reducer: rootReducer,
});
