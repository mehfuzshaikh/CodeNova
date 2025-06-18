'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchProblems } from '@/redux/features/problem/problemActions';
import { Loader2 } from 'lucide-react';
import ProblemTable from '@/components/problems/ProblemTable';
import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const QuestionListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { problems, loading, error } = useSelector((state: RootState) => state.problems);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setDifficultyFilter('All');
  };

  const filteredProblems = useMemo(() => {
    return problems.filter((problem, idx) => {
      const srNo = (idx + 1).toString();
      const query = search.toLowerCase();
      const matchesSearch =
        problem.title.toLowerCase().includes(query) ||
        problem.topics.join(', ').toLowerCase().includes(query) ||
        srNo.includes(query);

      const matchesStatus = statusFilter === 'All' || problem.status === statusFilter;
      const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;

      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [problems, search, statusFilter, difficultyFilter]);

  return (
    <ProtectedUserRoute>
      <div className="p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center sm:text-center">
          🧠 Practice Problems
        </h1>

        <div className="w-full flex justify-center mb-6">
          <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between gap-4">
            <Input
              placeholder="🔍 Search by title, category or Sr. No"
              className="w-full sm:w-[400px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-end">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Solved">Solved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by Difficulty" />
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
                className="w-full sm:w-auto whitespace-nowrap bg-gray-300 hover:bg-gray-400"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin mr-2" /> Loading...
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <ProblemTable problems={filteredProblems} />
        )}
      </div>
    </ProtectedUserRoute>
  );
};

export default QuestionListPage;


