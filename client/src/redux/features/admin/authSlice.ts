import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
  _id: string;
  username: string;
  name:string
}

interface AdminAuthState {
  isAdminAuthenticated: boolean;
  admin: Admin | null;
}

const initialState: AdminAuthState = {
  isAdminAuthenticated: false,
  admin: null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdminCredentials: (state, action: PayloadAction<Admin>) => {
      state.isAdminAuthenticated = true;
      state.admin = action.payload;
    },
    adminLogout: (state) => {
      state.isAdminAuthenticated = false;
      state.admin = null;
    },
  },
});

export const { setAdminCredentials, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
