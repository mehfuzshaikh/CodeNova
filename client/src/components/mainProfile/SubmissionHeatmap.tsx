"use client";

import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { groupSubmissionsByDate } from "@/lib/utils/groupSubmissionsByDate";
import { generateFullHeatmapData } from "@/lib/utils/generateFullHeatmapData";
import { subDays } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SubmissionHeatmap = () => {
  const { submissions } = useSelector((state: RootState) => state.submissionStats);
  const today = new Date();
  const heatmapData = generateFullHeatmapData(groupSubmissionsByDate(submissions));

  return (
    <div className="mt-10 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-6 text-gray-700">
        Submission Activity (Past Year)
      </h2>

      <TooltipProvider>
        <CalendarHeatmap
          startDate={subDays(today, 365)}
          endDate={today}
          values={heatmapData}
          showWeekdayLabels
          gutterSize={3} // for spacing
          classForValue={() => "heatmap-cell"} // use generic class for border-radius, etc.
          transformDayElement={(el, value) => {
            const count = value?.count || 0;
            const dateStr = value?.date;

            // Format the date for tooltip display
            const formattedDate = new Date(dateStr ?? "").toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            // Fill color based on submission count
           const fillColor =
              count === 0
                ? "#e5e7eb" // gray-200
                : count <= 5
                ? "#bbf7d0" // green-200
                : count <= 10
                ? "#4ade80" // green-400
                : count <= 15
                ? "#16a34a" // green-600
                : "#166534"; // green-800

            // Create SVG <rect> element with proper color and pointer
            const element = React.createElement("rect", {
              ...((el as React.ReactElement<unknown>).props || {}),
              style: { fill: fillColor, cursor: "pointer" },
            });

            return (
              <Tooltip key={dateStr}>
                <TooltipTrigger asChild>{element}</TooltipTrigger>
                <TooltipContent className="text-sm">
                  {count} submission{count > 1 ? "s" : ""} on {formattedDate}
                </TooltipContent>
              </Tooltip>
            );
          }}
        />
      </TooltipProvider>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Less</span>
        <div className="w-4 h-4 bg-gray-200 rounded-sm" />
        <div className="w-4 h-4 bg-green-200 rounded-sm" />
        <div className="w-4 h-4 bg-green-400 rounded-sm" />
        <div className="w-4 h-4 bg-green-600 rounded-sm" />
        <div className="w-4 h-4 bg-green-800 rounded-sm" />
        <span>More</span>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
