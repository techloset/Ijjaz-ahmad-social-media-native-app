import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from '../../constants/GlobalStyle';
import {Colors} from '../../constants/Colors';
type BtnProps = {loading: boolean; onPress: () => void; label: string};
export default function PrimaryBtn({loading, onPress, label}: BtnProps) {
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
