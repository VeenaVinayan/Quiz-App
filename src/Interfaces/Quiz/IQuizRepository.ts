import { IBaseRepository } from "../Base/baseRepository";
import { IQuiz } from '../../models/quizModel';
import { TQuiz } from '../../types/quiz.types';
import { TQuestion } from '../../types/questions.types';

export interface IQuizRepository extends IBaseRepository<IQuiz>{
    getQuizHistory(userId : string):Promise<TQuiz[]>;
    getQuizQuestion():Promise<TQuestion[]>;
}