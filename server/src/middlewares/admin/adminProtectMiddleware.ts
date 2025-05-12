import { NextFunction, Request,Response} from 'express';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import { ADMIN } from '../../models/adminModel';

const jwtSecret = process.env.JWT_SECRET_KEY as string;

export const protect = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {

      // Read token from header (This is for Postman)
      let adminToken: string;
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
          adminToken = req.headers.authorization.split(' ')[1];
      }

      // Read token from cookie (Frontend)
      // const token = req.cookies.token; 
      // if(!token){
      //     res.status(401).json({message:'You are not logged In'});
      //     return;
      // }
      
      const decoded = await new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(adminToken, jwtSecret, (err: any, decodedToken: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(decodedToken as JwtPayload);
          }
        });
      });
      
      const currentAdmin = await ADMIN.findOne({_id:decoded.id});
      if(!currentAdmin){
          res.status(401).json({message:'The user belonging to this token does no longer exist'});
          return;
      }

      req.admin = currentAdmin;
      next();
    } catch (error) {
      res.status(400).json({message:'Something went wrong',error:(error as Error).message});
    }
}