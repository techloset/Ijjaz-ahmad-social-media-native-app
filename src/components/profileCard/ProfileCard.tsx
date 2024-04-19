import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { customStyles } from '../../screens/FrontendStyle';
import { User } from '../../constants/Images';
import { styles } from '../../constants/GlobalStyle';
import { Colors } from '../../constants/Colors';
import useProfileCard from './useProfileCard';
import useProfileSelf from '../../screens/profileSelf/useProfileSelf';

export default function ProfileCard() {
  const {user} = useProfileCard()
  console.log("🚀 ~ ProfileCard ~ user:", user)
  return (
    <>
      <View style={[customStyles.border, {overflow: 'hidden'}]}>
        <TouchableOpacity>
          {user.profileImage === '' ? (
            <User width="86" height="86" style={customStyles.profileImg} />
          ) : (
            <Image
              source={{uri: user.profileImage}}
              style={customStyles.profileImg}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.horizantalyCenter, customStyles.bio]}>
        <Text
          style={[
            styles.fontL,
            styles.fontWeightXl,
            styles.SpacingSm,
            {color: Colors.textclr},
          ]}>
          {user.username}
        </Text>
        <Text
          style={[
            customStyles.textCenter,
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            {color: Colors.textclr},
          ]}>
          {user.bio}
        </Text>
      </View>
    </>
  );
}
