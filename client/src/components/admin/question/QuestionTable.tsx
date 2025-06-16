import Link from 'next/link';

interface Question {
  _id?: string;
  title: string;
  difficulty: string;
  topics?: string[];
}

interface QuestionTableProps {
  questions: Question[];
  onDeleteClick: (id: string, title: string) => void;
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

const QuestionTable = ({ questions, onDeleteClick }: QuestionTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto mx-auto max-w-6xl">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 font-medium">
            <th className="px-6 py-4">Sr No.</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Difficulty</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr
              key={question._id}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 transition duration-150 text-base`}
            >
              <td className="px-6 py-5">{index + 1}.</td>
              <td className="px-6 py-5">{question.title}</td>
              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(
                    question.difficulty
                  )}`}
                >
                  {question.difficulty}
                </span>
              </td>
              <td className="px-6 py-5 text-gray-600">{(question.topics ?? []).join(', ')}</td>
              <td className="px-6 py-5">
                <div className="flex gap-4">
                  <Link
                    href={`/admin/challenges/edit/${question._id}`}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDeleteClick(question._id!, question.title)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {questions.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                No questions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
