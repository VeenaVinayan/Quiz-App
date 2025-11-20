import  {Model, Types } from 'mongoose';
import { IBaseRepository } from '../Interfaces/Base/baseRepository';
import { IDeleteResult , IUpdateResult } from '../types/questions.types';

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private readonly _model: Model<T>){}

    async createNewData(data: Partial<T>) :Promise<T> {
        return this._model.create(data);
    }
    async getOwnMetadata(data:Partial<T> & {_id :string}):Promise<T | null>{
         return await this._model.findById(data._id);
    }
    async deleteResource(data:Partial<T>):Promise<IDeleteResult>{
        return await this._model.deleteOne({_id:data});
    }
    async updateResource(id:string,data:Partial<T>):Promise<IUpdateResult>{
        const objId = new Types.ObjectId(id);
        return await this._model.updateOne({_id:objId},{$set:data});
    }
}