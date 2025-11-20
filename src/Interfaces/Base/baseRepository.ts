import { IDeleteResult, IUpdateResult } from "../../types/questions.types";

export interface IBaseRepository<T>{
    createNewData(data:Partial<T>):Promise<T>
    deleteResource(data:Partial<T>):Promise<IDeleteResult>
    updateResource(id:string,data:Partial<T>):Promise<IUpdateResult>
}