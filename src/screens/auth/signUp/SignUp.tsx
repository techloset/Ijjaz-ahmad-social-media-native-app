import React from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import { routeProps } from '../../../constants/AllTypes';
import { styles } from '../../../constants/GlobalStyle';
import { authstyles } from '../authStyle';
import { AUTH_STACK_SCREEN } from '../../../constants/Navigation';
import { Google, LargLogo } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
import useSignUp from './useSignUp';

export default function Signup({ navigation }: routeProps) {
  const { loading, state, handleChange, handleSubmite } = useSignUp()
  return (
    <View style={[styles.flexContainer]}>
      <ScrollView >
        <View style={[authstyles.textLogo, styles.horizantalyCenter]}>
          <LargLogo />
        </View>
        <View style={[styles.horizantalyCenter]}>
          <TextInput
            style={styles.formControl}
            placeholder='Username'
            placeholderTextColor={Colors.lineColor}
            value={state.username}
            onChangeText={(value: string) => handleChange("username", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Email'
             placeholderTextColor={Colors.lineColor}
            keyboardType='email-address'
            value={state.email}
            onChangeText={(value: string) => handleChange("email", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Password'
             placeholderTextColor={Colors.lineColor}
            value={state.password}
            secureTextEntry
            onChangeText={(value: string) => handleChange("password", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Confirm Password'
             placeholderTextColor={Colors.lineColor}
            value={state.confirmPassword}
            secureTextEntry
            onChangeText={(value: string) => handleChange("confirmPassword", value)}
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
                title='Sign Up'
                onPress={handleSubmite}
              />

            }
          </View>
        </View>
        <View style={[styles.horizantalyCenter]}>
          <View style={{ display: "flex", flexDirection: "row", marginVertical: 30 }}>
            <Google width="16.67" height="16.67" style={{ marginHorizontal: 10, }} />
            <Text style={[styles.fontL, styles.fontWeightXl, styles.SpacingM, { textAlign: "center", color: Colors.textclr }]} >Login with Google</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginVertical: 5 }}>
            <View style={[authstyles.line]}></View>
            <Text style={[styles.fontSm, styles.fontWeightXl, styles.SpacingSm, { textAlign: "center", color: Colors.textLight }]}>OR</Text>
            <View style={[authstyles.line]}></View>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Text style={[styles.fontL, styles.fontWeightM, styles.SpacingM, { textAlign: "center", color: Colors.textLight }]}>Don't have an account.<Text style={authstyles.forget} onPress={() => { navigation.navigate(AUTH_STACK_SCREEN.LOGIN) }} >Login.</Text></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}