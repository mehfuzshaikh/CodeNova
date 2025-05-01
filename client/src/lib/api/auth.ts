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
  return axios.post(`${API_BASE}/verify-otp`, { email, otp });
};

export const resendOtp = async (email: string) => {
  return axios.post(`${API_BASE}/resend-otp`, { email });
};
