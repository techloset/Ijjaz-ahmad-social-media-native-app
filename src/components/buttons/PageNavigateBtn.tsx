import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {customStyles} from '../../screens/FrontendStyle';
import {styles} from '../../constants/GlobalStyle';
import {Colors} from '../../constants/Colors';
type PageNavigateBtnProps = {
  onPress: () => void;
  label: string;
};
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
