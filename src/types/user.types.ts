import { Document } from 'mongoose';

export interface IUser extends Document  {
    name:string;
    email:string;
    phone:string;
    password:string;
}

export interface IResponsePayload {
    success :boolean;
    message:string;
}