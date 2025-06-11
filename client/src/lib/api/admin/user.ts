import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1/admin';

export const getUsersListApi = async()=>{
    const res = await axios.get(`${API_BASE}/users`,{ withCredentials:true })
    return res.data.users;
}