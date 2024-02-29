import React from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import { routeProps } from '../../../constants/AllTypes';
import { styles } from '../../../constants/GlobalStyle';
import { authstyles } from '../authStyle';

import { AUTH_STACK_SCREEN } from '../../../constants/Navigation';
import { Google, LargLogo } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
import useLogin from './useLogin';
export default function Login({ navigation }: routeProps) {
  const { loading, state, handleChange, handleSubmite, handleGoogleSignin } = useLogin()

  return (
    <View style={[styles.flexContainer]}>
      <ScrollView >
        <View style={[styles.horizantalyCenter, authstyles.textLogo]}>
          <LargLogo />
        </View>
        <View style={[styles.horizantalyCenter]}>
          <TextInput
            style={styles.formControl}
            placeholder='Enter your email'
            placeholderTextColor={Colors.lineColor}
            keyboardType='email-address'
            value={state.email}
            onChangeText={(value: string) => handleChange("email", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter your password'
            placeholderTextColor={Colors.lineColor}
            value={state.password}
            secureTextEntry
            onChangeText={(value: string) => handleChange("password", value)}
          />
        </View>
        <View style={[styles.flexEnd]}>
          <Text style={authstyles.forget} onPress={() => { navigation.navigate(AUTH_STACK_SCREEN.FORGOT_PASSWORD) }}>Forgot password?</Text>
        </View>
        <View style={[styles.horizantalyCenter]}>
          <View style={{ width: "90%" }}>
            {loading ?
              <Button title='loading...'
                disabled={true}
              />
              :
              <Button
                title='Log In'
                onPress={handleSubmite}
              />
            }
          </View>
        </View>
        <View style={[styles.horizantalyCenter]}>
          <View style={{ display: "flex", flexDirection: "row", marginVertical: 30 }}>
            <Google width="16.67" height="16.67" style={{ marginHorizontal: 10, }} />
            <Text style={[styles.fontL, styles.fontWeightXl, styles.SpacingM, { textAlign: "center", color: Colors.textclr }]} onPress={handleGoogleSignin}>Login with Google</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginVertical: 5 }}>
            <View style={[authstyles.line]}></View>
            <Text style={[styles.fontSm, styles.fontWeightXl, styles.SpacingSm, { textAlign: "center", color: Colors.textLight }]}>OR</Text>
            <View style={[authstyles.line]}></View>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Text style={[styles.fontL, styles.fontWeightM, styles.SpacingM, { textAlign: "center", color: Colors.textLight }]}>Don't have an account.<Text style={authstyles.forget} onPress={() => { navigation.navigate(AUTH_STACK_SCREEN.SIGNUP) }} >Sign up.</Text></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}