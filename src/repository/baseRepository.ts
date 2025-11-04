import  {Model } from 'mongoose';
import { IBaseRepository } from '../Interfaces/Base/baseRepository';

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private readonly _model: Model<T>){}

    async createNewData(data: Partial<T>) :Promise<T> {
        return this._model.create(data);
    }
    async getOwnMetadata(data:Partial<T> & {_id :string}):Promise<T | null>{
         return await this._model.findById(data._id);
    }
}