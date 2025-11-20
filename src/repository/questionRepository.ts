import { Question, IQuestion } from '../models/questionModel';
import { BaseRepository } from './baseRepository';
import { IQuestionRepository } from '../Interfaces/Question/IQuestionRepository';
import { TQuestionResult , TQuestion} from '../types/questions.types';

export class QuestionRepository extends BaseRepository<IQuestion> implements IQuestionRepository{
    constructor(){
        super(Question);
    }
    private readonly _questionModel = Question;

    async getQuestions(page: number, perPage : number):Promise<TQuestionResult<TQuestion>>{
        const [questions , totalCount ] = await Promise.all([
                        this._questionModel.find().skip((page-1)*perPage).limit(perPage).lean(),
                        this._questionModel.countDocuments()
        ]);
        const questionResult:TQuestionResult<TQuestion>={
             questions,
             totalCount,
        }
        return {questions,totalCount };
    }
}