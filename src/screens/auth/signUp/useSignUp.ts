import {UserData} from '../../../constants/AllTypes';
import {useState} from 'react';
import {notify} from '../../../constants/GlobalStyle';
import {useDispatch} from 'react-redux';
import { createUser } from '../../../store/slices/signUp';
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
  const handleSubmite =async () => {
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
    let userData: UserData = {username, email,password};
    userData.role = 'user';
    userData.status = 'active';
    userData.profileImage = '';
    userData.website = '';
    userData.bio = '';
    userData.phone = '';
    userData.gender = '';
    userData.name = '';
    setisloading(true);
   await dispatch(createUser(userData) as any);
    setState(initialState);
    setisloading(false);
  };
  return {loading, setisloading, state, setState, handleChange, handleSubmite};
}
