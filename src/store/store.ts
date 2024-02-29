import {combineReducers, configureStore} from '@reduxjs/toolkit';

import postSlice from './slices/postSlice';
import usersData from './slices/usersData';

const rootReducer = combineReducers({
  posts: postSlice,
  usersData: usersData,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export const Store = configureStore({
  reducer: rootReducer,
});
