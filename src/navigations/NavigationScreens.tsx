import { AUTH_STACK_SCREEN, STACK_SCREENS, BOTTOM_TAB_SCREEN } from "../constants/Navigation";
import ForgotPassword from "../screens/auth/forgotPassword/ForgotPassword";
import Login from "../screens/auth/login/Login";
import Signup from "../screens/auth/signUp/SignUp";
import EditProfile from "../screens/frontend/editProfile/EditProfile";
import Home from "../screens/frontend/home/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "../screens/frontend/profile/Profile";
import { HomeHover, HomeIcon, ProfileIcon, SmallLogo, UploadHover, UploadIcon } from "../constants/Images";
import { navStyles } from './NavigationStyle'
import ProfileSelf from "../screens/frontend/profileSelf/ProfileSelf";
import UploadPost from "../screens/frontend/uploadPost/UploadPost";
import { Image } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { Colors } from "../constants/Colors";

export const AUTH_STACK_NAVIGATION_SCREENS = [
  { name: AUTH_STACK_SCREEN.LOGIN, component: Login },
  { name: AUTH_STACK_SCREEN.SIGNUP, component: Signup },
  { name: AUTH_STACK_SCREEN.FORGOT_PASSWORD, component: ForgotPassword },
]
export const STACK_NAVIGATION_SCREENS = [
  { name: STACK_SCREENS.BOTTOM_TAB, component: MyTabs },
  { name: STACK_SCREENS.PROFILE, component: Profile },
  { name: STACK_SCREENS.PROFILE_EDIT, component: EditProfile },
]
const Tab = createBottomTabNavigator();
function MyTabs() {
  const { HOME, UPLOAD_POST, PROFILE_SELF } = BOTTOM_TAB_SCREEN;
  const { user } = useAuthContext();

  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarStyle: { paddingTop: 10 },
      })}
    >
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          headerShadowVisible: true,
          title: '',
          headerTitle: () => <SmallLogo />,
          headerTitleAlign: 'center',
          tabBarIcon: ({  focused  }) => (
            focused? <HomeHover width={30} height={35}/>:<HomeIcon width={22} height={23} />
          ),
        }}
      />
      <Tab.Screen
        name={UPLOAD_POST}
        component={UploadPost}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({  focused  }) => (
            focused? <UploadHover width={23} height={23}/>:<UploadIcon width={23} height={23} /> 
          ),
        }}
      />
      <Tab.Screen
        name={PROFILE_SELF}
        component={ProfileSelf}
        options={{
          headerShadowVisible: false,
          title: '',
          headerTitle:"jacob_w",
          headerTitleAlign: 'center',
          headerTitleStyle: navStyles.titleStyle,
          tabBarIcon: ({  focused  }) => (
            <Image source={{uri:user.profileImage}} style={{width:27, height:27,borderWidth:1, borderRadius:100 ,borderColor: focused ?Colors.textclr :Colors.lineColor ,}}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
