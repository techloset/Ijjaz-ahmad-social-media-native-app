import React from 'react';
import {View} from 'react-native';
import {styles} from '../../constants/GlobalStyle';
import {TabsIcon} from '../../constants/Images';
import {STACK_SCREENS} from '../../constants/Navigation';
import useProfileSelf from './useProfileSelf';
import PageNavigateBtn from '../../components/buttons/PageNavigateBtn';
import ProfileCard from '../../components/profileCard/ProfileCard';
import UserPostCard from '../../components/UserPostCard/UserPostCard';
export default function ProfileSelf({navigation}: any) {
  const {handleLogout, user} = useProfileSelf();
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
