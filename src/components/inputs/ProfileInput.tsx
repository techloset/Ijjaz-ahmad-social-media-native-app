import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from '../../constants/GlobalStyle';
import {Colors} from '../../constants/Colors';
type InputProps = {
  placeholder: string;
  label: string;
  value: string | undefined;
  onChangeText: (value: string) => void;
  type: 'text' | 'password';
};
export default function ProfileInput({
  placeholder,
  value,
  onChangeText,
  type,
  label,
}: InputProps) {
  return (
    <View style={[styles.flexRow, styles.horizantalyCenter]}>
      <View style={{width: '30%'}}>
        <Text
          style={[
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            styles.SpacingSm,
            {color: Colors.textclr},
          ]}>
          {' '}
          {label}{' '}
        </Text>
      </View>
      <TextInput
        style={[
          styles.fontSm,
          styles.fontWeightM,
          styles.lineHightFirst,
          styles.SpacingExSm,
          {
            color: Colors.textclr,
            borderBottomWidth: 0.33,
            borderColor: Colors.borderColor,
            width: '70%',
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.lineColor}
        keyboardType="default"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password'}
      />
    </View>
  );
}
