import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '@/types/questionType';

// interface Example {
//   input: string;
//   output: string;
//   explanation: string;
// }

// interface TestCase {
//   input: string;
//   expectedOutput: string;
// }

// interface Problem {
//   _id: string;
//   title: string;
//   difficulty: string;
//   topics: string[];
//   status: string;
//   description: string;
//   constraints: string[];
//   examples: Example[];
//   testCases: TestCase[];
// }

interface ProblemState {
  problems: Question[];
  problem: Question | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProblemState = {
  problems: [],
  problem: null,
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
        fetchProblemsSuccess(state, action: PayloadAction<Question[]>) {
        state.problems = action.payload;
        state.loading = false;
        },
        fetchProblemsFailure(state, action: PayloadAction<string>) {
        state.error = action.payload;
        state.loading = false;
        },
        fetchProblemByIdStart(state) {
        state.loading = true;
        state.error = null;
        state.problem = null;
        },
        fetchProblemByIdSuccess(state, action: PayloadAction<Question>) {
          state.problem = action.payload;
          state.loading = false;
        },
        fetchProblemByIdFailure(state, action: PayloadAction<string>) {
          state.error = action.payload;
          state.loading = false;
        },
    },
})

export const {
    fetchProblemsStart,
    fetchProblemsSuccess,
    fetchProblemsFailure,
    fetchProblemByIdStart,
    fetchProblemByIdSuccess,
    fetchProblemByIdFailure,
} = problemSlice.actions;

export default problemSlice.reducer;