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

interface SubmitResult {
  language: string;
  solutionCode: string;
  status: string;
  time: number;
  memory: number;
  submittedAt: Date;
}

interface ProblemState {
  problems: Question[];
  problem: Question | null;
  loading: boolean;
  error: string | null;
  submitResult: SubmitResult | null;
}

const initialState: ProblemState = {
  problems: [],
  problem: null,
  loading: false,
  error: null,
  submitResult: null,
};

const problemSlice = createSlice({
  name: "problems",
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
  },
});

export const {
    fetchProblemsStart,
    fetchProblemsSuccess,
    fetchProblemsFailure,
    fetchProblemByIdStart,
    fetchProblemByIdSuccess,
    fetchProblemByIdFailure,
    submitCodeStart,
    submitCodeSuccess,
    submitCodeFailure,
} = problemSlice.actions;

export default problemSlice.reducer;