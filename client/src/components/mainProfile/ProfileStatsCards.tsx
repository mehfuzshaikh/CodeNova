"use client";

import { useSelector,useDispatch } from "react-redux";
import { RootState,AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchLeaderboard } from "@/redux/features/leaderboard/leaderboardAction";

// const cardClass = "flex flex-col items-center justify-center w-39.5 h-39.5 rounded-lg bg-white shadow-md text-gray-500";
const cardClass = "flex flex-col items-center justify-center w-full sm:w-[150px] h-[150px] rounded-lg bg-white shadow-md text-gray-500";

const ProfileStatsCards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const leaderboard = useSelector((state: RootState) => state.leaderboard.leaderboard);

  const points = user?.points || 0;
  const badgeCount = Array.isArray(user?.badges) ? user.badges.length : 0;
  const userRank = leaderboard.find(allUser => allUser._id === user?._id)?.rank;
  
  useEffect(() => {
  if (leaderboard.length === 0) {
    dispatch(fetchLeaderboard());
  }
}, [dispatch, leaderboard.length]);



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

      <div className={cardClass}>
        <span className="text-lg font-semibold">Submissions</span>
        <span className="text-yellow-500 text-xl font-bold">25</span>
      </div>

      <div className={cardClass}>
        <span className="text-lg font-semibold text-center">Badges</span>
        <span className="text-red-500 text-xl font-bold">{badgeCount}</span>
      </div>
    </div>
  );
};

export default ProfileStatsCards;
