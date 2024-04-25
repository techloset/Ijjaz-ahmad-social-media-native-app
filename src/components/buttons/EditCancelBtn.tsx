import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../constants/globalStyle';
import {Colors} from '../../constants/colors';
import { EditCancelBtnProps } from '../../constants/allTypes';

export default function EditCancelBtn({
  label,
  focusedText,
  onCancel,
  onEdit,
}: EditCancelBtnProps) {
  return (
    <>
      <TouchableOpacity onPress={onCancel}>
        <Text
          style={[
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            styles.SpacingExSm,
            {color: focusedText === 'cancel' ? 'red' : Colors.textclr},
          ]}>
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <Text
          style={[
            styles.fontM,
            styles.fontWeightXl,
            styles.SpacingM,
            {color: focusedText === 'edit' ? 'blue' : Colors.textclr},
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </>
  );
}
