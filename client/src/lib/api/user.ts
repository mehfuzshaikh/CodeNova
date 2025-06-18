import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const getCurrentUser = async () => {
    const res = await axios.get(`${API_BASE}/user/me`,{ withCredentials:true });
    return res.data;
};
  
export const updateProfile = async(data:FormData)=>{
    const res = await axios.patch(`${API_BASE}/user/update-profile`,data,{ 
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials:true 
    })
    return res.data;
}

export const deleteUser = async(password:string)=>{
  return axios.delete(`${API_BASE}/user/delete-user`,{
    data:{password},
    withCredentials:true
  })
}

export const leaderboardApi = async()=>{
  const res = await axios.get(`${API_BASE}/user/leaderboard`,{ withCredentials:true });
  return res.data;
}
