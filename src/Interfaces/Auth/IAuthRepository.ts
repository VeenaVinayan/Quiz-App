import { IBaseRepository } from "../Base/baseRepository";
import { IUser } from '../../types/user.types';
import { TUserData } from "../../types/auth";

export interface IAuthRepository extends IBaseRepository<IUser>{
     isUserExist(email : string) :Promise<TUserData | null>
}
