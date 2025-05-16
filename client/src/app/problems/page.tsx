'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchQuestions } from '@/redux/features/admin/questions/questionActions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import QuestionCard from '@/components/admin/question/QuestionCard';

export default function ProblemsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Challenge Questions</h2>
      </div>

      {loading ? (
        <p>Loading questions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-3">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              id={question._id ?? ""}
              title={question.title}
              difficulty={question.difficulty}
            />
          ))}
        </div>
      )}
    </div>
  );
}
