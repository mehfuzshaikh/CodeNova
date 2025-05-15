import { AppDispatch } from '@/redux/store';
import { Question } from '@/types/questionType';
import { getQuestions,deleteQuestion,addQuestion,updateQuestion } from '@/lib/api/admin/question';

import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  addQuestionStart,
  addQuestionSuccess,
  addQuestionFailure,
  deleteQuestionSuccess,
  updateQuestionStart,
  updateQuestionSuccess,
  updateQuestionFailure,
} from './questionSlice';

export const fetchQuestions = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchQuestionsStart());
    const res = await getQuestions();
    dispatch(fetchQuestionsSuccess(res.data));
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const msg = error.response?.data?.message || "Failed to delete account";
    dispatch(fetchQuestionsFailure(msg));
  }
};

export const deleteQuestionAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteQuestion(id);
    dispatch(deleteQuestionSuccess(id));
  } catch (err) {
    console.error('Error deleting question:', err);
  }
};

export const addQuestionAction = (data: Omit<Question, '_id'>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addQuestionStart());
    const res = await addQuestion(data);
    dispatch(addQuestionSuccess(res.data));
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const msg = error.response?.data?.message || 'Failed to add question';
     dispatch(addQuestionFailure(msg));
  }
};

export const updateQuestionAction = (id: string, data: Question) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateQuestionStart());
    const res = await updateQuestion(id, data);
    dispatch(updateQuestionSuccess(res.data));
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const msg = error.response?.data?.message || 'Failed to update question';
     dispatch(updateQuestionFailure(msg));
  }
};
