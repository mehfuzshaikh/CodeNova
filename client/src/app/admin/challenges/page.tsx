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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';


export default function ChallengesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector((state: RootState) => state.questions);

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{ id: string; title: string } | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedQuestion({ id, title });
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedQuestion) {
      try {
        await dispatch(deleteQuestionAction(selectedQuestion.id));
        toast.success(`Question deleted successfully!`);
      } catch {
        toast.error('Failed to delete question');
      }
      setIsDialogOpen(false);
      setSelectedQuestion(null);
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
          <h2 className="text-3xl font-bold text-gray-700 text-center mt-4">
            📝 Questions
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

          <div className="flex flex-col sm:flex-row gap-4">
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

        {loading ? (
          <p className="text-center">Loading questions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <QuestionTable
            questions={filteredQuestions}
            onDeleteClick={handleDeleteClick}
          />
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete &quot;{selectedQuestion?.title}&quot;?</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <DialogFooter className="mt-4 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </ProtectedAdminRoute>
  );
}
