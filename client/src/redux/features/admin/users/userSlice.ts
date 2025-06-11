import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminUser {
//   _id: string;
  email: string;
  username: string;
  name?: string;
  profileImg?: string;
  gender?: string;
  location?: string;
  birthday?: string;
  summary?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  points: number;
  badgeCount: number;
  highestBadge: string;
  totalSolvedQuestions: number;
  rank: number;
  createdAt:string,
}

interface AdminUsersState {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action: PayloadAction<AdminUser[]>) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
