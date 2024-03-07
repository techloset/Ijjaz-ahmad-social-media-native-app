import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import { userDataState } from '../../constants/AllTypes';

const initialState:userDataState = {
  isAuth: false,
  user: {},
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuth = false;
      state.user = {};
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {login, logout, setisLoading} = authSlice.actions;
export const selectAuthState = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;