import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {customStyles} from '../../screens/FrontendStyle';
import {User} from '../../constants/Images';
import {styles} from '../../constants/GlobalStyle';
import {Colors} from '../../constants/Colors';
import { userType } from '../../constants/AllTypes';
type ProfileCardProps = {
  state: userType;
}

export default function ProfileCard({
  state
}: ProfileCardProps) {
  return (
    <>
      <View style={[customStyles.border, {overflow: 'hidden'}]}>
        <TouchableOpacity>
          {!state.profileImage ? (
            <User width="86" height="86" style={customStyles.profileImg} />
          ) : (
            <Image
              source={{uri: state.profileImage}}
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
          {state.username}
        </Text>
        <Text
          style={[
            customStyles.textCenter,
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            {color: Colors.textclr},
          ]}>
          {state.bio}
        </Text>
      </View>
    </>
  );
}
