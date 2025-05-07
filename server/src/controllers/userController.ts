import { USER,IUser } from '../models/userModel';
import { Request,Response} from 'express'

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

        const formatUrl = (value: string, baseUrl: string): string => {
            return value.trim() ? `${baseUrl}${value.trim()}` : "";
        };
    
        // Filter only valid fields from the request body
        const validFields = [
          "name", "gender", "location", "birthday", 
          "summary", "website", "github", "linkedin"
        ];
    
        validFields.forEach((field) => {
            if (req.body[field] !== undefined && req.body[field].trim() !== "") {
                let fieldValue = req.body[field].trim();
                if (field === "website") {
                    fieldValue = formatUrl(fieldValue, "http://");
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