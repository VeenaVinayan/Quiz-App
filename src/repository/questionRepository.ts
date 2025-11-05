import { Question, IQuestion } from '../models/questionModel';
import { BaseRepository } from './baseRepository';
import { IQuestionRepository } from '../Interfaces/Question/IQuestionRepository';
import { TQuestion } from '../types/questions.types';

export class QuestionRepository extends BaseRepository<IQuestion> implements IQuestionRepository{
    constructor(){
        super(Question);
    }
    private readonly _questionModel = Question;

    async getQuestions():Promise<TQuestion []>{
        const questions = await this._questionModel.find().limit(10).lean();
        return questions;
    }
}