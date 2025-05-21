"use client";

import React from 'react';
import { Question } from '@/types/questionType';

type ProblemDescriptionProps = {
  problem: Question | null;
  srNo: string | null;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({problem,srNo}) => {

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {problem ? (
        <>
          {problem.status == "Solved" && (
            <span className="mb-3 text-green-600 font-semibold text-sm flex items-center gap-1">
              Solved
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
          <h1 className="text-2xl font-bold mb-3">{srNo}. {problem.title}</h1>

          <p
            className={`text-sm mb-4 text-white w-12 rounded-2xl text-center h-5 ${
              problem.difficulty === "Easy"
                ? "bg-green-500 w-12"
                : problem.difficulty === "Medium"
                ? "bg-yellow-500 w-17"
                : "bg-red-500 w-12"
            }`}
          >
            {problem.difficulty}
          </p>

          {/* Topics */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Topics:</h2>
            <ul className="list-disc list-inside ml-4">
              {problem.topics?.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>

          {/* Problem Description */}
          <div className="mb-6">
            {/* <h2 className="text-xl font-semibold">Description:</h2> */}
            <p className="whitespace-pre-line">{problem.description}</p>
          </div>

          {/* Examples */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Examples:</h2>
            {problem.examples?.map((example, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded mb-2">
                <p>
                  <strong>Input:</strong> {example.input}
                </p>
                <p>
                  <strong>Output:</strong> {example.output}
                </p>
                {example.explanation && (
                  <p>
                    <strong>Explanation:</strong> {example.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Constraints:</h2>
            <ul className="list-disc list-inside">
              {problem.constraints?.map((constraint, index) => (
                <li key={index} className=" bg-gray-100 text-gray-600">
                  {constraint}
                </li>
              ))}
            </ul>
          </div>

          {/* Test Cases */}
          {/* <div>
            <h2 className="text-xl font-semibold">Test Cases:</h2>
            {problem.testCases?.map((testCase, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded mb-2">
                <p>
                  <strong>Input:</strong> {testCase.input}
                </p>
                <p>
                  <strong>Output:</strong> {testCase.expectedOutput}
                </p>
              </div>
            ))}
          </div> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProblemDescription;
