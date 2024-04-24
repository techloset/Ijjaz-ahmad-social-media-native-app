import React from 'react';
import {View} from 'react-native';
import {styles} from '../../constants/globalStyle';
import {TabsIcon} from '../../constants/images';
import {STACK_SCREENS} from '../../constants/navigationName';
import useMyProfile from './useMyProfile';
import PageNavigateBtn from '../../components/buttons/PageNavigateBtn';
import ProfileCard from '../../components/profileCard/ProfileCard';
import UserPostCard from '../../components/userPostCard/UserPostCard';
export default function MyProfile({navigation}: any) {
  const {handleLogout, user} = useMyProfile();
  return (
    <View style={[styles.flexContainer]}>
      <View style={[styles.horizantalyCenter]}>
        <ProfileCard state={user} />
        <PageNavigateBtn
          onPress={() => navigation.navigate(STACK_SCREENS.PROFILE_EDIT)}
          label="Edit Profile"
        />
        <PageNavigateBtn onPress={handleLogout} label="Logout" />
        <View>
          <TabsIcon />
        </View>
      </View>
      <UserPostCard />
    </View>
  );
}
