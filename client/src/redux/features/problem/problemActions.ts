import { AppDispatch } from "@/redux/store";
import { fetchProblemsApi } from "@/lib/api/problem";

import {
  fetchProblemsStart,
  fetchProblemsSuccess,
  fetchProblemsFailure,
} from "./problemSlice";

export const fetchProblems = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchProblemsStart());
        const res = await fetchProblemsApi();
        dispatch(fetchProblemsSuccess(res.questions));
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        const msg = error.response?.data?.message || "Failed to fetch problems";
        dispatch(fetchProblemsFailure(msg));
    }
    }