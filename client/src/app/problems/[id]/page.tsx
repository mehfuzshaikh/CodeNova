"use client";

import SplitPane from "react-split-pane";
import ProblemDescription from "@/components/problems/ProblemDescription";

const ProblemDetail = () => {
  
  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <SplitPane split="vertical" minSize={300} defaultSize="50%">
        <div className="p-3 bg-white shadow-md">
          <h2 className="text-xl font-semibold bg-gray-200 rounded-t-2xl p-3">Description</h2>
          <ProblemDescription />
        </div>

        {/* Right Panel: Code Editor and Test Cases */}
        <SplitPane split="horizontal" minSize={150} defaultSize="70%">
          {/* Top Right: Code Editor */}
          <div className="p-4 bg-gray-50 shadow-md">
            <h2 className="text-xl font-semibold">Code Editor Panel</h2>
            <p>This is the code editor panel.</p>
          </div>

          {/* Bottom Right: Test Cases */}
          <div className="p-4 bg-gray-200 shadow-md">
            <h2 className="text-xl font-semibold">Test Case Panel</h2>
            <p>This is the test case panel.</p>
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default ProblemDetail;
