"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard } from "@/redux/features/leaderboard/leaderboardAction";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import DefaultAvatar from "../../../public/DefaultAvatar.png";
import ProtectedUserRoute from "@/components/shared/ProtectedUserRoute";

const LeaderboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leaderboard, loading, error } = useSelector((state: RootState) => state.leaderboard);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const getMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  return (
    <ProtectedUserRoute>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
            🏆 Leaderboard
          </h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-gray-500 text-center">No users on the leaderboard yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
              <table className="min-w-full table-auto text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 font-medium">
                  <tr>
                    <th className="px-6 py-4 text-left">Rank</th>
                    <th className="px-6 py-4 text-left">User</th>
                    <th className="px-6 py-4 text-left">Points</th>
                    <th className="px-6 py-4 text-left">Solved</th>
                    <th className="px-6 py-4 text-left">Highest Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user) => {
                    const isCurrentUser = currentUser?._id === user._id;

                    return (
                      <tr
                        key={user._id}
                        className={`border-t border-gray-200 ${
                          isCurrentUser ? "bg-sky-100 text-sky-800 font-bold text-lg" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 text-xl">{getMedal(user.rank)}</td>

                        <td className="px-6 py-4 flex items-center gap-3">
                          <Image
                            src={user.profileImg || DefaultAvatar}
                            alt={user.username}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <span>{user.username}</span>
                        </td>

                        <td className="px-6 py-4">{user.points}</td>
                        <td className="px-6 py-4">{user.totalSolvedQuestions}</td>

                        <td className="px-6 py-4">
                          {user.highestBadge ? (
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/badges/${user.highestBadge}.png`}
                                alt={user.highestBadge}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                              <span className="capitalize text-gray-700 text-sm">
                                {user.highestBadge.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ProtectedUserRoute>
  );
};

export default LeaderboardPage;
