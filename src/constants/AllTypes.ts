import {NavigationProp} from '@react-navigation/native';

export type routeProps = {
  navigation: NavigationProp<any>;
};
export type ToastType = 'success' | 'error' | 'info';
export type handleChangeProps = {
  name: string;
  value: string;
  type: string;
};
export type UserData = {
  username?: string;
  email: string;
  password: string;
  role?: string;
  status?: string;
  uid?: string;
  profileImage?: string;
  website?: string;
  bio?: string;
  phone?: string;
  gender?: string;
  name?: string;
};
export type SigninUserData = {
  email: string;
  password: string;
};
export type ForgotData = {
  email: string;
};
export type AuthContextProps = {
  isAuth: boolean;
  user: Record<string, any>;
  dispatch: React.Dispatch<{
    type: string;
    payload: {userData?: Record<string, any>};
  }>;
};
export type FirebaseUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
};
export type UserProfileData = {
  confirmPassword?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: string;
  uid?: string;
  username?: string;
};
export type AuthState = {
  isAuth: boolean;
  user: UserProfileData;
  isAppLoading: boolean;
};
export type AuthAction =
  | {type: 'Login'; payload: {userData?: UserProfileData}}
  | {type: 'Logout'};
export type userType = {
  bio?: string;
  email?: string;
  gender?: string;
  name?: string;
  phone?: string;
  profileImage?: string;
  role?: string;
  status?: string;
  uid?: string;
  username?: string;
  website?: string;
};
export type postType = {
  URL?: string;
  id?: string;
  uid?: string;
  description?: string;
  dateCreated?: string;
};
export type postState = {
  isLoading: boolean;
  userPosts: postType[];
  isError: boolean;
};
export type allPosts = {
  user: userType;
  posts: postType[];
};
export type usersDataState = {
  isLoading: boolean;
  usersData: allPosts[];
  isError: boolean;
};
export type userDataState = {
  isAuth: boolean;
  user: userType;
  isLoading: boolean;
  isError: boolean;
};
export type rootStatePost = {
  posts: postState;
  usersData: usersDataState;
  userData: userDataState;
};
