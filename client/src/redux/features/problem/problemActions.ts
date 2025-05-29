import { AppDispatch } from "@/redux/store";
import { fetchProblemsApi,fetchProblemByIdApi,submitCodeApi } from "@/lib/api/problem";

import {
    fetchProblemsStart,
    fetchProblemsSuccess,
    fetchProblemsFailure,
    fetchProblemByIdStart,
    fetchProblemByIdSuccess,
    fetchProblemByIdFailure,
    submitCodeStart,
    submitCodeSuccess,
    submitCodeFailure,
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

export const submitCode = (sourceCode: string, languageId: number, questionId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(submitCodeStart());
        const res = await submitCodeApi({ sourceCode, languageId, questionId });
        dispatch(submitCodeSuccess(res));
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        const msg = error.response?.data?.message || "Failed to submit code";
        dispatch(submitCodeFailure(msg));
    }
}