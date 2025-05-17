import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import problemReducer from './features/problem/problemSlice';
import adminAuthReduce from './features/admin/authSlice';
import questionReducer from './features/admin/questions/questionSlice';

// import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth:adminAuthReduce,
    questions:questionReducer,
    problems: problemReducer,
  },
});

// Types for global usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;