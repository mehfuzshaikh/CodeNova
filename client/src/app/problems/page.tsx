'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchProblems } from '@/redux/features/problem/problemActions';
import { Loader2 } from 'lucide-react';
import ProblemTable from '@/components/problems/ProblemTable';
const QuestionListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { problems, loading, error } = useSelector((state: RootState) => state.problems);

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Challenges</h2>

      {loading && (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading...
        </div>
      )}

      {error && <div className="text-red-500">Error: {error}</div>}

      {!loading && problems.length === 0 && (
        <div className="text-gray-500">No questions available.</div>
      )}

      {!loading && problems.length > 0 && <ProblemTable problems={problems} />}
    </div>
  );
};

export default QuestionListPage;
