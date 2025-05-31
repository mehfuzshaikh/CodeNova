"use client";

import React, { useState } from "react";
import { Clock, Cpu } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedSubmission } from "@/redux/features/submitCode/submitCodeSlice";
import SubmissionResultModal from "./SubmissionResultModal"; // Update the path if needed

type Submission = {
  language: string;
  solutionCode: string;
  status: string;
  submittedAt: string;
  time: number | null;
  memory: number | null;
};

type Props = {
  submissions: Submission[];
};

export default function SubmissionsTable({ submissions }: Props) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (submission: Submission) => {
    dispatch(setSelectedSubmission(submission));
    setModalOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"></th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Language
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Runtime
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Memory
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Submitted At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
            {submissions.map((s, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(s)}
                className="cursor-pointer even:bg-gray-100 odd:bg-white dark:even:bg-gray-800 dark:odd:bg-gray-950 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {submissions.length - index}
                </td>
                <td className="px-4 py-2 text-sm font-medium">
                  <span
                    className={`${
                      s.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                    {s.language.charAt(0).toUpperCase() + s.language.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                  {s.time !== null ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {s.time * 1000} ms
                    </span>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                  {s.memory !== null ? (
                    <span className="inline-flex items-center gap-1">
                      <Cpu className="w-4 h-4" />
                      {(s.memory / 1024).toFixed(2)} MB
                    </span>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(s.submittedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    //   hour: "numeric",
                    //   minute: "numeric",
                    //   hour12: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <SubmissionResultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
