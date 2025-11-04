import  { RegisterRequestDto} from '../../DTO/Request/registerDTO';
import { TLoginResponse } from '../../types/auth';
import { LoginDto } from '../../DTO/Request/loginDto';

export interface IAuthService{
    register(userData : RegisterRequestDto):Promise<boolean>;
    login(data:LoginDto):Promise<TLoginResponse | null>;
    getAccessToken(token:string):Promise<string | null>;
}