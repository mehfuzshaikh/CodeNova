import { AppDispatch } from '@/redux/store';
import { setCredentials, logout } from './authSlice';
import { getCurrentUser } from '@/lib/api/user';

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getCurrentUser();
    dispatch(setCredentials(res.user));
  } catch {
    dispatch(logout()); // Clear user on error (like expired token)
  }
};
