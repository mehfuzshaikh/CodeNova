import { USER,IUser } from '../models/userModel';
import { Request,Response} from 'express'
import { USERQUESTIONRELATION } from '../models/userQuestionRelationsModel';

const formatUrl = (value: string, baseUrl: string): string => {
    if(!value) return '';
    value = value.trim()

    if(value.startsWith('https://')){
        return value;
    }
    return `${baseUrl}${value}`;
};

export const getMe = async(req:Request,res:Response):Promise<void>=>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        res.status(400).json({message:"Failed to fetch user", error: (error as Error).message });
    }
}

export const updateProfile = async(req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id;  // Assuming `req.user` contains authenticated user data.
        const updateData: Partial<Record<string, any>> = {};

        if(req.file){
            updateData.profileImg = req.file.path;
        }
    
        // Filter only valid fields from the request body
        const validFields = [
          "name", "gender", "location", "birthday", 
          "summary", "website", "github", "linkedin", "profileImg"
        ];
    
        validFields.forEach((field) => {
            if (req.body[field] !== undefined && req.body[field].trim() !== "") {
                let fieldValue = req.body[field].trim();
                if (field === "website") {
                    fieldValue = formatUrl(fieldValue, "https://");
                } else if (field === "github") {
                    fieldValue = formatUrl(fieldValue, "https://github.com/");
                } else if (field === "linkedin") {
                    fieldValue = formatUrl(fieldValue, "https://linkedin.com/in/");
                }
                updateData[field] = fieldValue;
            }
        });
    
        if (Object.keys(updateData).length === 0) {
          res.status(400).json({ message: "No valid fields to update" });
          return;
        }
    
        // Update the user document
        const updatedUser = await USER.findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
          res.status(404).json({ message: "User not found" });
          return;
        }
    
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({message:"Failed to update profile", error: (error as Error).message });
    }
}

export const deleteUser = async(req:Request,res:Response)=>{
    try {
        const userId = req.user?._id;
        const {password} = req.body;

        if(!password){
            res.status(400).json({message:'Password is required.'});
            return;
        }

        const user = await USER.findOne({_id:userId}).select('+password');
        if(!user){
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        const correct = await user.correctPassword(password,user.password)
        if(!correct){
            res.status(401).json({message:'Invalid password try again!'});
            return;
        }
        await USER.deleteOne({_id:userId});
        res.status(200).json({message:'User deleted successfully'});
    } catch (error) {
        res.status(400).json({message:"Failed to delete user", error: (error as Error).message });
    }
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Fetch all verified users
    const users = await USER.find({ isVerified: true,isActive: true })
      .select("username profileImg points badges")
      .sort({ points: -1,createdAt: 1 }) // Sort by points descending, then by creation date ascending;

    // Fetch all solved question counts
    const solvedCounts = await USERQUESTIONRELATION.aggregate([
      { $match: { isSolved: "Solved" } },
      {
        $group: {
          _id: "$user_id",
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a map for quick lookup
    const solvedMap = new Map<string, number>();
    solvedCounts.forEach((entry) => {
      solvedMap.set(entry._id.toString(), entry.count);
    });

    // Final leaderboard array
    const leaderboard = users.map((user, index) => {
      const userId = user._id.toString();
      const totalSolvedQuestions = solvedMap.get(userId) || 0;

      const highestBadge =
        user.badges?.length > 0
          ? user.badges[user.badges.length - 1]
          : null;

      return {
        rank: index + 1,
        _id: user._id,
        username: user.username,
        profileImg: user.profileImg,
        points: user.points,
        totalSolvedQuestions,
        highestBadge,
      };
    });

    res.status(200).json({ leaderboard });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
