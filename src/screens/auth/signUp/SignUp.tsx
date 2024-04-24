import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {routeProps} from '../../../constants/allTypes';
import {styles} from '../../../constants/globalStyle';
import {AUTH_STACK_SCREEN} from '../../../constants/navigationName';
import {Colors} from '../../../constants/colors';
import useSignUp from './useSignUp';
import TextLogo from '../../../components/TextLogo';
import Input from '../../../components/inputs/Input';
import TextLink from '../../../components/TextLink';
import PrimaryBtn from '../../../components/buttons/PrimaryBtn';
import SeperatorLine from '../../../components/SeperatorLine';
import GoogleSigninBtn from '../../../components/googleSignin/GoogleSigninBtn';
export default function Signup({navigation}: routeProps) {
  const {loading, state, handleChange, handleSubmite} = useSignUp();
  return (
    <View style={[styles.flexContainer]}>
      <ScrollView>
        <TextLogo />
        <View style={[styles.horizantalyCenter]}>
          <Input
            placeholder={'Username'}
            value={state.username}
            onChangeText={value => handleChange('username', value)}
            type="text"
          />
          <Input
            placeholder={'Email'}
            value={state.email}
            onChangeText={value => handleChange('email', value)}
            type="text"
          />
          <Input
            placeholder={'Password'}
            value={state.password}
            onChangeText={value => handleChange('password', value)}
            type="password"
          />
          <Input
            placeholder={'Confirm Password'}
            value={state.confirmPassword}
            onChangeText={value => handleChange('confirmPassword', value)}
            type="password"
          />
        </View>
        <View style={[styles.flexEnd]}>
          <TextLink
            onPress={() => {
              navigation.navigate(AUTH_STACK_SCREEN.FORGOT_PASSWORD);
            }}
            label="Forgot password"
          />
        </View>
        <View style={[styles.horizantalyCenter]}>
          <PrimaryBtn
            label="Sign Up"
            onPress={handleSubmite}
            loading={loading}
          />
        </View>
        <View style={[styles.horizantalyCenter]}>
          <GoogleSigninBtn />
          <SeperatorLine />
          <View>
            <Text
              style={[
                styles.fontL,
                styles.fontWeightM,
                styles.SpacingM,
                {textAlign: 'center', color: Colors.textLight, marginTop: 41},
              ]}>
              Already have an account?
              <TextLink
                onPress={() => {
                  navigation.navigate(AUTH_STACK_SCREEN.LOGIN);
                }}
                label="Log In"
              />
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
