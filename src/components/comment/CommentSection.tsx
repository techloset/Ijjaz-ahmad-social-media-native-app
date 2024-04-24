import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../constants/globalStyle';
import {ProfileIcon} from '../../constants/images';
import {Colors} from '../../constants/colors';

export default function CommentSection() {
  return (
    <>
      <View style={[styles.flexRow, {marginHorizontal: 15}]}>
        <ProfileIcon style={{width: 17, height: 17, borderRadius: 100}} />
        <Text
          style={[
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            styles.SpacingSm,
            {marginStart: 7, color: Colors.textclr},
          ]}>
          Liked by{' '}
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              {color: Colors.textclr},
            ]}>
            craig_love
          </Text>{' '}
          and{' '}
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              {color: Colors.textclr},
            ]}>
            {' '}
            44,686 others
          </Text>
        </Text>
      </View>
      <View style={{marginBottom: 13, marginTop: 7}}>
        <Text
          style={[
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            styles.SpacingM,
            {marginStart: 15, color: Colors.textclr},
          ]}>
          <Text
            style={[
              styles.fontM,
              styles.fontWeightXl,
              styles.SpacingM,
              {color: Colors.textclr},
            ]}>
            joshua_l
          </Text>{' '}
          The game in Japan was amazing and I want to share some photos
        </Text>
      </View>
      <View style={{marginBottom: 13}}>
        <Text
          style={[
            styles.fontExSm,
            styles.fontWeightM,
            styles.SpacingL,
            {marginStart: 15, color: Colors.lineColor},
          ]}>
          September 19
        </Text>
      </View>
    </>
  );
}
