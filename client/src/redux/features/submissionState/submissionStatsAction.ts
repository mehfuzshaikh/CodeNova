import { AppDispatch } from "@/redux/store";
import { getSubmissionsApi } from "@/lib/api/problem";
import {
  fetchSubmissionsStart,
  fetchSubmissionsSuccess,
  fetchSubmissionsFailure,
} from "./submissionStatsSlice";

export const fetchSubmissionStats = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchSubmissionsStart());
    const res = await getSubmissionsApi();
    dispatch(fetchSubmissionsSuccess(res.submissions));
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const msg = error.response?.data?.message || "Failed to fetch submissions";
    dispatch(fetchSubmissionsFailure(msg));
  }
};
