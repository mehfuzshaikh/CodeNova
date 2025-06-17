'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchAdminUsers } from '@/redux/features/admin/users/userAction';
import { fetchQuestions } from '@/redux/features/admin/questions/questionActions';
import ProtectedAdminRoute from '@/components/shared/ProtectedAdminRoute';

import { FaUsers, FaQuestionCircle, FaCogs, FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function AdminHomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.adminUsers);
  const { questions } = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    dispatch(fetchAdminUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  const totalUsers = users.length;
  const totalQuestions = questions.length;

  return (
    <ProtectedAdminRoute>
      <div className="bg-gray-50 min-h-screen px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-10 flex items-center justify-center gap-2">
          <FaCogs className="text-gray-700" /> Admin Dashboard Panel
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white border border-blue-200 shadow-md rounded-lg p-6 flex items-center gap-4 hover:shadow-lg transition">
            <FaUsers className="text-4xl text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
              <p className="text-3xl font-bold text-blue-500">{totalUsers}</p>
            </div>
          </div>

          <div className="bg-white border border-blue-200 shadow-md rounded-lg p-6 flex items-center gap-4 hover:shadow-lg transition">
            <FaQuestionCircle className="text-4xl text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Questions</h2>
              <p className="text-3xl font-bold text-blue-500">{totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow border border-blue-100">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaCogs className="text-gray-700" /> Admin Controls & Capabilities
          </h3>
          <p className="text-gray-700 text-base mb-4">
            As an administrator, you have access to powerful features to manage the platform:
          </p>

          <ul className="list-none space-y-4 text-gray-700 text-base">
            <li className="flex items-start gap-3">
              <FaUsers className="text-blue-600 mt-1" />
              <span>View a complete list of registered users and access their profiles.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              <span>See user performance metrics like <strong>points</strong>, <strong>badges</strong>, and <strong>rankings</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaQuestionCircle className="text-purple-600 mt-1" />
              <span>Access and manage the entire question bank for coding challenges.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaEdit className="text-yellow-500 mt-1" />
              <span>Add, update, and enhance questions with ease.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaTrashAlt className="text-red-500 mt-1" />
              <span>Remove outdated or duplicate questions to maintain quality.</span>
            </li>
          </ul>

          <p className="text-gray-600 mt-6 text-sm">
            Empower learners by keeping the platform clean, fair, and engaging.
          </p>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
