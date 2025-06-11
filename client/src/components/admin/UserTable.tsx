"use client";

import React from "react";
import Image from "next/image";
import { AdminUser } from "@/redux/features/admin/users/userSlice";
import DefaultAvatar from "../../../public/DefaultAvatar.png";

interface UserTableProps {
  users: AdminUser[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto mx-auto max-w-8xl min-h-[500px]">
      <table className="min-w-full text-sm text-center">
        <thead>
          <tr className="bg-gray-100 text-gray-600 font-semibold whitespace-nowrap">
            <th className="px-4 py-4">Rank</th>
            <th className="px-4 py-4">Avatar</th>
            <th className="px-4 py-4">Username</th>
            <th className="px-4 py-4">Email</th>
            <th className="px-2 py-4">Points</th>
            <th className="px-2 py-4">Solved</th>
            <th className="px-2 py-4">Highest Badge</th>
            <th className="px-2 py-4">Badge Count</th>
            <th className="px-4 py-4">Name</th>
            <th className="px-2 py-4">Gender</th>
            <th className="px-4 py-4">Location</th>
            <th className="px-4 py-4">Birthday</th>
            <th className="px-2 py-4">Website</th>
            <th className="px-2 py-4">GitHub</th>
            <th className="px-2 py-4">LinkedIn</th>
            <th className="px-4 py-4">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.rank}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              <td className="px-4 py-3">{user.rank}</td>

              <td className="px-4 py-3">
                <Image
                  src={user.profileImg || DefaultAvatar}
                  alt={user.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </td>

              <td className="px-4 py-3 font-medium">{user.username}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-2 py-3">{user.points}</td>
              <td className="px-2 py-3">{user.totalSolvedQuestions}</td>

              <td className="px-4 py-3">
                <Image
                  src={`/badges/${user.highestBadge}.png`}
                  alt={user.highestBadge}
                  width={45}
                  height={45}
                  className="rounded-full object-cover"
                />
              </td>

              <td className="px-4 py-3">{user.badgeCount}</td>
              <td className="px-4 py-3">{user.name || "-"}</td>
              <td className="px-4 py-3">{user.gender || "-"}</td>
              <td className="px-4 py-3">{user.location || "-"}</td>
              <td className="px-4 py-3">
                {user.birthday
                  ? new Date(user.birthday).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-3">
                {user.website ? (
                  <a
                    href={user.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-3">
                {user.github ? (
                  <a
                    href={user.github}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-3">
                {user.linkedin ? (
                  <a
                    href={user.linkedin}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
