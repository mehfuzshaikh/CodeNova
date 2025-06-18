import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const login = (data: { username: string; password: string }) => {
  return axios.post(`${API_BASE}/admin/login`, data, { withCredentials: true }); // cross origin
};

export const logout = async() => {
  return axios.post(`${API_BASE}/admin/logout`,{},{ withCredentials:true });
};

export const getCurrentAdmin = async () => {
    const res = await axios.get(`${API_BASE}/admin/me`,{ withCredentials:true });
    return res.data;
};