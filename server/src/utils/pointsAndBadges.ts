export const badgeLevels = [
  { points: 5, badge: "joined_platform" },
  { points: 10, badge: "beginner_solver" },
  { points: 15, badge: "intermediate_solver" },
  { points: 20, badge: "advanced_solver" },
  { points: 25, badge: "expert_solver" },
  { points: 30, badge: "master_solver" },
  { points: 35, badge: "legendary_solver" },
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
