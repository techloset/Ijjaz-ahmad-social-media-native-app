import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../constants/allTypes';
import { FIRE_BASE_COLLECTION } from '../../constants/collections';
import { notify } from '../../constants/globalStyle';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import { login } from './authentication';

export const createUser = createAsyncThunk(
  'signUp/createUser',
  async (userData: UserData, { dispatch }) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password,
      );
      const user = userCredential.user;
      userData.uid = user.uid;

      await firestore()
        .collection(FIRE_BASE_COLLECTION.USERS)
        .doc(userData.uid)
        .set(userData);

      // dispatch(login(userData));
      notify('Success', 'User SignUp Successfully', 'success');
      return userData;
    } catch (error: any) {
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

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
   
    builder.addCase(createUser.pending, (state) => {
    // console.log("🚀 ~ builder.addCase ~ state: pending", state)
  
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
    // console.log("🚀 ~ builder.addCase ~ action:fulfilled", action)
    // console.log("🚀 ~ builder.addCase ~ state:fulfilled", state)
  
    });
    builder.addCase(createUser.rejected, (state, action) => {
    // console.log("🚀 ~ builder.addCase ~ action:rejected", action)
    // console.log("🚀 ~ builder.addCase ~ state:rejected", state)
    });
  },
});

export const {} = signUp.actions;
export default signUp.reducer;
