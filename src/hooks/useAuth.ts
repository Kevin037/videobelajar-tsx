import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, logOutuserThunk } from '../services/api/authSlice';
import { AppDispatch, RootState } from '@/services/store';
import { LoginCredentials } from '@/services/types';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user, loading, error, status } = useTypedSelector(state => state.auth);

  const login = (userData: LoginCredentials) => {
    dispatch(loginUserThunk(userData));
  };

    const logOut = () => {
      dispatch(logOutuserThunk());
    };

  return { user, loading, error, login, logOut, status };
};

export default useAuth;
