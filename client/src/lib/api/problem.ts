import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1/user';

export const fetchProblemsApi = async () => {
    const res = await axios.get(`${API_BASE}/problems`,{ withCredentials:true });
    console.log('This from api calling',res.data);
    return res.data;
  };