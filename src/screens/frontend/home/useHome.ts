import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {rootStatePost} from '../../../constants/AllTypes';
import {AppDispatch} from '../../../store/store';
import {useAuthContext} from '../../../context/AuthContext';
import {fetchUsersData} from '../../../store/slices/usersData';
export default function useHome() {
  const {user} = useAuthContext();
  const usersData = useSelector(
    (state: rootStatePost) => state.usersData.usersData,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsersData());
  }, []);
  return {
    user,
    usersData,
  };
}
