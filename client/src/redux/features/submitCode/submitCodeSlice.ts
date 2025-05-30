import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubmitResult {
  message?: string;
  language: string;
  solutionCode: string;
  status: string;
  time: number;
  memory: number;
  submittedAt: string;
  error?: string;
}

interface SubmitState {
  loading: boolean;
  error: string | null;
  submitResult: SubmitResult | null;
}

const initialState: SubmitState = {
  loading: false,
  error: null,
  submitResult: null,
};

const submitSlice = createSlice({
  name: 'submit',
  initialState,
  reducers: {
    submitCodeStart(state) {
      state.loading = true;
      state.error = null;
      state.submitResult = null;
    },
    submitCodeSuccess(state, action: PayloadAction<SubmitResult>) {
      state.loading = false;
      state.submitResult = action.payload;
    },
    submitCodeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSubmitResult(state) {
      state.submitResult = null;
    },
  },
});

export const {
  submitCodeStart,
  submitCodeSuccess,
  submitCodeFailure,
  clearSubmitResult,
} = submitSlice.actions;

export default submitSlice.reducer;
