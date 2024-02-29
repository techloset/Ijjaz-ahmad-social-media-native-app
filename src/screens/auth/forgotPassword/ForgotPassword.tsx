import React from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import { styles } from '../../../constants/GlobalStyle';
import { authstyles } from '../authStyle';
import { LargLogo } from '../../../constants/Images';
import useForgotPassword from './useForgotPassword';
import { Colors } from '../../../constants/Colors';

export default function ForgotPassword() {
  const { loading, state, handleChange, handleSubmite } = useForgotPassword();

  return (
    <View style={[styles.flexContainer]}>
      <ScrollView >
        <View style={[styles.horizantalyCenter]}>
          <View style={[authstyles.textLogo, styles.horizantalyCenter, { marginTop: 100 }]}>
            <LargLogo />
            <Text style={{ textAlign: "center", marginTop: 15 }}>Forgot your password? write your email and we will send you a magic link to reset your password</Text>
          </View>
          <TextInput
            style={[styles.formControl, { marginTop: 60, marginBottom: 20 }]}
            placeholder='Enter your email'
            placeholderTextColor={Colors.lineColor}
            keyboardType='email-address'
            value={state.email}
            onChangeText={(value: string) => handleChange("email", value)}
          />
          <View style={{ width: "90%" }}>
            {loading ?
              <Button title='loading...'
                disabled={true}
              />
              :
              <Button
                title='Send Magic Link'
                onPress={handleSubmite}
              />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
