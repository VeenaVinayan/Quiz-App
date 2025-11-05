import { Request, Response ,NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { STATUS_CODE } from '../Constants/HttpStatusCode';
import { MESSAGES } from '../Constants/messages';

interface AuthenticatedRequest extends Request {
     user ?: string
}

export function auth(req : AuthenticatedRequest, res: Response, next: NextFunction){
   try {   
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token ::",token);
     if(!token){
         res.status(STATUS_CODE.UNAUTHORIZED)
         .json({success:false, message:MESSAGES.UNAUTHORIZED})  
         return;
     }
     const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET!
     ) as JwtPayload;
     req.user=decoded.id;
     next();
}catch(err){
  res.status(STATUS_CODE.UNAUTHORIZED)
     .json({success:false,message:MESSAGES.UNAUTHORIZED}) 
}
}

