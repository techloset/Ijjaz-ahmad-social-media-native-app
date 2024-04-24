import {View, Text} from 'react-native';
import React from 'react';
import {authstyles} from '../screens/auth/authStyle';
import {styles} from '../constants/globalStyle';
import {Colors} from '../constants/colors';
export default function SeperatorLine() {
  return (
    <View style={{display: 'flex', flexDirection: 'row', marginTop: 41}}>
      <View style={[authstyles.line]}></View>
      <Text
        style={[
          styles.fontSm,
          styles.fontWeightXl,
          styles.SpacingSm,
          {textAlign: 'center', color: Colors.textLight},
        ]}>
        OR
      </Text>
      <View style={[authstyles.line]}></View>
    </View>
  );
}
