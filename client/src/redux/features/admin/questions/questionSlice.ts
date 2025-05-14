import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question,QuestionState } from '@/types/questionType';

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    fetchQuestionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchQuestionsSuccess(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.loading = false;
    },
    fetchQuestionsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addQuestionStart(state) {
      state.loading = true;
      state.error = null;
    },
    addQuestionSuccess(state, action: PayloadAction<Question>) {
      state.questions.push(action.payload);
      state.loading = false;
    },
    addQuestionFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteQuestionSuccess(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((q) => q._id !== action.payload);
    },
  },
});

export const {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  addQuestionStart,
  addQuestionSuccess,
  addQuestionFailure,
  deleteQuestionSuccess
} = questionSlice.actions;

export default questionSlice.reducer;
