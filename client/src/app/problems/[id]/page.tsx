"use client";

import SplitPane from "react-split-pane";
import ProblemDescription from "@/components/problems/ProblemDescription";
import CodeEditor from "@/components/problems/CodeEditor";
import TestCasePanel from "@/components/problems/TestCasePanel";
import { useState } from "react";

const ProblemDetail = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <SplitPane split="vertical" minSize={300} maxSize={-400} defaultSize="50%">
        <div className="p-3 bg-white shadow-md flex flex-col h-full">
          <h2 className="text-xl font-semibold bg-gray-200 rounded-t-2xl p-2 h-10">
            Description
          </h2>
          <div className="overflow-y-auto flex-1">
            <ProblemDescription />
          </div>
        </div>

        {/* Right Panel: Code Editor and Test Cases */}
        <SplitPane split="horizontal" minSize={50} maxSize={-250} defaultSize="55%">
          {/* Top Right: Code Editor */}
          <div className="p-3 bg-gray-50 shadow-md h-screen w-full">
            <div className="flex justify-start items-center mb-2 bg-gray-200 rounded-t-2xl p-2 h-10 gap-5">
              <h2 className="text-xl font-semibold">Code</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border px-2 py-1 rounded-md text-sm bg-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value as "light" | "vs-dark")
                }
                className="border px-2 py-1 rounded-md text-sm bg-white"
              >
                <option value="vs-dark">Dark</option>
                <option value="light">Light</option>
              </select>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="border px-2 py-1 rounded-md text-sm bg-white"
              >
                {[10, 12, 14, 16, 18, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-[400px]">
              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                theme={theme}
                fontSize={fontSize}
              />
            </div>
          </div>

          <div className="p-3 bg-white shadow-md h-full">
            <h2 className="text-xl font-semibold bg-gray-200 rounded-t-2xl p-2 h-10">Testcase</h2>
              <TestCasePanel />
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default ProblemDetail;
