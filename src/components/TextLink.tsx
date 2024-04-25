import {View, Text} from 'react-native';
import React from 'react';
import {authstyles} from '../screens/auth/authStyle';
import { PageNavigateBtnProps } from '../constants/allTypes';

export default function TextLink({onPress, label}: PageNavigateBtnProps) {
  return (
    <Text style={authstyles.forget} onPress={onPress}>
      {label}
    </Text>
  );
}
