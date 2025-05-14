import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteQuestionAction } from '@/redux/features/admin/questions/questionActions';

interface QuestionCardProps {
  id: string;
  title: string;
  difficulty: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ id, title, difficulty }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = () => {
        const isConfirmed = confirm(`Are you sure you want to delete "${title}"?`);
        if (isConfirmed) {
        dispatch(deleteQuestionAction(id));
        }
    };
    return (
        <div className="flex justify-between items-center bg-white shadow p-4 rounded-md mb-2">
        <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-gray-500">{difficulty}</p>
        </div>
        <div className="flex gap-2">
            <Link href={`/admin/challenges/edit/${id}`} className="text-blue-500">Edit</Link>
            <button 
                onClick={handleDelete} 
                className="text-red-500 cursor-pointer"
                >
                Delete
            </button>
        </div>
        </div>
    );
};

export default QuestionCard;