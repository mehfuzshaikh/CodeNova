import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1/user';

export const fetchProblemsApi = async () => {
    const res = await axios.get(`${API_BASE}/problems`,{ withCredentials:true });
    return res.data;
};

export const fetchProblemByIdApi = async (id: string) => {
    const res = await axios.get(`${API_BASE}/problems/${id}`,{ withCredentials:true });
    return res.data;
}

export const runCodeApi = async({sourceCode,languageId,stdin='',questionId}:{sourceCode:string,languageId:number,stdin?:string,questionId:string}) => {
    const res = await axios.post(`${API_BASE}/code/run`,{sourceCode,languageId,stdin,questionId},{ withCredentials:true });
    return res.data;
}

export const submitCodeApi = async({sourceCode,languageId,questionId}:{sourceCode:string,languageId:number,questionId:string}) => {
    const res = await axios.post(`${API_BASE}/code/submit`,{sourceCode,languageId,questionId},{ withCredentials:true });
    return res.data;
}

export const getSubmissionsApi = async() => {
    const res = await axios.get(`${API_BASE}/submissions`,{ withCredentials:true });
    return res.data;
}