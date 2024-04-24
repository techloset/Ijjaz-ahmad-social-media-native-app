import {AUTH_STACK_SCREEN, STACK_SCREENS} from '../constants/navigationName';
import ForgotPassword from '../screens/auth/forgotPassword/ForgotPassword';
import Login from '../screens/auth/login/Login';
import Signup from '../screens/auth/signUp/SignUp';
import UpdateProfile from '../screens/updateProfile/UpdateProfile';
import PublicProfile from '../screens/publicProfile/PublicProfile';
import MyTabs from './TabNavigation';

export const AUTH_STACK_NAVIGATION_SCREENS = [
  {name: AUTH_STACK_SCREEN.LOGIN, component: Login},
  {name: AUTH_STACK_SCREEN.SIGNUP, component: Signup},
  {name: AUTH_STACK_SCREEN.FORGOT_PASSWORD, component: ForgotPassword},
];
export const STACK_NAVIGATION_SCREENS = [
  {name: STACK_SCREENS.BOTTOM_TAB, component: MyTabs},
  {name: STACK_SCREENS.PUBLICK_PROFILE, component: PublicProfile},
  {name: STACK_SCREENS.PROFILE_EDIT, component: UpdateProfile},
];
