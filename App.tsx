import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Navigation from './src/navigations/Navigation';
import { Store } from './src/store/store';
import { Provider } from 'react-redux';
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 4000);
  }, [])
  return (
    <NavigationContainer>
        <Provider store={Store}>
          <Navigation />
        </Provider>
      <Toast />
    </NavigationContainer>
  )
}