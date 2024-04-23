import {AUTH_STACK_SCREEN, STACK_SCREENS} from '../constants/Navigation';
import ForgotPassword from '../screens/auth/forgotPassword/ForgotPassword';
import Login from '../screens/auth/login/Login';
import Signup from '../screens/auth/signUp/SignUp';
import EditProfile from '../screens/editProfile/EditProfile';
import Profile from '../screens/profile/Profile';
import MyTabs from './TabNavigation';

export const AUTH_STACK_NAVIGATION_SCREENS = [
  {name: AUTH_STACK_SCREEN.LOGIN, component: Login},
  {name: AUTH_STACK_SCREEN.SIGNUP, component: Signup},
  {name: AUTH_STACK_SCREEN.FORGOT_PASSWORD, component: ForgotPassword},
];
export const STACK_NAVIGATION_SCREENS = [
  {name: STACK_SCREENS.BOTTOM_TAB, component: MyTabs},
  {name: STACK_SCREENS.PROFILE, component: Profile},
  {name: STACK_SCREENS.PROFILE_EDIT, component: EditProfile},
];
