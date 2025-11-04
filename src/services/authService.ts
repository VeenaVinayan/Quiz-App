import { injectable , inject} from 'inversify';
import { IAuthService } from '../Interfaces/Auth/IAuthService';
import { RegisterRequestDto } from '../DTO/Request/registerDTO';
import { IAuthRepository } from '../Interfaces/Auth/IAuthRepository';
import bcrypt from 'bcrypt';
import { LoginDto } from '../DTO/Request/loginDto';
import { TUserData } from '../types/auth';
import { TokenPayload , TLoginResponse} from '../types/auth';
import { generateAccessToken, generateRefreshToken ,verifyRefreshToken } from '../utils/jwt';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from '../DTO/Response/LoginResponseDto';

@injectable()
export class AuthService implements IAuthService{
    constructor(
       @inject('IAuthRepository') private readonly _authRepository : IAuthRepository
    ){}
    async register(registerData:RegisterRequestDto):Promise<boolean>{
        const res  = await this._authRepository.isUserExist(registerData.email);
        if(res) return true;
        else{
          const registerResponse = await this._authRepository.createNewData(registerData);
          if(registerResponse) return true;
          else return false;
        }
  }
   async getAccessToken(token : string):Promise<string | null>{
            return verifyRefreshToken(token);
        }
        
  async login(loginData:LoginDto) :Promise<TLoginResponse | null>{
     const userData : TUserData | null = await this._authRepository.isUserExist(loginData.email);
     console.log('User Data ::',userData);
     if(!userData) return null;
     const isVerified = await bcrypt.compare(loginData.password,userData.password);
     if(!isVerified || ! userData) return null;
     else{
       const payload : TokenPayload = {
         id:userData._id,
       }
       const accessToken = generateAccessToken(payload);
       const refreshToken = generateRefreshToken(payload);
       const loginData : TLoginResponse = {
          userData :{ ...plainToInstance(LoginResponseDto,userData,{
                    excludeExtraneousValues : true })},
          accessToken : accessToken ?? "",
          refreshToken : refreshToken ?? "",          
       }
       return loginData;
     }
  }

}