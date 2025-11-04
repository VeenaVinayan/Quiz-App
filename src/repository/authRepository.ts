import  { User } from '../models/userModel';
import { BaseRepository } from './baseRepository';
import { IAuthRepository } from '../Interfaces/Auth/IAuthRepository';
import { TUserData } from '../types/auth';
import { IUserDocument } from '../models/userModel';

export class AuthRepository extends BaseRepository<IUserDocument> implements IAuthRepository{
    constructor(){
        super(User);
    }
    private readonly _userModel = User;
    async isUserExist(email: string):Promise<TUserData | null>{
         try{
             const isUserExist : TUserData | null = await this._userModel.findOne({email:email});
             return isUserExist;
         }catch(err){
             throw err;
         }
    }
}