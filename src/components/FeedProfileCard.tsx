import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from '../constants/globalStyle';
import {ThreeDots, User} from '../constants/images';
import {Colors} from '../constants/colors';
type FeedProfileCardProps = {
  uri: string | undefined;
  username: string | undefined;
  onPress: () => void;
};
export default function FeedProfileCard({
  uri,
  username,
  onPress,
}: FeedProfileCardProps) {
  return (
    <View
      style={[
        styles.flexRow,
        styles.horizantalyBetween,
        styles.horizantalyCenter,
        {padding: 13},
      ]}>
      <View style={[styles.flexRow]}>
        <TouchableOpacity onPress={onPress}>
          {!uri ? (
            <User width="32" height=" 32" style={{borderRadius: 100}} />
          ) : (
            <Image
              source={{uri}}
              style={{borderRadius: 100, width: 32, height: 32}}
            />
          )}
        </TouchableOpacity>
        <View style={{marginStart: 10}}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              {color: Colors.textclr},
            ]}>
            {username}
          </Text>
        </TouchableOpacity>
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingSm,
              {color: Colors.textclr},
            ]}>
            Tokyo, Japan
          </Text>
        </View>
      </View>
      <View>
        <ThreeDots />
      </View>
    </View>
  );
}
