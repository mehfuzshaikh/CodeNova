import { USER,UserDocument } from '../models/userModel';
import { Request,Response} from 'express'
import jwt,{ SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms'; // For solve error on expiresIn
import { sendEmail } from '../utils/sendEmail';
// In this file you show new things we use, it is for solve typescript error

const jwtSecret = process.env.JWT_SECRET_KEY as string;
const jwtExpireIn = (process.env.JWT_EXPIRES_IN || '1d') as StringValue;

const generateToken = (id:string):string=>{
    const options:SignOptions = { expiresIn:jwtExpireIn };
    return jwt.sign({id},jwtSecret,options)
}

const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

export const senOTP = async(req:Request,res:Response):Promise<void>=>{
    try {
        const { email, password, confirmPassword, username } = req.body;

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 2 * 60 * 1000) // 2 minute

        const existingUser = await USER.findOne({$or:[{email},{username}],isActive:true});
        if(existingUser){
            if(existingUser.isVerified){
                const conflictField = existingUser.email === email ? 'Email' : 'Username';
                res.status(400).json({message:`${conflictField} is already exists`});
                return;
            }
            if(existingUser.username !== username){
                const usernameConflict = await USER.findOne({ username, _id: { $ne: existingUser._id }, isActive: true });
                if (usernameConflict) {
                    res.status(400).json({ message: 'Username is already in use.' });
                    return;
                }
            }
            existingUser.verificationCode = otp;
            existingUser.otpExpires = otpExpires;
            existingUser.password = password;
            existingUser.confirmPassword = confirmPassword;
            existingUser.username = username; // in case they want to change!
            await existingUser.save();
        }else{
            const newUser = await USER.create({ email,password,confirmPassword,username,verificationCode:otp,otpExpires});
        }

        sendEmail(email,'Your OTP Code',`Your OTP for signup is ${otp}.\n It is valid for 2 minutes.`)
        res.status(201).json({message:'OTP sent successfully. Please check your email.'});
    } catch (error) {
        res.status(400).json({message:'Something went wrong',error:(error as Error).message});
    }
}

export const verifyOtpAndSignUp = async(req:Request,res:Response):Promise<void>=>{
    try {
        const { email,otp } = req.body;

        if(!email || !otp){
            res.status(400).json({message:'Email and OTP are required'});
            return;
        }

        const user = await USER.findOne({email,verificationCode:otp}).select('+otpExpires');
        if(!user){
            res.status(400).json({message:'Invalid OTP or Email'});
            return;
        }
        
        if (user.otpExpires && user.otpExpires < new Date()) {
            res.status(400).json({ message: 'OTP has expired' });
            return;
        }
        user.isVerified = true;
        user.verificationCode = undefined;
        user.otpExpires = undefined;
        user.otpRequestedAt = undefined;
        await user.save();
        
        const token = generateToken(user._id.toString());

        res.status(201).json({message:'Sign up successful!',token});
    } catch (error) {
        res.status(400).json({message:'Something went wrong',error:(error as Error).message});
    }
}

export const logIn = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({message:'Please enter email and password'});
            return;
        } 
        const user = await USER.findOne({email}).select('+password') as UserDocument | null;
        let correct;
        if(user)
        {
            correct = user.correctPassword(password,user.password);
        }
        if(!user || !correct){
            res.status(401).json({message:'Invalid email or password'});
            return;
        }
        const token = generateToken(user._id.toString());

        const userObject = user.toObject() as Record<string,any>;
        delete userObject.password;

        res.status(200).json({message:'Login successful',data:userObject,token});
    } catch (error) {
        res.status(400).json({message:'Something went wrong',error:(error as Error).message});
    }
}

export const resendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
        }

        const user = await USER.findOne({ email, isActive: true }).select("+otpExpires +otpRequestedAt");
        if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
        }

        if (user.isVerified) {
        res.status(400).json({ message: "User is already verified" });
        return;
        }

        const now = new Date();
        if (user.otpRequestedAt && now.getTime() - user.otpRequestedAt.getTime() < 60 * 1000) {
        const remaining = Math.ceil((60 * 1000 - (now.getTime() - user.otpRequestedAt.getTime())) / 1000);
        res.status(429).json({message: `Please wait ${remaining} seconds before requesting a new OTP.`});
        return;
        }

        const newOTP = generateOTP();
        user.verificationCode = newOTP;
        user.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 mins
        user.otpRequestedAt = now;
        await user.save();

        sendEmail(user.email,"Resend OTP",`Your new OTP is ${newOTP}. It is valid for 2 minutes.`);
        res.status(200).json({ message: "OTP resent successfully. Please check your email." });
    } catch (error) {
        res.status(500).json({message: "Something went wrong",error: (error as Error).message});
    }
};