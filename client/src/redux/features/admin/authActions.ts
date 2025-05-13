import { AppDispatch } from '@/redux/store';
import { setAdminCredentials,adminLogout } from './authSlice';
import { getCurrentAdmin } from '@/lib/api/admin/auth';

export const loadAdmin = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getCurrentAdmin();
    dispatch(setAdminCredentials(res.admin));
  } catch {
    dispatch(adminLogout()); // Clear user on error (like expired token)
  }
};
