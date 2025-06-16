import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const getUsersListApi = async()=>{
    const res = await axios.get(`${API_BASE}/admin/users`,{ withCredentials:true })
    return res.data.users;
}