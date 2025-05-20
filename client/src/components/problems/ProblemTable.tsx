import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

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
      return 'text-green-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Hard':
      return 'text-red-600';
    default:
      return 'text-gray-400';
  }
};

const ProblemTable: React.FC<ProblemTableProps> = ({ problems }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Problem List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600">
              <th className="p-4 text-left font-medium w-30">Sr no.</th>
              <th className="p-4 text-left font-medium w-150">Problem title</th>
              <th className="p-4 text-left font-medium w-50">Difficulty</th>
              <th className="p-4 text-left font-medium w-50">Category</th>
              <th className="p-4 text-left font-medium w-30">Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr
                key={problem._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="p-4 text-gray-800">{index + 1}.</td>
                <td className="p-4 text-gray-800">
                  <Link
                    href={{
                      pathname: `/problems/${problem._id}`,
                      query: { srNo: index + 1 },
                    }}
                    className="hover:text-blue-500"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="p-4 text-gray-600">
                  {problem.topics.join(", ")}
                </td>
                <td className="p-4 text-left">
                  {problem.status === "Solved" ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <span className="text-red-500 text-xl"></span>
                  )}
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
