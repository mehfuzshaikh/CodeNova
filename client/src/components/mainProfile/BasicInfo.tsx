"use client";

import Image from "next/image";
import DefaultAvatar from "../../../public/DefaultAvatar.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from 'next/navigation';
import {
  FaUser,
  FaVenusMars,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaAlignLeft,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import Link from 'next/link';

export default function ProfileInfo() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return null;

  const formatValue = (value?: string | null) => value || "Not provided";

  return (
    // <div className="bg-white rounded-lg shadow-md p-6 w-80 max-w-3xl h-162">
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="font-semibold text-lg mb-4 text-gray-500">
        Basic Information
      </h2>
      {/* Top: Avatar + Username/Email */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={user.profileImg || DefaultAvatar}
          alt={user.username}
          width={100}
          height={100}
          className="rounded-md border object-cover w-[80px] h-[80px]"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-gray-500 flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            {formatValue(user.email)}
          </p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mb-6">
        <button
          className="bg-sky-100 text-sky-700 font-medium py-1.5 px-4 rounded-md hover:bg-sky-200 transition w-full cursor-pointer"
          onClick={() => router.push("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Info Items with Icons */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <FaUser className="text-gray-500" />
          <span>{formatValue(user.name)}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaVenusMars className="text-gray-500" />
          <span>{formatValue(user.gender)}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>{formatValue(user.location)}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-gray-500" />
          <span>
            {user.birthday
              ? new Date(user.birthday).toLocaleDateString()
              : "Not provided"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaAlignLeft className="text-gray-500" />
          <span>{formatValue(user.summary)}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaGlobe className="text-gray-500" />
          {user.website ? (
            <Link
              href={
                user.website.startsWith("http")
                  ? user.website
                  : `https://${user.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {user.website.startsWith("http")
                ? user.website
                : `https://${user.website}`}
            </Link>
          ) : (
            <span>Not provided</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <FaGithub className="text-gray-500" />
          {user.github ? (
            <Link
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {user.github.startsWith("http")
                ? user.github
                : `https://github.com/${user.github}`}
            </Link>
          ) : (
            <span>Not provided</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <FaLinkedin className="text-gray-500" />
          {user.linkedin ? (
            <Link
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {user.linkedin.startsWith("http")
                ? user.linkedin
                : `https://linkedin.com/in/${user.linkedin}`}
            </Link>
          ) : (
            <span>Not provided</span>
          )}
        </div>
      </div>
    </div>
  );
}
