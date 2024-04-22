import {combineReducers, configureStore} from '@reduxjs/toolkit';

import postSlice from './slices/postSlice';
import usersData from './slices/usersData';
import authentication from './slices/authentication';
import signUp from './slices/signUp';
import signIn from './slices/signIn';

const rootReducer = combineReducers({
  auth: authentication,
  signUp:signUp,
  signIn:signIn,
  posts: postSlice,
  usersData: usersData,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export const Store = configureStore({
  reducer: rootReducer,
});
