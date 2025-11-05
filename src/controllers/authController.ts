import { IAuthService } from '../Interfaces/Auth/IAuthService';
import { inject , injectable } from 'inversify';
import { STATUS_CODE } from '../Constants/HttpStatusCode';
import { MESSAGES } from '../Constants/messages';
import { Request , Response ,NextFunction} from 'express';

@injectable()
export class AuthController{
    constructor(
        @inject('IAuthService') private readonly _authservice : IAuthService
    ){}

    register = async (req :Request , res : Response, next: NextFunction) =>{
         try{
             console.log(req.body);
             const  registerResponse = await this._authservice.register(req.body);
             console.log('Register Response ::',registerResponse);
             if(registerResponse){
                 res.status(STATUS_CODE.CREATED).json({success:true,message:MESSAGES.CREATED})
             }else{
                res.status(STATUS_CODE.FORBIDDEN).json({success:false,message:MESSAGES.ERROR})
             }
         }catch(error){ 
            next(error);
         }
    }
    login = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            console.log('Auth controller ::',req.body);
            const loginResponse = await this._authservice.login(req.body);
            if(loginResponse){
                res.cookie("token",loginResponse.refreshToken,{
                    httpOnly:true,
                    sameSite:"none",
                    secure:true,
                    maxAge:10*24*60*60*1000,
                });
                res.status(STATUS_CODE.OK).json({succes:true,message:MESSAGES.LOGIN_SUCCESS,userData:loginResponse});
            }else{
                res.status(STATUS_CODE.FORBIDDEN).json({message:MESSAGES.LOGIN_FAILED});
            }
        }catch(err){
            next(err);
        }
    }
     getAccessToken = async(req: Request, res:Response,next: NextFunction) =>{
        try{
        if(!req.cookies || !req.cookies.token){
            res.status(STATUS_CODE.BAD_REQUEST).json({message:MESSAGES.SUCCESS});
            return;
        }
        const refreshToken = req.cookies.token;
        const accessToken = await this._authservice.getAccessToken(refreshToken);
        if(accessToken){ 
             res.status(STATUS_CODE.OK).json({success:true,accessToken});
        }else{
            res.status(STATUS_CODE.UNAUTHORIZED).json({success:false,message:MESSAGES.REFRESH_TOKEN_EXPIRD});
        }     
        }catch(err){
            next(err)
        }
    }
    logout = async(req:Request, res: Response,next :NextFunction) =>{
        try{
            res.clearCookie('token',{
                 httpOnly:true,
                 secure:true,
                 sameSite:"strict"
            });
            res.status(STATUS_CODE.OK).json({success:true,message:MESSAGES.LOGOUT_SUCCESS});
        }catch(err){
            next(err);
        }
    }
}