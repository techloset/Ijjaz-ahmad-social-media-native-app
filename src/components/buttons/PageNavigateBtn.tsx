import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {customStyles} from '../../screens/screenStyling';
import {styles} from '../../constants/globalStyle';
import {Colors} from '../../constants/colors';
import { PageNavigateBtnProps } from '../../constants/allTypes';

export default function PageNavigateBtn({
  onPress,
  label,
}: PageNavigateBtnProps) {
  return (
    <View style={{width: '90%'}}>
      <TouchableOpacity style={customStyles.btn} onPress={onPress}>
        <Text
          style={[
            styles.fontWeightXl,
            styles.fontM,
            {textAlign: 'center', color: Colors.textclr},
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
