import {useEffect} from 'react';
import {SigninUserData} from '../../../constants/AllTypes';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {notify} from '../../../constants/GlobalStyle';
import {useDispatch} from 'react-redux';
const initialState = {email: '', password: ''};
interface UserData {
  user?: {
    name?: string;
  };
}
const useLogin = () => {
  const [loading, setisloading] = useState(false);
  const [state, setState] = useState(initialState);
  const [userinfo, setUserInfo] = useState<UserData | null>(null);
  const dispatch = useDispatch();
  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };
  const handleSubmite = () => {
    const {email, password} = state;
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) {
      return notify('plz Enter Email', ' formate like: abc@gmail.com', 'error');
    }
    if (!validRegex.test(email)) {
      return notify(
        'Invalid Email Format',
        ' formate like: abc@gmail.com',
        'error',
      );
    }
    if (password.length < 6) {
      return notify(
        'Invalid Password',
        'Password length minimum 6 character',
        'error',
      );
    }
    let userData = {email, password};
    setisloading(true);
    createUser(userData);
    setState(initialState);
  };
  const createUser = (userData: SigninUserData): void => {
    auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        notify(
          'User Login Successfully!',
          'wellcome to instagramMeToYou app',
          'success',
        );
        setisloading(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setisloading(false);
          return notify(
            'Email Error',
            'That email address is already register!',
            'error',
          );
        }

        if (error.code === 'auth/invalid-email') {
          setisloading(false);
          return notify('Email|Password Error', 'plz try again', 'error');
        }
        setisloading(false);
        return notify('Email|Password Error', 'plz try again', 'error');
      });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '653744361537-g09sb5tml9jree85icu3ddjbaoe5hvks.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      notify(
        'User Login Successfully!',
        'wellcome to instagramMeToYou app',
        'success',
      );
      dispatch({type: 'Login', payload: {userData}});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('🚀 ~ Login ~ userinfo:', userinfo);
      }
    }
  };
  return {
    loading,
    setisloading,
    state,
    setState,
    userinfo,
    setUserInfo,
    handleChange,
    handleSubmite,
    handleGoogleSignin,
  };
};

export default useLogin;
