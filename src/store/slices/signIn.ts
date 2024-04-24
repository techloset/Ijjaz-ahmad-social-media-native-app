import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SigninUserData } from '../../constants/allTypes';
import { notify } from '../../constants/globalStyle';
import auth from '@react-native-firebase/auth';
// import { login } from './authentication';

export const signInUser = createAsyncThunk(
  'signIn/signIn',
  async (userData: SigninUserData , { dispatch }) => {
    try {
      await auth()
        .signInWithEmailAndPassword(userData.email, userData.password);
      
      // dispatch(login(userData as any));
      notify(
        'User Login Successfully!',
        'Welcome to instagramMeToYou app',
        'success',
      );
    } catch (error:any) {
      if (error.code === 'auth/email-already-in-use') {
        notify(
          'Email Error',
          'That email address is already registered!',
          'error',
        );
      } else if (error.code === 'auth/invalid-email') {
        notify('Email|Password Error', 'Please try again', 'error');
      } else {
        notify('Email|Password Error', 'Please try again', 'error');
      }
      throw error;
    }
  }
);

const initialState = {};

const signIn = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      // console.log("🚀 ~ builder.addCase ~ state: pending", state);
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:fulfilled", action);
      // console.log("🚀 ~ builder.addCase ~ state:fulfilled", state);
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      // console.log("🚀 ~ builder.addCase ~ action:rejected", action);
      // console.log("🚀 ~ builder.addCase ~ state:rejected", state);
    });
  },
});

export const {} = signIn.actions;
export default signIn.reducer;
