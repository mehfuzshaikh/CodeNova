import { Request, Response } from "express";
import { USER } from "../../models/userModel";
import { USERQUESTIONRELATION } from "../../models/userQuestionRelationsModel";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Step 1: Fetch all active + verified users
    const users = await USER.find({ isVerified: true, isActive: true })
      .select(
        "email username name profileImg gender location birthday summary website github linkedin points badges createdAt"
      )
      .sort({ points: -1, createdAt: 1 }); // Sorted by points DESC, createdAt ASC

    // Step 2: Aggregate solved question counts
    const solvedCounts = await USERQUESTIONRELATION.aggregate([
      { $match: { isSolved: "Solved" } },
      {
        $group: {
          _id: "$user_id",
          count: { $sum: 1 },
        },
      },
    ]);

    // Step 3: Create a Map for solved count lookup
    const solvedMap = new Map<string, number>();
    solvedCounts.forEach((entry) => {
      solvedMap.set(entry._id.toString(), entry.count);
    });

    // Step 4: Format final user list with rank
    const userList = users.map((user, index) => {
      const userId = user._id.toString();
      const totalSolvedQuestions = solvedMap.get(userId) || 0;

      const highestBadge =
        user.badges && user.badges.length > 0
          ? user.badges[user.badges.length - 1]
          : null;

      return {
        rank: index + 1,
        // _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        profileImg: user.profileImg,
        gender: user.gender,
        location: user.location,
        birthday: user.birthday,
        summary: user.summary,
        website: user.website,
        github: user.github,
        linkedin: user.linkedin,
        points: user.points,
        badgeCount: user.badges?.length || 0,
        highestBadge,
        totalSolvedQuestions,
        createdAt:user.createdAt,
      };
    });

    res.status(200).json({ users: userList });
  } catch (err) {
    console.error("Admin user list error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
