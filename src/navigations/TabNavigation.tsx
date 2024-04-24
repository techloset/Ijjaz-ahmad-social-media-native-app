import Feed from '../screens/feed/Feed';
import {
  FoucsUser,
  HomeHover,
  HomeIcon,
  SmallLogo,
  UploadHover,
  UploadIcon,
  User,
} from '../constants/images';
import {BOTTOM_TAB_SCREEN} from '../constants/navigationName';
import MyProfile from '../screens/myProfile/MyProfile';
import UploadPost from '../screens/createPost/CreatePost';
import {Image} from 'react-native';
import {Colors} from '../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {styles} from '../constants/globalStyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
type TabProfileCardProps = {
  profileImage: string | undefined;
  focused: boolean;
};
const Tab = createBottomTabNavigator();
const TabProfileCard = ({profileImage, focused}: TabProfileCardProps) => {
  return (
    <>
      {profileImage ? (
        <Image
          source={{uri: profileImage}}
          style={{
            width: 27,
            height: 27,
            borderWidth: 1,
            borderRadius: 100,
            borderColor: focused ? Colors.textclr : Colors.lineColor,
          }}
        />
      ) : focused ? (
        <User
          width={27}
          height={27}
          style={{
            borderWidth: 3,
            borderRadius: 100,
          }}
        />
        
      ) : (
        <FoucsUser width={27}
        height={27}  style={{
          borderWidth: 3,
          borderRadius: 100,
          borderColor: Colors.primary,
        }} />
      )}
    </>
  );
};
function MyTabs() {
  const {FEED, UPLOAD_POST, MY_PROFILE} = BOTTOM_TAB_SCREEN;
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarStyle: {paddingTop: 10},
      })}>
      <Tab.Screen
        name={FEED}
        component={Feed}
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
        name={MY_PROFILE}
        component={MyProfile}
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
          
            <TabProfileCard
              profileImage={user.profileImage}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
