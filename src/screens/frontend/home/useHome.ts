import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {rootStatePost} from '../../../constants/AllTypes';
import {AppDispatch, RootState} from '../../../store/store';
import {fetchUsersData} from '../../../store/slices/usersData';
export default function useHome() {
  const user = useSelector((state: RootState) => state.auth.user);
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
