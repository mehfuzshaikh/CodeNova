export const badgeLevels = [
  { points: 0, badge: "joined_platform" },
  { points: 6, badge: "beginner_solver" },
  { points: 14, badge: "intermediate_solver" },
  { points: 22, badge: "advanced_solver" },
  { points: 30, badge: "expert_solver" },
//   { points: 38, badge: "master_solver" },
//   { points: 45, badge: "legendary_solver" },
];

export function getEligibleBadges(points: number): string[] {
  return badgeLevels
    .filter((level) => points >= level.points)
    .map((level) => level.badge);
}

export function getPointsForDifficulty(difficulty: "Easy" | "Medium" | "Hard"): number {
  const pointMap = {
    Easy: 2,
    Medium: 3,
    Hard: 5,
  };
  return pointMap[difficulty];
}

export function getNewBadges(currentPoints: number, addedPoints: number, existingBadges: string[]): string[] {
  const totalPoints = currentPoints + addedPoints;
  const allEligible = getEligibleBadges(totalPoints);
  return allEligible.filter((badge) => !existingBadges.includes(badge));
}
