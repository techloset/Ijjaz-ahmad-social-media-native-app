import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {fetchUsersData} from '../../store/slices/usersFeed';
export default function useFeed() {
  const user = useSelector((state: RootState) => state.auth.user);
  const usersData = useSelector(
    (state: RootState) => state.usersFeed.usersData,
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
