import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {routeProps} from '../../../constants/allTypes';
import {styles} from '../../../constants/globalStyle';
import {AUTH_STACK_SCREEN} from '../../../constants/navigationName';
import {Colors} from '../../../constants/colors';
import useLogin from './useLogin';
import PrimaryBtn from '../../../components/buttons/PrimaryBtn';
import Input from '../../../components/inputs/Input';
import TextLogo from '../../../components/TextLogo';
import GoogleSigninBtn from '../../../components/googleSignin/GoogleSigninBtn';
import SeperatorLine from '../../../components/SeperatorLine';
import TextLink from '../../../components/TextLink';
export default function Login({navigation}: routeProps) {
  const {loading, state, handleChange, handleSubmite} = useLogin();
  return (
    <View style={[styles.flexContainer]}>
      <ScrollView>
        <TextLogo />
        <View style={[styles.horizantalyCenter]}>
          <Input
            placeholder={'Enter your email'}
            value={state.email}
            onChangeText={(value: string) => handleChange('email', value)}
            type="text"
          />
          <Input
            placeholder={'Enter your password'}
            value={state.password}
            onChangeText={(value: string) => handleChange('password', value)}
            type={'password'}
          />
        </View>
        <View style={[styles.flexEnd]}>
          <TextLink
            onPress={() => {
              navigation.navigate(AUTH_STACK_SCREEN.FORGOT_PASSWORD);
            }}
            label="Forgot password?"
          />
        </View>
        <View style={[styles.horizantalyCenter]}>
          <PrimaryBtn
            label="Log In"
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
              Don't have an account.
              <Text
                onPress={() => {
                  navigation.navigate(AUTH_STACK_SCREEN.SIGNUP);
                }}
                style={{color: Colors.primary}}>
                Sign up.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
