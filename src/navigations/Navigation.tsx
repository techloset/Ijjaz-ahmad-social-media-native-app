import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AUTH_STACK_NAVIGATION_SCREENS,
  STACK_NAVIGATION_SCREENS,
} from './NavigationScreens';
import {useDispatch, useSelector} from 'react-redux';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseUser, UserProfileData} from '../constants/AllTypes';
import {login, selectAuthState} from '../store/slices/authentication';
import firestore from '@react-native-firebase/firestore';
import {FIRE_BASE_COLLECTION} from '../constants/Collections';
const Stack = createNativeStackNavigator();
export default function Navigation() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const isAuth = useSelector(selectAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    auth().onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        readUserProfile(user);
      } else {
        setIsAppLoading(false);
      }
    });
    return;
  }, [auth]);

  const readUserProfile = (user: FirebaseUser) => {
    firestore()
      .collection(FIRE_BASE_COLLECTION.USERS)
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        const userData: UserProfileData =
          documentSnapshot.data() as UserProfileData;
        dispatch(login(userData as FirebaseAuthTypes.User));
      });
    setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);
  };
  return (
    <Stack.Navigator>
      {isAuth.isAuth ? (
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
