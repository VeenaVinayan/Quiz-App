import { IQuizRepository } from '../Interfaces/Quiz/IQuizRepository';
import { Quiz ,IQuiz } from '../models/quizModel';
import { BaseRepository } from './baseRepository';
import { TQuiz } from '../types/quiz.types';
import { Types } from 'mongoose';
import { TQuestion } from '../types/questions.types';
import { Question } from '../models/questionModel';

export class QuizRepository extends BaseRepository<IQuiz> implements IQuizRepository{
     constructor(){
         super(Quiz);
     }
     private readonly _quizModel = Quiz;
     private readonly _questionModel = Question;
     async getQuizHistory(userId: string):Promise<TQuiz[]>{

        const quizData : TQuiz[] = await this._quizModel.aggregate([
            {$match: {userId: new Types.ObjectId(userId)}},
            {$sort: {createdAt:-1}},
            {$limit:10},
            {$project:{userId:1,score:1,totalScore:1,createdAt:1}}
        ]);
         return quizData;
     }
     
     async getQuizQuestion():Promise<TQuestion[]>{
        const questions : TQuestion[] = await this._questionModel.aggregate([ 
               {$sample: {size: 10 }} 
        ]);
        return questions;
     }
    
    }