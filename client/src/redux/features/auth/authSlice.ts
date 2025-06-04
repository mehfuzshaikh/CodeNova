import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  isVerified: boolean;
  _id: string;
  username: string;
  email: string;
  location: string;
  birthday: string;
  summary: string;
  website: string;
  github: string;
  linkedin: string;
  gender: string;
  name:string
  profileImg: string;
  points: number;
  badges: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
