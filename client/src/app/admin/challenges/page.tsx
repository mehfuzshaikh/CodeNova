'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  fetchQuestions,
  deleteQuestionAction,
} from '@/redux/features/admin/questions/questionActions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProtectedAdminRoute from '@/components/shared/ProtectedAdminRoute';
import QuestionTable from '@/components/admin/question/QuestionTable';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export default function ChallengesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector((state: RootState) => state.questions);

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleDelete = (id: string, title: string) => {
    const isConfirmed = confirm(`Are you sure you want to delete "${title}"?`);
    if (isConfirmed) {
      dispatch(deleteQuestionAction(id));
    }
  };

  const clearFilters = () => {
    setSearch('');
    setDifficultyFilter('All');
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((question, idx) => {
      const srNo = (idx + 1).toString();
      const query = search.toLowerCase();
      const matchesSearch =
        question.title.toLowerCase().includes(query) ||
        question.topics?.join(', ').toLowerCase().includes(query) ||
        srNo.includes(query);

      const matchesDifficulty =
        difficultyFilter === 'All' || question.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [questions, search, difficultyFilter]);

  return (
    <ProtectedAdminRoute>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="relative mb-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-700 text-center">
            Questions
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 max-w-6xl mx-auto">
          {/* Search */}
          <Input
            placeholder="🔍 Search by title, category or Sr. No"
            className="w-full sm:w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Difficulty */}
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              onClick={clearFilters}
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300"
            >
              Clear Filters
            </Button>
             <Link href="/admin/challenges/add">
              <Button className="btn-ghost-custom">Add Question</Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center">Loading questions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <QuestionTable
            questions={filteredQuestions}
            onDelete={handleDelete}
          />
        )}
      </div>
    </ProtectedAdminRoute>
  );
}
