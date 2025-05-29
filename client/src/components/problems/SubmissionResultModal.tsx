"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SubmissionResultModal = ({ open, onClose }: Props) => {
  const { submitResult, loading, error } = useSelector((state: RootState) => state.problems);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submission Result</DialogTitle>
        </DialogHeader>

        {loading && <p className="text-sm text-muted-foreground">Running your code...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && submitResult && (
          <div className="space-y-2 text-sm">
            <p><strong>Status:</strong> {submitResult.status}</p>
            <p><strong>Language:</strong> {submitResult.language}</p>
            <p><strong>Time:</strong> {submitResult.time} ms</p>
            <p><strong>Memory:</strong> {submitResult.memory} KB</p>
            <p><strong>Submitted At:</strong> {new Date(submitResult.submittedAt).toLocaleString()}</p>
            <div>
              <strong>Code:</strong>
              <pre className="bg-muted p-2 rounded mt-1 text-sm overflow-x-auto">
                {submitResult.solutionCode}
              </pre>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionResultModal;
