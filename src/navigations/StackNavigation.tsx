import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AUTH_STACK_NAVIGATION_SCREENS,
  STACK_NAVIGATION_SCREENS,
} from './navigationScreens';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {readUserProfile} from '../store/slices/authentication';
import {RootState} from '../store/Store';

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged(async (user: any) => {
      if (user) {
        await dispatch(readUserProfile(user) as any);
        setIsAppLoading(false);
      } else {
        setIsAppLoading(false);
      }
    });
    return;
  }, []);

  return (
    <Stack.Navigator>
      {isAuth ? (
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
