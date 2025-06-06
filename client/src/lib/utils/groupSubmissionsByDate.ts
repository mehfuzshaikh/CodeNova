export type Submission = {
  submittedAt: string;
};

export type HeatmapData = {
  date: string;
  count: number;
};

export const groupSubmissionsByDate = (submissions: Submission[]): HeatmapData[] => {
  const dateMap = new Map<string, number>();

  submissions.forEach((submission) => {
    const date = new Date(submission.submittedAt).toISOString().split("T")[0]; // yyyy-mm-dd
    dateMap.set(date, (dateMap.get(date) || 0) + 1);
  });

  return Array.from(dateMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));
};
