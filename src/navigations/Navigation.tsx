import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AUTH_STACK_NAVIGATION_SCREENS,
  STACK_NAVIGATION_SCREENS,
} from './NavigationScreens';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {FirebaseUser, userType} from '../constants/AllTypes';
import { readUserProfile} from '../store/slices/authentication';
const Stack = createNativeStackNavigator();
export default function Navigation() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    auth().onAuthStateChanged( async (user :any) => {
      if (user) {
        await dispatch(readUserProfile(user) as any ) ;
        setUser(user)
        setIsAppLoading(false);
      } else {
        setIsAppLoading(false);
      }
    });
    return;
  }, []);

  
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          {STACK_NAVIGATION_SCREENS.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  headerShadowVisible: false,
                  headerShown: false,
                  title: '',
                }}
              />
            );
          })}
        </Stack.Group>
      ) : (
        <Stack.Group>
          {AUTH_STACK_NAVIGATION_SCREENS.map((item, index) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{headerShadowVisible: false, title: ''}}
              />
            );
          })}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
