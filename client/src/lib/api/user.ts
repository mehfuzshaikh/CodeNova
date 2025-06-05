import axios from 'axios';
// import { ProfileData } from '@/types/profileDataType';

const API_BASE = 'http://localhost:5000/api/v1/user';


export const getCurrentUser = async () => {
    const res = await axios.get(`${API_BASE}/me`,{ withCredentials:true });
    return res.data;
  };
  
export const updateProfile = async(data:FormData)=>{
    const res = await axios.patch(`${API_BASE}/update-profile`,data,{ 
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials:true 
    })
    return res.data;
}

export const deleteUser = async(password:string)=>{
  return axios.delete(`${API_BASE}/delete-user`,{
    data:{password},
    withCredentials:true
  })
}

export const leaderboardApi = async()=>{
  const res = await axios.get(`${API_BASE}/leaderboard`,{ withCredentials:true });
  return res.data;
}
