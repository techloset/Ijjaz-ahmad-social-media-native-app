import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import {
  UserProfileData,
  userDataState,
  userType,
} from '../../constants/AllTypes';
import {FIRE_BASE_COLLECTION} from '../../constants/Collections';
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

const initialState: userDataState = {
  isAuth: false,
  user: {},
  isLoading: true,
  isError: false,
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
    builder.addCase(readUserProfile.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const {logout, login, setisLoading} = authSlice.actions;
export default authSlice.reducer;
