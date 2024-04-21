import {notify} from '../../constants/GlobalStyle';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {logout} from '../../store/slices/authentication';
export default function useProfileSelf() {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logout());
        notify('User Logout!', '', 'success');
      });
  };
  return {
    handleLogout,
  };
}
