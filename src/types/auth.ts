import { LoginResponseDto  } from "../DTO/Response/LoginResponseDto";

export type TUserData = {
   _id:string;
   name:string;
   phone:string;
   email:string;
   password:string;
}
export type TokenPayload = {
    id:string;
}
export type TLoginResponse = {
   user: LoginResponseDto;
   accessToken: string;
   refreshToken: string;
}