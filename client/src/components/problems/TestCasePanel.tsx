"use client";

import { useState } from "react";
import { TestCase } from "@/types/questionType";

type TestCasePanelProps = {
  testCases: TestCase[];
};

const TestCasePanel: React.FC<TestCasePanelProps> = ({testCases}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!testCases || testCases.length === 0) {
    return <p>Loading...</p>;
  }

  const limitedTestCases = testCases.slice(0, 2); // Limit to 2 test cases
  return (
    <>
      <h2 className="text-xl font-semibold bg-gray-200 rounded-t-2xl p-2 h-10">Testcase</h2>
      <div className="p-4 bg-white shadow-md">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          {limitedTestCases.map((_, index) => (
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
              {limitedTestCases[activeTab].input}
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
    </>
  );
};

export default TestCasePanel;
