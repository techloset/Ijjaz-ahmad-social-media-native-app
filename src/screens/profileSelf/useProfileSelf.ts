import {notify} from '../../constants/GlobalStyle';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {logout} from '../../store/slices/authentication'
export default function useProfileSelf() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    auth()
      .signOut()
      dispatch(logout() );
      notify('User Logout!', '', 'success');
    
  };
  return {
    handleLogout,
    user,
  };
}
