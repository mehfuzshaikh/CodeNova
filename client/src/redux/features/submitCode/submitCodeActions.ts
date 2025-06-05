import { submitCodeApi } from "@/lib/api/problem";
import { AppDispatch } from "@/redux/store";
import {
    submitCodeStart,
    submitCodeSuccess,
    submitCodeFailure,  
} from './submitCodeSlice';

import { addSolutionToProblem } from "../problem/problemSlice";
import { loadUser } from "../auth/authActions";

export const submitCode = (sourceCode: string, languageId: number, questionId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(submitCodeStart());
        const response = await submitCodeApi({ sourceCode, languageId, questionId });
         if (response.error) {  
           const submission = {
             status: "Error",
             language: languageId.toString(),
             time: 0,
             memory: 0,
             submittedAt: new Date().toISOString(),
             solutionCode: sourceCode,
             error: response.error, // store this
           };
           dispatch(submitCodeSuccess(submission));
         } else {
           const submission = {
            //  message: response.message,
             status: response.status,
             language: response.language,
             time: response.time,
             memory: response.memory,
             submittedAt: response.submittedAt,
             solutionCode: response.solutionCode,
           };
           dispatch(submitCodeSuccess(submission));
           dispatch(addSolutionToProblem(submission));
           await dispatch(loadUser());
         }
        
         // Update the problem's solution list
    } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        const msg = error.response?.data?.message || "Failed to submit code";
        dispatch(submitCodeFailure(msg));
    }
}