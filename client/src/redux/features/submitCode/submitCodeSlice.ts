import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubmitResult {
  message?: string;
  language: string;
  solutionCode: string;
  status: string;
  time: number | null;
  memory: number | null;
  submittedAt: string;
  error?: string;
}

interface SubmitState {
  loading: boolean;
  error: string | null;
  submitResult: SubmitResult | null;
  selectedSubmission: SubmitResult | null;
}

const initialState: SubmitState = {
  loading: false,
  error: null,
  submitResult: null,
  selectedSubmission: null,
};

const submitSlice = createSlice({
  name: "submit",
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
    setSelectedSubmission: (state, action: PayloadAction<SubmitResult>) => {
      state.selectedSubmission = action.payload;
    },
    clearSelectedSubmission: (state) => {
      state.selectedSubmission = null;
    },
  },
});

export const {
  submitCodeStart,
  submitCodeSuccess,
  submitCodeFailure,
  clearSubmitResult,
  setSelectedSubmission,
  clearSelectedSubmission,
} = submitSlice.actions;

export default submitSlice.reducer;
