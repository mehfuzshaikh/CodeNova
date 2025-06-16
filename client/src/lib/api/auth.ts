import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const signUp = async (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return axios.post(`${API_BASE}/user/signup`, data);
};

export const verifyOtp = async (email: string, otp: string) => {
  return axios.post(`${API_BASE}/user/verify-otp`, { email, otp },{ withCredentials: true }); // cross origin
};

export const resendOtp = async (email: string) => {
  return axios.post(`${API_BASE}/user/resend-otp`, { email });
};

export const login = (data: { email: string; password: string }) => {
  return axios.post(`${API_BASE}/user/login`, data, { withCredentials: true }); // cross origin
};

export const forgotPassword = async (email:string) => {
  return axios.post(`${API_BASE}/user/forgot-password`, { email })
};

export const resetPassword = async (token: string, data: { password: string; confirmPassword: string; }) => {
  return axios.post(`${API_BASE}/user/reset-password/${token}`,data)
};

export const updatePassword = async (data:{ 
  currentPassword:string;
  newPassword:string;
  confirmNewPassword:string;  
}) => {
  return axios.post(`${API_BASE}/user/update-password`,data,{ withCredentials:true })
}

export const logout = async() => {
  return axios.post(`${API_BASE}/user/logout`,{},{ withCredentials:true })
};