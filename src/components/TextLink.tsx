import {View, Text} from 'react-native';
import React from 'react';
import {authstyles} from '../screens/auth/authStyle';
type TextLinkProps = {
  label: string;
  onPress: () => void;
};
export default function TextLink({onPress, label}: TextLinkProps) {
  return (
    <Text style={authstyles.forget} onPress={onPress}>
      {label}
    </Text>
  );
}
