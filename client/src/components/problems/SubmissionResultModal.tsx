"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearSelectedSubmission, clearSubmitResult } from "@/redux/features/submitCode/submitCodeSlice";
import { Clipboard, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SubmissionResultModal = ({ open, onClose }: Props) => {
  const { submitResult,selectedSubmission,loading, error } = useSelector(
    (state: RootState) => state.submit
  );

  const result = selectedSubmission || submitResult;
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  if (!result?.solutionCode) return;
  await navigator.clipboard.writeText(result.solutionCode);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
};

  const handleClose = () => {
    dispatch(clearSubmitResult());
    dispatch(clearSelectedSubmission());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        {" "}
        {/* Increased modal width */}
        <DialogHeader>
          <DialogTitle>Submission Result</DialogTitle>
        </DialogHeader>
        {loading && (
          <p className="text-sm text-gray-500">Submitting your code...</p>
        )}
        {result?.error || error ? (
          <p className="text-sm text-red-500 whitespace-pre-line">
            {result?.error || error}
          </p>
        ) : (
          !loading &&
          result && (
            <div className="space-y-4 text-sm">
              {/* Submission recorded */}
              <p className="text-gray-500 text-sm">Submission Recorded</p>

              {/* Status */}
              <p
                className={`text-2xl font-semibold ${
                  result.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {result.status}
              </p>

              {/* Language, Time, Memory in one line */}
              <div className="flex flex-wrap gap-4 text-sm">
                <p>
                  <strong>Language:</strong> {result.language}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {result.time != null ? result.time * 1000 : "N/A"} ms
                </p>
                <p>
                  <strong>Memory:</strong>{" "}
                  {result.memory != null
                    ? (result.memory / 1024).toFixed(2)
                    : "N/A"}{" "}
                  MB
                </p>
              </div>

              {/* Code */}
              <div className="relative">
                <strong>Code:</strong>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="absolute top-5 right-0 mt-1 mr-1 flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Clipboard className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>

                {/* Code Block */}
                <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto max-h-72 whitespace-pre-wrap">
                  {result.solutionCode}
                </pre>
              </div>

              {/* Submitted At */}
              <p className="text-sm text-gray-600">
                <strong>Submitted At:</strong>{" "}
                {new Date(result.submittedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionResultModal;
