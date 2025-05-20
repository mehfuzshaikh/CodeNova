"use client";

import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const TestCasePanel: React.FC = () => {
  const { problem } = useAppSelector((state) => state.problems);
  const [activeTab, setActiveTab] = useState(0);

  if (!problem || !problem.testCases || problem.testCases.length === 0) {
    return <p>No test cases available.</p>;
  }

  const testCases = problem.testCases.slice(0, 2); // Limit to 2 test cases
  return (
    <div className="p-4 bg-white shadow-md">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {testCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm rounded-t-md mr-2 cursor-pointer ${
              activeTab === index
                ? "bg-gray-300 hover:bg-gray-400 border-blue-500 border-b-2 font-semibold"
                : "bg-white"
            }`}
          >
            Case {index + 1}
          </button>
        ))}
      </div>

      {/* Active Test Case Display */}
      <div className="bg-white p-4 rounded-md text-sm">
        <div className="mb-2">
          <span className="font-medium">Input:</span>{" "}
          <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
            {testCases[activeTab].input}
          </pre>
        </div>
        {/* <div>
          <span className="font-medium">Expected Output:</span>{" "}
          <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
            {testCases[activeTab].expectedOutput}
          </pre>
        </div> */}
      </div>
    </div>
  );
};

export default TestCasePanel;
