import axios from 'axios';
import { Question } from '@/types/questionType';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const getQuestions = async () => {
    const res = await axios.get(`${API_BASE}/admin/question`,{ withCredentials:true });
    return res.data;
};

export const deleteQuestion = async (id:string) => {
    const res = await axios.delete(`${API_BASE}/admin/question/${id}`,{ withCredentials:true });
    return res.data;
}

export const addQuestion = async (data: Omit<Question, '_id'>) => {   // because we exclude _id while create a new data
    const res = await axios.post(`${API_BASE}/admin/question`, data, { withCredentials: true });
    return res.data;
};

export const updateQuestion = async (id: string, data: Question) => {
    const res = await axios.patch(`${API_BASE}/admin/question/${id}`, data, { withCredentials: true });
    return res.data;
}

export const getOneQuestion = async (id: string) => {
    const res = await axios.get(`${API_BASE}/admin/question/${id}`, { withCredentials: true });
    return res.data;
}