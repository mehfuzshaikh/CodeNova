import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1/user';

export const signUp = async (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return axios.post(`${API_BASE}/signup`, data);
};

export const verifyOtp = async (email: string, otp: string) => {
  return axios.post(`${API_BASE}/verify-otp`, { email, otp },{ withCredentials: true }); // cross origin
};

export const resendOtp = async (email: string) => {
  return axios.post(`${API_BASE}/resend-otp`, { email });
};

export const login = (data: { email: string; password: string }) => {
  return axios.post(`${API_BASE}/login`, data, { withCredentials: true }); // cross origin
};

export const forgotPassword = async (email:string) => {
  return axios.post(`${API_BASE}/forgot-password`, { email })
};

export const resetPassword = async (token: string, data: { password: string; confirmPassword: string; }) => {
  return axios.post(`${API_BASE}/reset-password/${token}`,data)
};

export const logout = async() => {
  return axios.post(`${API_BASE}/logout`,{},{ withCredentials:true })
};

export const getCurrentUser = async () => {
  const res = await axios.get(`${API_BASE}/me`,{ withCredentials:true });
  return res.data;
};