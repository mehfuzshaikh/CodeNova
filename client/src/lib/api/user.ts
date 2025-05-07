import axios from 'axios';
import { ProfileData } from '@/types/profileDataType';

const API_BASE = 'http://localhost:5000/api/v1/user';


export const getCurrentUser = async () => {
    const res = await axios.get(`${API_BASE}/me`,{ withCredentials:true });
    return res.data;
  };
  
export const updateProfile = async(data:ProfileData)=>{
    const res = await axios.patch(`${API_BASE}/update-profile`,data,{ withCredentials:true })
    return res.data;
}
