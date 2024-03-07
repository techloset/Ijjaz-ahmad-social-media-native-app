import {UserData} from '../../../constants/AllTypes';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {notify} from '../../../constants/GlobalStyle';
import {FIRE_BASE_COLLECTION} from '../../../constants/Collections';
import {login} from '../../../store/slices/authentication';
import {useDispatch} from 'react-redux';
const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export default function useSignUp() {
  const [loading, setisloading] = useState(false);
  const [state, setState] = useState(initialState);

  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };
  const dispatch = useDispatch();
  const handleSubmite = () => {
    const {username, email, password, confirmPassword} = state;
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (username.length < 3) {
      return notify(
        'plz Enter Username',
        'username length minimum 3 character ',
        'error',
      );
    }
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
    if (confirmPassword != password) {
      return notify('Enter Confirm Password', 'Password Not match', 'error');
    }
    let userData: UserData = {username, email};
    userData.role = 'user';
    userData.status = 'active';
    userData.profileImage = '';
    userData.website = '';
    userData.bio = '';
    userData.phone = '';
    userData.gender = '';
    userData.name = '';
    setisloading(true);
    createUser(userData);
    setState(initialState);
    setisloading(false);
  };
  const createUser = (userData: UserData): void => {
    auth()
      .createUserWithEmailAndPassword(userData.email, state.password)
      .then(userCredential => {
        const user = userCredential.user;
        userData.uid = user.uid;
        firestore()
          .collection(FIRE_BASE_COLLECTION.USERS)
          .doc(userData.uid)
          .set(userData)
          .then(() => {
            dispatch(login(userData as any));
            notify('Success', 'User SignUp Successfully', 'success');
            setisloading(false);
          })
          .catch(error => {
            notify('Error', 'User SignUp failed', 'error');
          });
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
  return {loading, setisloading, state, setState, handleChange, handleSubmite};
}
