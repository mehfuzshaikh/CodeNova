import axios from 'axios';
import { Question } from '@/types/questionType';

const API_BASE = 'http://localhost:5000/api/v1/admin';

export const getQuestions = async () => {
    const res = await axios.get(`${API_BASE}/question`,{ withCredentials:true });
    return res.data;
};

export const deleteQuestion = async (id:string) => {
    const res = await axios.delete(`${API_BASE}/question/${id}`,{ withCredentials:true });
    return res.data;
}

export const addQuestion = async (data: Omit<Question, '_id'>) => {   // because we exclude _id while create a new data
    const res = await axios.post(`${API_BASE}/question`, data, { withCredentials: true });
    return res.data;
};