"use client";

import { useSelector,useDispatch } from "react-redux";
import { RootState,AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchLeaderboard } from "@/redux/features/leaderboard/leaderboardAction";
import { fetchSubmissionStats } from "@/redux/features/submissionState/submissionStatsAction";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// const cardClass = "flex flex-col items-center justify-center w-39.5 h-39.5 rounded-lg bg-white shadow-md text-gray-500";
const cardClass = "flex flex-col items-center justify-center w-full sm:w-[150px] h-[150px] rounded-lg bg-white shadow-md text-gray-500";

const ProfileStatsCards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const leaderboard = useSelector((state: RootState) => state.leaderboard.leaderboard);
  const { submissions } = useSelector((state: RootState) => state.submissionStats);

  useEffect(() => {
    dispatch(fetchSubmissionStats());
  }, [dispatch]);
  
  useEffect(() => {
  if (leaderboard.length === 0) {
    dispatch(fetchLeaderboard());
  }
  }, [dispatch, leaderboard.length]);

  const totalSubmission = submissions.length;
  const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted').length;
  const wrongSubmissions  = submissions.filter(s => s.status !== 'Accepted').length;
  const points = user?.points || 0;
  const badgeCount = Array.isArray(user?.badges) ? user.badges.length : 0;
  const userRank = leaderboard.find(allUser => allUser._id === user?._id)?.rank;

  return (
    // <div className="flex flex-wrap gap-4 mt-6">
    <div className="flex flex-wrap gap-4 justify-between mt-6">
      <div className={cardClass}>
        <span className="text-lg font-semibold">Rank</span>
        <span className="text-blue-500 text-xl font-bold">{userRank}</span>
      </div>

      <div className={cardClass}>
        <span className="text-lg font-semibold">Points</span>
        <span className="text-green-500 text-xl font-bold">{points}</span>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cardClass}>
              <span className="text-lg font-semibold">Submissions</span>
              <span className="text-yellow-500 text-xl font-bold">
                {totalSubmission}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-sm">
            <p>✅ Accepted: {acceptedSubmissions}</p>
            <p>❌ Wrong: {wrongSubmissions}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className={cardClass}>
        <span className="text-lg font-semibold text-center">Badges</span>
        <span className="text-red-500 text-xl font-bold">{badgeCount}</span>
      </div>
    </div>
  );
};

export default ProfileStatsCards;
