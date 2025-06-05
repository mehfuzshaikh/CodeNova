import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeaderboardEntry {
  _id: string;
  username: string;
  profileImg?: string;
  points: number;
  totalSolvedQuestions: number;
  highestBadge?: string;
  rank: number;
}

interface LeaderboardState {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  leaderboard: [],
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    fetchLeaderboardStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLeaderboardSuccess(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.leaderboard = action.payload;
      state.loading = false;
    },
    fetchLeaderboardFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
