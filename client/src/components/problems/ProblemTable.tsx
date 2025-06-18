import React from 'react';
import { Check } from 'lucide-react'; // Add X if we want in future
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

const getDifficultyStyle = (difficulty: string) => {
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
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto mx-auto max-w-6xl min-h-[500px]">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 font-medium">
            <th className="px-6 py-4">Sr No.</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Difficulty</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr
              key={problem._id}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 transition duration-150 text-base`}
            >
              <td className="px-6 py-5">{index + 1}.</td>
              <td className="px-6 py-5">
                <Link
                  href={{
                    pathname: `/problems/${problem._id}`,
                    query: { srNo: index + 1 },
                  }}
                  className="text-black hover:text-blue-600"
                >
                  {problem.title}
                </Link>
              </td>
              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(problem.difficulty)}`}
                >
                  {problem.difficulty}
                </span>
              </td>
              <td className="px-6 py-5 text-gray-600">
                {problem.topics.join(', ')}
              </td>
              <td className="px-6 py-5">
                {problem.status === 'Solved' ? (
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
  );
};

export default ProblemTable;
