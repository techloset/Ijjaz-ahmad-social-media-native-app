import {createSlice} from '@reduxjs/toolkit';
import {UserData} from '../../constants/AllTypes';
import {FIRE_BASE_COLLECTION} from '../../constants/Collections';
import {login} from './authentication';
import {notify} from '../../constants/GlobalStyle';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const createUser = (userData: UserData) => {
  return async (dispatch: any) => {
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

      dispatch(login(userData));
      notify('Success', 'User SignUp Successfully', 'success');
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
    }
  };
};
const initialState = {};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
