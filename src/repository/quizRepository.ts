import { IQuizRepository } from '../Interfaces/Quiz/IQuizRepository';
import { Quiz ,IQuiz } from '../models/quizModel';
import { BaseRepository } from './baseRepository';

export class QuizRepository extends BaseRepository<IQuiz> implements IQuizRepository{
     constructor(){
         super(Quiz);
     }
     private readonly _quizModel = Quiz;
}