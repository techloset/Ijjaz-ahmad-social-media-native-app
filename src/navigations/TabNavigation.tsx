import Home from '../screens/home/Home';
import {
  HomeHover,
  HomeIcon,
  SmallLogo,
  UploadHover,
  UploadIcon,
} from '../constants/Images';
import {BOTTOM_TAB_SCREEN} from '../constants/Navigation';
import ProfileSelf from '../screens/profileSelf/ProfileSelf';
import UploadPost from '../screens/uploadPost/UploadPost';
import {Image} from 'react-native';
import {Colors} from '../constants/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {styles} from '../constants/GlobalStyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const {HOME, UPLOAD_POST, PROFILE_SELF} = BOTTOM_TAB_SCREEN;
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarStyle: {paddingTop: 10},
      })}>
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          headerShadowVisible: true,
          title: '',
          headerTitle: () => <SmallLogo />,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeHover width={30} height={35} />
            ) : (
              <HomeIcon width={22} height={23} />
            ),
        }}
      />
      <Tab.Screen
        name={UPLOAD_POST}
        component={UploadPost}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <UploadHover width={23} height={23} />
            ) : (
              <UploadIcon width={23} height={23} />
            ),
        }}
      />
      <Tab.Screen
        name={PROFILE_SELF}
        component={ProfileSelf}
        options={{
          headerShadowVisible: false,
          title: '',
          headerTitle: `${user?.username}`,
          headerTitleAlign: 'center',
          headerTitleStyle: [
            styles.fontWeightXl,
            styles.fontXxl,
            styles.SpacingExSm,
            {color: Colors.textclr},
          ],
          tabBarIcon: ({focused}) => (
            <Image
              source={{uri: user.profileImage}}
              style={{
                width: 27,
                height: 27,
                borderWidth: 1,
                borderRadius: 100,
                borderColor: focused ? Colors.textclr : Colors.lineColor,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
