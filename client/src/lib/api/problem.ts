import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const fetchProblemsApi = async () => {
    const res = await axios.get(`${API_BASE}/user/problems`,{ withCredentials:true });
    return res.data;
};

export const fetchProblemByIdApi = async (id: string) => {
    const res = await axios.get(`${API_BASE}/user/problems/${id}`,{ withCredentials:true });
    return res.data;
}

export const runCodeApi = async({sourceCode,languageId,stdin='',questionId}:{sourceCode:string,languageId:number,stdin?:string,questionId:string}) => {
    const res = await axios.post(`${API_BASE}/user/code/run`,{sourceCode,languageId,stdin,questionId},{ withCredentials:true });
    return res.data;
}

export const submitCodeApi = async({sourceCode,languageId,questionId}:{sourceCode:string,languageId:number,questionId:string}) => {
    const res = await axios.post(`${API_BASE}/user/code/submit`,{sourceCode,languageId,questionId},{ withCredentials:true });
    return res.data;
}

export const getSubmissionsApi = async() => {
    const res = await axios.get(`${API_BASE}/user/submissions`,{ withCredentials:true });
    return res.data;
}