"use client";

import { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { fetchProblems } from "@/redux/features/problem/problemActions";
import { RootState,AppDispatch } from "@/redux/store";

export default function SolvedProblemsStats() {
  const dispatch = useDispatch<AppDispatch>();
  const problems = useSelector((state: RootState) => state.problems.problems);

  useEffect(() => {
      dispatch(fetchProblems());
  }, [dispatch]);

  const total = problems.length;
  const solved = problems.filter(p => p.status === "Solved");

  const difficultyCount = (level: string) => ({
    solved: solved.filter(p => p.difficulty === level).length,
    total: problems.filter(p => p.difficulty === level).length,
  });

  const easy = difficultyCount("Easy");
  const medium = difficultyCount("Medium");
  const hard = difficultyCount("Hard");

  const getProgressWidth = (solved: number, total: number) => {
    if (total === 0) return "0%";
    return `${(solved / total) * 100}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="font-semibold text-lg mb-4 text-gray-500">
        Solved Problems
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8">        
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="#E5E7EB" // Tailwind's gray-300
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="#3B82F6" // Tailwind's blue-500
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={
                2 * Math.PI * 42 * (1 - solved.length / total || 0)
              }
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <span className="text-2xl font-bold text-gray-800">
              {solved.length}
            </span>
            <span className="text-sm text-gray-600">Solved</span>
            <span className="text-xs text-gray-500">/ {total}</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Easy:</span>
              <span>
                {easy.solved} / {easy.total}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-300 rounded-full">
              <div
                className="h-3 bg-green-500 rounded-full"
                style={{ width: getProgressWidth(easy.solved, easy.total) }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Medium:</span>
              <span>
                {medium.solved} / {medium.total}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-300 rounded-full">
              <div
                className="h-3 bg-yellow-500 rounded-full"
                style={{ width: getProgressWidth(medium.solved, medium.total) }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Hard:</span>
              <span>
                {hard.solved} / {hard.total}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-300 rounded-full">
              <div
                className="h-3 bg-red-500 rounded-full"
                style={{ width: getProgressWidth(hard.solved, hard.total) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
