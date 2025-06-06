import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Submission {
  questionId: string;
  status: string;
  language: string;
  submittedAt: string;
  time: number;
  memory: number;
}

interface SubmissionStatsState {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
}

const initialState: SubmissionStatsState = {
  submissions: [],
  loading: false,
  error: null,
};

const submissionStatsSlice = createSlice({
  name: "submissionStats",
  initialState,
  reducers: {
    fetchSubmissionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSubmissionsSuccess(state, action: PayloadAction<Submission[]>) {
      state.submissions = action.payload;
      state.loading = false;
    },
    fetchSubmissionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSubmissionsStart,
  fetchSubmissionsSuccess,
  fetchSubmissionsFailure,
} = submissionStatsSlice.actions;

export default submissionStatsSlice.reducer;
