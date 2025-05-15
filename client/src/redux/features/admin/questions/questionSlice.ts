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
    updateQuestionStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateQuestionSuccess(state, action: PayloadAction<Question>) {
       state.questions = state.questions.map((q) =>
         q._id === action.payload._id ? action.payload : q
       );
       state.loading = false;
    },
    updateQuestionFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
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
  deleteQuestionSuccess,
  updateQuestionStart,
  updateQuestionSuccess,
  updateQuestionFailure
} = questionSlice.actions;

export default questionSlice.reducer;
