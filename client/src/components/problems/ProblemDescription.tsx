"use client";

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProblemById } from '@/redux/features/problem/problemActions';
import { useParams } from 'next/navigation';

const ProblemDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const { problem, loading, error } = useAppSelector((state) => state.problems);
  const params = useParams();
  const problemId = params.id as string;

  // Fetch problem by ID
  useEffect(() => {
    if (problemId) {
      dispatch(fetchProblemById(problemId));
    }
  }, [dispatch, problemId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {problem ? (
        <>
          <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>

          <p className={`text-sm mb-4 text-white w-12 rounded-2xl text-center h-5 ${
            problem.difficulty === 'Easy' ? 'bg-green-500' :
            problem.difficulty === 'Medium' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}>
            {problem.difficulty}
          </p>

          {/* Problem Status */}
          <p className="text-sm text-gray-600 mb-4">Status: {problem.status}</p>

          {/* Topics */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Topics:</h2>
            <ul className="list-disc list-inside ml-4">
              {problem.topics?.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>

          {/* Problem Description */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Description:</h2>
            <p className="whitespace-pre-line">{problem.description}</p>
          </div>

          {/* Examples */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Examples:</h2>
            {problem.examples?.map((example, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded mb-2">
                <p><strong>Input:</strong> {example.input}</p>
                <p><strong>Output:</strong> {example.output}</p>
                {example.explanation && (
                  <p><strong>Explanation:</strong> {example.explanation}</p>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Constraints:</h2>
            <ul className="list-disc list-inside">
              {problem.constraints?.map((constraint, index) => (
                <li key={index} className="text-gray-600">{constraint}</li>
              ))}
            </ul>
          </div>

          {/* Test Cases */}
          <div>
            <h2 className="text-xl font-semibold">Test Cases:</h2>
            {problem.testCases?.map((testCase, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded mb-2">
                <p><strong>Input:</strong> {testCase.input}</p>
                <p><strong>Output:</strong> {testCase.expectedOutput}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No problem found.</p>
      )}
    </div>
  );
};

export default ProblemDescription;
