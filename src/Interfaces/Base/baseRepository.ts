export interface IBaseRepository<T>{
    createNewData(data:Partial<T>):Promise<T>
}