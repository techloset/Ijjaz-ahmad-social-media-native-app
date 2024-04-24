import React from 'react';
import {TextInput} from 'react-native';
import {styles} from '../../constants/globalStyle';
import {Colors} from '../../constants/colors';
type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  type: 'text' | 'password';
};
export default function Input({
  placeholder,
  value,
  onChangeText,
  type,
}: InputProps) {
  return (
    <TextInput
      style={styles.formControl}
      placeholder={placeholder}
      placeholderTextColor={Colors.lineColor}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={type === 'password'}
    />
  );
}
