import React, {useState} from 'react';
import {notify} from '../../../constants/globalStyle';
import auth from '@react-native-firebase/auth';
import {ForgotData} from '../../../constants/allTypes';

const initialState = {email: ''};

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };

  const handleSubmite = () => {
    const {email} = state;
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
    let userData = {email};
    setLoading(true);
    createUser(userData);
    setState(initialState);
  };

  const createUser = async (userData: ForgotData) => {
    try {
      await auth().sendPasswordResetEmail(userData.email);
      notify(
        'Password Reset Email Sent',
        `A password reset email has been sent to ${userData.email}. Please check your inbox.`,
        'error',
      );
      setLoading(false);
    } catch (error) {
      notify('Forgot Password Error:', 'Try again', 'error');
      setLoading(false);
    }
  };

  return {loading, state, handleChange, handleSubmite};
};

export default useForgotPassword;
