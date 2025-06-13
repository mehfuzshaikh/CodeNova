"use client";

import Slider from "react-slick";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ALL_BADGES = [
  { points: 5, badge: "joined_platform" },
  { points: 10, badge: "beginner_solver" },
  { points: 15, badge: "intermediate_solver" },
  { points: 20, badge: "advanced_solver" },
  { points: 25, badge: "expert_solver" },
  { points: 30, badge: "master_solver" },
  { points: 35, badge: "legendary_solver" },
];

const BadgesCarousel = () => {
  const earnedBadges = useSelector((state: RootState) => state.auth.user?.badges || []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-6 bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-500">Badges</h2>
      <TooltipProvider>
      <Slider {...settings}>
        {ALL_BADGES.map((badges) => {
          const isEarned = earnedBadges.includes(badges.badge);
          const badgeName = badges.badge.split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          const unlockMessage =
              badges.points === 5
                ? "Unlocks when you join the platform"
                : `Unlocks when you earn ${badges.points} points`;

          return (
            <Tooltip key={badges.badge}>
              <TooltipTrigger asChild>
                <div className="px-2">
                  <div className="w-full h-32 relative flex items-center justify-center bg-gray-100 rounded-xl shadow-md">
                    <Image
                      src={`/badges/${badges.badge}.png`}
                      alt={badgeName}
                      width={100}
                      height={100}
                      className={`object-contain transition duration-300 ${
                        !isEarned ? "grayscale opacity-50" : ""
                      }`}
                    />

                    {!isEarned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-sm text-gray-600 bg-white/80 px-2 py-1 rounded shadow">
                          Locked
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-sm text-center max-w-xs">
                <p className="font-semibold">{badgeName}</p>
                {!isEarned && (
                  <p className="text-gray-500 mt-1">{unlockMessage}</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </Slider>
      </TooltipProvider>
    </div>
  );
};

export default BadgesCarousel;
