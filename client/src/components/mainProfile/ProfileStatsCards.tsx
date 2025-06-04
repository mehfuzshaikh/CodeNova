"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const cardClass = "flex flex-col items-center justify-center w-39.5 h-39.5 rounded-lg bg-white shadow-md text-gray-500";

const ProfileStatsCards = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const points = user?.points || 0;
  const badgeCount = Array.isArray(user?.badges) ? user.badges.length : 0;

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <div className={cardClass}>
        <span className="text-lg font-semibold">Rank</span>
        <span className="text-blue-400 text-xl font-bold">#123</span>
      </div>

      <div className={cardClass}>
        <span className="text-lg font-semibold">Points</span>
        <span className="text-emerald-500 text-xl font-bold">{points}</span>
      </div>

      <div className={cardClass}>
        <span className="text-lg font-semibold">Submissions</span>
        <span className="text-orange-400 text-xl font-bold">25</span>
      </div>

      <div className={cardClass}>
        <span className="text-lg font-semibold text-center">Badges</span>
        <span className="text-purple-600 text-xl font-bold">{badgeCount}</span>
      </div>
    </div>
  );
};

export default ProfileStatsCards;
