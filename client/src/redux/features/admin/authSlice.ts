import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
  _id: string;
  username: string;
  name:string
}

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  admin: null,
};

const authSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Admin>) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
