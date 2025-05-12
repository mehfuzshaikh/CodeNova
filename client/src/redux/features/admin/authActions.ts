import { AppDispatch } from '@/redux/store';
import { setCredentials, logout } from './authSlice';
import { getCurrentAdmin } from '@/lib/api/admin/auth';

export const loadAdmin = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getCurrentAdmin();
    console.log(res);
    dispatch(setCredentials(res.admin));
  } catch {
    dispatch(logout()); // Clear user on error (like expired token)
  }
};
