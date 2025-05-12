import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1/admin';

export const login = (data: { username: string; password: string }) => {
  return axios.post(`${API_BASE}/login`, data, { withCredentials: true }); // cross origin
};

export const logout = async() => {
  return axios.post(`${API_BASE}/logout`,{},{ withCredentials:true })
};

export const getCurrentAdmin = async () => {
    const res = await axios.get(`${API_BASE}/me`,{ withCredentials:true });
    return res.data;
};