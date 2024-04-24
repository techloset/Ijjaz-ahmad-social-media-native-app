import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {Google} from '../../constants/images';
import {notify} from '../../constants/globalStyle';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default function GoogleSigninBtn() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '653744361537-g09sb5tml9jree85icu3ddjbaoe5hvks.apps.googleusercontent.com',
    });
  }, []);
  const googleSignin = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // await GoogleSignin.signOut();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign = auth().signInWithCredential(googleCredential);
    user_sign
      .then(async () => {
        const userDoc = await firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .get();

        if (!userDoc.exists) {
          await firestore()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .set({
              displayName: auth().currentUser?.displayName,
              email: auth().currentUser?.email,
              photoUrl: auth().currentUser?.photoURL || null,
              uid: auth().currentUser?.uid,
            });
          notify(
            'User Login Successfully!',
            'wellcome to instagramMeToYou app',
            'success',
          );
        } else {
          notify(
            'User Login Successfully!',
            'wellcome to instagramMeToYou app',
            'success',
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{marginTop: 37}}>
      <Text onPress={googleSignin}>
        <Google
          width="16"
          height="16"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        Login with Google
      </Text>
    </View>
  );
}
