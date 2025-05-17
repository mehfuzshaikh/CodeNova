import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  topics: string[];
  status: string;
}

interface ProblemState {
  problems: Problem[];
  loading: boolean;
  error: string | null;
}

const initialState: ProblemState = {
  problems: [],
  loading: false,
  error: null,
};

const problemSlice = createSlice({
    name: 'problems',
    initialState,
    reducers: {
        fetchProblemsStart(state) {
        state.loading = true;
        state.error = null;
        },
        fetchProblemsSuccess(state, action: PayloadAction<Problem[]>) {
        state.problems = action.payload;
        state.loading = false;
        },
        fetchProblemsFailure(state, action: PayloadAction<string>) {
        state.error = action.payload;
        state.loading = false;
        },
    },
})

export const {
    fetchProblemsStart,
    fetchProblemsSuccess,
    fetchProblemsFailure,
} = problemSlice.actions;

export default problemSlice.reducer;