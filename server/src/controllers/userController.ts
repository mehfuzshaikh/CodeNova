import { USER,IUser } from '../models/userModel';
import { Request,Response} from 'express'

export const getMe = async(req:Request,res:Response):Promise<void>=>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        res.status(400).json({message:"Failed to fetch user", error: (error as Error).message });
    }
}

// export const updateProfile = async(req:Request,res:Response):Promise<void>=>{
//     try {
//         const userId = req.user?._id;
//         const updateData:IUser = req.body;

//         const allowedFields:(keyof IUser)[] = [
//             'name',
//             'gender',
//             'location',
//             'birthday',
//             'summary',
//             'website',
//             'github',
//             'linkedin'
//           ];

//           const filteredUpdates = Object.keys(updateData).reduce((acc:Partial<IUser>, key) => {
//             if (allowedFields.includes(key  as keyof IUser)) {
//                 const value = updateData[key as keyof IUser];
//                 if (value !== undefined && value !== null) {
//                     acc[key as keyof IUser] = value;
//                   }
//             }
//             return acc;
//           }, {});

//           const updatedUser = await USER.findByIdAndUpdate(userId,{$set:filteredUpdates},{new:true})
//           res.status(200).json({message:'Profile updated successfully',data:updatedUser});
//     } catch (error) {
//         res.status(400).json({message:"Failed to update profile", error: (error as Error).message });
//     }
// }