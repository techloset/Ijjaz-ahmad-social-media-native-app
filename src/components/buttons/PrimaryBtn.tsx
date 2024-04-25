import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from '../../constants/globalStyle';
import {Colors} from '../../constants/colors';
import { PrimaryBtnProps } from '../../constants/allTypes';

export default function PrimaryBtn({loading, onPress, label}: PrimaryBtnProps) {
  return (
    <View style={{width: '90%'}}>
      {loading ? (
        <TouchableOpacity style={styles.btnPrimary} disabled={true}>
          <Text
            style={[
              styles.fontWeightXl,
              styles.fontM,
              {textAlign: 'center', color: Colors.white},
            ]}>
            Loading...
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnPrimary} onPress={onPress}>
          <Text
            style={[
              styles.fontWeightXl,
              styles.fontM,
              {textAlign: 'center', color: Colors.white},
            ]}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
