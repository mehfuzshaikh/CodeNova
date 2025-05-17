import React from 'react';
import { Check } from 'lucide-react';

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  topics: string[];
  status: string;
}

interface ProblemTableProps {
  problems: Problem[];
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-100';
    case 'Medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'Hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'bg-gray-400 text-white';
  }
};

const ProblemTable: React.FC<ProblemTableProps> = ({ problems }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Problem List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700">
              <th className="p-4 text-left font-medium">STATUS</th>
              <th className="p-4 text-left font-medium">PROBLEM TITLE</th>
              <th className="p-4 text-left font-medium">DIFFICULTY</th>
              <th className="p-4 text-left font-medium">CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr
                key={problem._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="p-4 text-left">
                  {problem.status === 'Solved' ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <span className="text-red-500 text-xl"></span>
                  )}
                </td>
                <td className="p-4 text-gray-800">
                  {index + 1}. {problem.title}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="p-4 text-gray-600">
                  {problem.topics.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTable;
