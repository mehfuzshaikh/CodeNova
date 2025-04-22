import { USER } from '../models/userModel';
import { Request,Response} from 'express'
import jwt,{ SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms'; // For solve error on expiresIn
// In this file you show new things we use, it is for solve typescript error

const jwtSecret = process.env.JWT_SECRET_KEY as string;
const jwtExpireIn = (process.env.JWT_EXPIRES_IN || '1d') as StringValue;

const generateToken = (id:string):string=>{
    const options:SignOptions = { expiresIn:jwtExpireIn };
    return jwt.sign({id},jwtSecret,options)
}

export const signUp = async(req:Request,res:Response):Promise<void>=>{
    try {

        const { email, password, confirmPassword, username } = req.body;

        const existingUser = await USER.findOne({$or:[{email},{username}],isActive:true});
        if(existingUser){
            const conflictField = existingUser.email === email ? 'Email' : 'Username';
            res.status(400).json({message:`${conflictField} is already exists`});
            return;
        }

        const newUser = await USER.create({ email,password,confirmPassword,username});
        const token = generateToken(newUser._id.toString());

        // I dont want password and isActive field in response
        const userObject = newUser.toObject() as Record<string,any>;
        delete userObject.password;
        delete userObject.isActive;

        res.status(201).json({message:'User is created',data:userObject,token});
    } catch (error) {
        res.status(400).json({message:'Something went wrong',error:(error as Error).message});
    }
}