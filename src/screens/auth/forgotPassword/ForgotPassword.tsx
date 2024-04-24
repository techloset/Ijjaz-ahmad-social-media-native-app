import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from '../../../constants/globalStyle';
import {authstyles} from '../authStyle';
import {LargLogo} from '../../../constants/images';
import useForgotPassword from './useForgotPassword';
import Input from '../../../components/inputs/Input';
import PrimaryBtn from '../../../components/buttons/PrimaryBtn';
export default function ForgotPassword() {
  const {loading, state, handleChange, handleSubmite} = useForgotPassword();
  return (
    <View style={[styles.flexContainer]}>
      <ScrollView>
        <View style={[styles.horizantalyCenter]}>
          <View style={[styles.horizantalyCenter, authstyles.textLogo]}>
            <LargLogo width={182} height={49} />
            <Text style={{textAlign: 'center', marginTop: 15}}>
              Forgot your password? write your email and we will send you a
              magic link to reset your password
            </Text>
          </View>
          <Input
            placeholder={'Enter your email'}
            value={state.email}
            onChangeText={(value: string) => handleChange('email', value)}
            type="text"
          />
          <PrimaryBtn
            label="Send Magic Link"
            onPress={handleSubmite}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
