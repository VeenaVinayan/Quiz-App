import { IBaseRepository } from '../Base/baseRepository';
import { IQuestion } from '../../models/questionModel';
import { TQuestion } from '../../types/questions.types';

export interface IQuestionRepository extends IBaseRepository<IQuestion>{
    getQuestions():Promise<TQuestion []>
}