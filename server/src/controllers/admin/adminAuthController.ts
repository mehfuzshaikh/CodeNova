import { Request,Response} from 'express'
import jwt,{ SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms'; // For solve error on expiresIn
import { ADMIN } from '../../models/adminModel';

const jwtSecret = process.env.JWT_SECRET_KEY as string;
const jwtExpireIn = (process.env.JWT_EXPIRES_IN || '1d') as StringValue;

const generateToken = (id:string):string=>{
    const options:SignOptions = { expiresIn:jwtExpireIn };
    return jwt.sign({id},jwtSecret,options)
}

const setCookiesToken = (res: Response, token: string) => {
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day validity
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
};

export const addAdmin = async(req:Request,res:Response):Promise<void> => {
    try {
        const { username,password,name} = req.body;
        if(!username || !password || !name){
            res.status(400).json({ message:'Please provide complete credential(Username,Password,Name)'});
            return;
        }
        const existingAdmin = await ADMIN.findOne({username});
        if(existingAdmin){
            res.status(400).json({ message:'Admin with this username is already exist'});
            return;
        }
        await ADMIN.create({username,password,name});
        res.status(201).json({ message:'New admin is created'});
    } catch (error) {
        res.status(400).json({message: "Something went wrong",error: (error as Error).message});
    }
}

export const adminLogin = async(req:Request,res:Response):Promise<void> => {
    try {
        const { username,password } = req.body;
        if(!username || !password){
            res.status(400).json({ message:'Please enter username and password'});
            return;
        }
        const admin = await ADMIN.findOne({username,isActive:true}).select('+password');
        let correct;
        if(admin){
            correct = await admin.correctPassword(password,admin.password);
        }
        if(!admin || !correct){
            res.status(401).json({ message:'Invalid email or password'});
            return;
        }
        const adminToken = generateToken(admin._id.toString());
        
        const adminObject = admin.toObject() as Record<string,any>;
        delete adminObject.password;

        setCookiesToken(res,adminToken);

        res.status(200).json({ message:'Login successful',data:adminObject,adminToken});
    } catch (error) {
        res.status(400).json({message: "Something went wrong",error: (error as Error).message});
    }
}

export const logout = async (req:Request,res:Response): Promise<void> => {
    try {
        res.clearCookie('adminToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })

        res.status(200).json({message:'Logged out successfully'})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
    }
}

export const getMe = async(req:Request,res:Response):Promise<void>=>{
    try {
        res.status(200).json({admin:req.admin})
    } catch (error) {
        res.status(400).json({message:"Failed to fetch admin", error: (error as Error).message });
    }
}