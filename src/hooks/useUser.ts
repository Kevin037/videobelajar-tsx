// hooks/useUser.js
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getUserById, registerUserThunk, resetUser, updateUserPhotoThunk, updateUserThunk } from '../services/api/userSlice';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/services/store';
import { UpdateUserData, UserData } from '@/services/types';

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { currentUser, loading, error, status } = useTypedSelector(state => state.user);

  // Fungsi register, terima userData misal { name, email, password }
  const register = (userData:UserData) => {
    dispatch(registerUserThunk(userData));
  };

    const update = (userData:UpdateUserData) => {
      dispatch(updateUserThunk(userData));
    };

    const updateImage = (userData:FormData) => {
      dispatch(updateUserPhotoThunk(userData));
    };

  // Optional reset state
  const reset = () => dispatch(resetUser());

    useEffect(() => {
        dispatch(getUserById());
    }, [dispatch]);

  return { currentUser, loading, error, register, reset, update, status, updateImage };
};

export default useUser;