import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import {
  SigninUserData,
  UserData,
  UserProfileData,
  userDataState,
  userType,
} from '../../constants/allTypes';
import { notify } from '../../constants/globalStyle';
import auth from '@react-native-firebase/auth';
import {FIRE_BASE_COLLECTION} from '../../constants/collections';
import firestore from '@react-native-firebase/firestore';

export const readUserProfile = createAsyncThunk(
  'readUserProfile/readUserProfile',
  async (user: userType, {rejectWithValue}) => {
    try {
      const documentSnapshot = await firestore()
        .collection(FIRE_BASE_COLLECTION.USERS)
        .doc(user.uid)
        .get();
      const userData: UserProfileData =
        documentSnapshot.data() as UserProfileData;
      return {userData};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const signInUser = createAsyncThunk(
  'signIn/signIn',
  async (userData: SigninUserData) => {
    try {
      await auth()
        .signInWithEmailAndPassword(userData.email, userData.password);
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
export const createUser = createAsyncThunk(
  'signUp/createUser',
  async (userData: UserData) => {
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
const initialState: userDataState = {
  isAuth: false,
  user: {},
  isLoading: true,
  isError: false,
};

const authentication = createSlice({
  name: 'authentication',
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
  extraReducers: builder => {
    builder.addCase(readUserProfile.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(readUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.userData;
      state.isAuth = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
    });
    builder.addCase(readUserProfile.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const {logout, login, setisLoading} = authentication.actions;
export default authentication.reducer;
