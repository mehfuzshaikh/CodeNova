import { NextFunction, Request,Response} from 'express';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import { USER } from '../models/userModel';

const jwtSecret = process.env.JWT_SECRET_KEY as string;

export const protect = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            res.status(401).json({message:'You are not logged In'});
            return;
        }
        
        // this below line is not working here!
        // const decoded = (await promisify(jwt.verify)(token,jwtSecret)) as JwtPayload;
        // Solution
        const decoded = await new Promise<JwtPayload>((resolve, reject) => {
          jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(decodedToken as JwtPayload);
            }
          });
        });
        
        const currentUser = await USER.findOne({_id:decoded.id});
        if(!currentUser){
            res.status(401).json({message:'The user belonging to this token does no longer exist'});
            return;
        }

        if(currentUser.changedPasswordAfter(decoded.iat)){
            res.status(401).json({message:'User has changed password! Log in again'});
            return;
        }

        (req as any).user = currentUser;
        next();
    } catch (error) {
        res.status(400).json({message:'Something went wrong',error:(error as Error).message});
    }
}