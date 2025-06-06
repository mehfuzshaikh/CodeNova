import { subDays, eachDayOfInterval, format } from "date-fns";

interface SubmissionValue {
  date: string;
  count: number;
}

export function generateFullHeatmapData(
  submissions: SubmissionValue[],
  days = 365
): SubmissionValue[] {
  const today = new Date();
  const startDate = subDays(today, days);

  const dateMap = new Map(submissions.map((s) => [s.date, s.count]));

  return eachDayOfInterval({ start: startDate, end: today }).map((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return {
      date: dateStr,
      count: dateMap.get(dateStr) || 0,
    };
  });
}
