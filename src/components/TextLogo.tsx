import {View} from 'react-native';
import React from 'react';
import {styles} from '../constants/GlobalStyle';
import {authstyles} from '../screens/auth/authStyle';
import {LargLogo} from '../constants/Images';
export default function TextLogo() {
  return (
    <View style={[styles.horizantalyCenter, authstyles.textLogo]}>
      <LargLogo width={182} height={49} />
    </View>
  );
}
