import { AppDispatch } from "@/redux/store";
import { fetchProblemsApi,fetchProblemByIdApi } from "@/lib/api/problem";

import {
    fetchProblemsStart,
    fetchProblemsSuccess,
    fetchProblemsFailure,
    fetchProblemByIdStart,
    fetchProblemByIdSuccess,
    fetchProblemByIdFailure,
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

export const fetchProblemById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchProblemByIdStart());
        const res = await fetchProblemByIdApi(id);
        dispatch(fetchProblemByIdSuccess(res.question));
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        const msg = error.response?.data?.message || "Failed to fetch problems";
        dispatch(fetchProblemByIdFailure(msg));
    }
}