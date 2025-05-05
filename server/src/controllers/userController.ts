import { USER,UserDocument } from '../models/userModel';
import { Request,Response} from 'express'

export const getMe = async(req:Request,res:Response):Promise<void>=>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        res.status(400).json({message:"Failed to fetch user", error: (error as Error).message })
    }
}