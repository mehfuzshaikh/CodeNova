import { AppDispatch } from "@/redux/store";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./userSlice";
import { getUsersListApi } from "@/lib/api/admin/user";

export const fetchAdminUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchUsersStart());
    const users = await getUsersListApi();
    dispatch(fetchUsersSuccess(users));
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const msg = error.response?.data?.message || "Failed to fetch users";
    dispatch(fetchUsersFailure(msg));
  }
};
