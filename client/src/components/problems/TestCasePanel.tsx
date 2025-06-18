"use client";

import { useState } from "react";
import { TestCase } from "@/types/questionType";

type TestCasePanelProps = {
  testCases: TestCase[];
  output: string | null;
  loadingOutput: boolean;
  setActiveSection?: (section: "testcase" | "result") => void;
  activeSection?: "testcase" | "result";
};

const TestCasePanel: React.FC<TestCasePanelProps> = ({
  testCases,
  output,
  loadingOutput,
  setActiveSection: externalSetActiveSection,
  activeSection: externalActiveSection,
}) => {
  const [internalActiveSection, setInternalActiveSection] = useState<"testcase" | "result">("testcase");
  const activeSection = externalActiveSection ?? internalActiveSection;
  const setActiveSection = externalSetActiveSection ?? setInternalActiveSection;

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const outputLines = output?.trim().split('\n') || [];
  const userOutput = outputLines[0] || '';
  const testCaseOutputs = outputLines.slice(1);


  if (!testCases || testCases.length === 0) {
    return <p>Loading...</p>;
  }

  const limitedTestCases = testCases.slice(0, 2);

  function normalizeOutput(str: string): string {
  const trimmed = str.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1);
    const items = inner.split(",").map(s => s.trim());
    return `[${items.join(", ")}]`; 
  }
  return trimmed;
}

  const expected = normalizeOutput(limitedTestCases[activeCaseIndex].expectedOutput);
  const actual = normalizeOutput(testCaseOutputs[activeCaseIndex] || "");
  const isCorrect = expected === actual;

  return (
    <div className="p-3 -mt-4 bg-white shadow-md rounded-md">
      <div className="flex gap-4 mb-4 border-b bg-gray-200 text-xl font-semibold rounded-t-2xl h-10">
        <button
          onClick={() => setActiveSection?.("testcase")}
          className={`px-4 py-1 rounded-t-2xl font-semibold cursor-pointer ${
            activeSection === "testcase"
              ? "bg-gray-200 border-blue-500 border-b-2"
              : " text-gray-400"
          }`}
        >
          Testcase
        </button>
        <button
          onClick={() => setActiveSection?.("result")}
          className={`px-4 py-1 rounded-t-md font-semibold cursor-pointer ${
            activeSection === "result"
              ? "bg-gray-200 border-blue-500 border-b-2"
              : "text-gray-400"
          }`}
        >
          Result
        </button>
      </div>

      {activeSection === "testcase" && (
        <>
          <div className="flex border-b mb-3">
            {limitedTestCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCaseIndex(index)}
                className={`px-4 py-2 text-sm rounded-t-md mr-2 cursor-pointer ${
                  activeCaseIndex === index
                    ? "bg-gray-300 border-blue-500 border-b-2 font-semibold"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Case {index + 1}
              </button>
            ))}
          </div>

          <div className="bg-white p-3 border rounded">
            <div className="mb-2">
              <span className="font-medium">Input:</span>
              <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                {limitedTestCases[activeCaseIndex].input}
              </pre>
            </div>
          </div>
        </>
      )}

      {activeSection === "result" && (
        <div>
          <div className="mt-4 bg-black text-white p-3 rounded min-h-[100px]">
            {loadingOutput ? (
              <p className="text-gray-300">Running code...</p>
            ) : output ? (
              <>
                <p className="font-semibold">Output:</p>
                <pre className="whitespace-pre-wrap">{userOutput}</pre>
              </>
            ) : (
              <p className="text-gray-400">You must run your code first</p>
            )}
          </div>
          {output && (
            <>
              <div className="flex border-b mb-3 mt-3">
                {limitedTestCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCaseIndex(index)}
                    className={`px-4 py-2 text-sm rounded-t-md mr-2 cursor-pointer ${
                      activeCaseIndex === index
                        ? "bg-gray-300 border-blue-500 border-b-2 font-semibold"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    Case {index + 1}
                  </button>
                ))}
              </div>

              <div className="bg-white p-3 border rounded">
                <div className="mb-2">
                  <span className="font-medium">Input:</span>
                  <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                    {limitedTestCases[activeCaseIndex].input}
                  </pre>
                </div>
                <div>
                  <span className="font-medium">Expected Output:</span>
                  <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                    {limitedTestCases[activeCaseIndex].expectedOutput}
                  </pre>
                </div>
                {testCaseOutputs[activeCaseIndex] && (
                  <div className="mt-2">
                    <span className="font-medium">Output:</span>
                    <pre className={`p-2 rounded whitespace-pre-wrap ${
                        isCorrect
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {actual}
                    </pre>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TestCasePanel;
