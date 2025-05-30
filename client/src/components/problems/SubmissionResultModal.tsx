"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearSubmitResult } from "@/redux/features/submitCode/submitCodeSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SubmissionResultModal = ({ open, onClose }: Props) => {
  const { submitResult, loading, error } = useSelector(
    (state: RootState) => state.submit
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearSubmitResult());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl"> {/* Increased modal width */}
        <DialogHeader>
          <DialogTitle>Submission Result</DialogTitle>
        </DialogHeader>

        {loading && (
          <p className="text-sm text-gray-500">Submitting your code...</p>
        )}

        {(submitResult?.error || error) ? (
          <p className="text-sm text-red-500 whitespace-pre-line">
            {submitResult?.error || error}
          </p>
        ) : (
          !loading &&
          submitResult && (
            <div className="space-y-4 text-sm">
              {/* Submission recorded */}
              <p className="text-gray-500 text-sm">Submission Recorded</p>

              {/* Status */}
              <p
                className={`text-2xl font-semibold ${
                  submitResult.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitResult.status}
              </p>

              {/* Language, Time, Memory in one line */}
              <div className="flex flex-wrap gap-4 text-sm">
                <p><strong>Language:</strong> {submitResult.language}</p>
                <p><strong>Time:</strong> {submitResult.time} ms</p>
                <p>
                  <strong>Memory:</strong>{" "}
                  {(submitResult.memory / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Code */}
              <div>
                <strong>Code:</strong>
                <pre className="bg-muted p-3 rounded mt-1 text-sm overflow-x-auto max-h-72">
                  {submitResult.solutionCode}
                </pre>
              </div>

              {/* Submitted At */}
              <p className="text-sm text-gray-600">
                <strong>Submitted At:</strong>{" "}
                {new Date(submitResult.submittedAt).toLocaleString()}
              </p>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionResultModal;
