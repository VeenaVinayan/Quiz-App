import { IBaseRepository } from '../Base/baseRepository';
import { IQuestion } from '../../models/questionModel';
import { TQuestionResult , TQuestion } from '../../types/questions.types';

export interface IQuestionRepository extends IBaseRepository<IQuestion>{
    getQuestions(page : number, perPage :number):Promise<TQuestionResult<TQuestion>>
}