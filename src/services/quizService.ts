import { inject , injectable} from 'inversify';
import { IQuizService } from '../Interfaces/Quiz/IQuizService';
import { IQuizRepository } from '../Interfaces/Quiz/IQuizRepository';
import { QuizSaveDto } from '../DTO/Request/Quiz/QuizSaveRequestDto';
import { TQuiz } from '../types/quiz.types';
import { TQuestion } from '../types/questions.types';
import { plainToInstance } from 'class-transformer';
import { QuestionDto } from '../DTO/Response/GetQuestionDto';
import { Question } from '../models/questionModel';

export class QuizService implements IQuizService{
    constructor(
        @inject('IQuizRepository') private readonly _quizRepository : IQuizRepository
    ){}

    async saveQuiz(quizData : QuizSaveDto):Promise<boolean>{
            const res = await this._quizRepository.createNewData(quizData);
            if(res) return true;
            else return false;
    }
    async getQuizHistory(userId : string):Promise<TQuiz[]>{
        const quizData : TQuiz[]= await this._quizRepository.getQuizHistory(userId);
        return quizData;
    }
    async getQuizQuestions():Promise<QuestionDto[]>{
        const questions : TQuestion[] = await this._quizRepository.getQuizQuestion();
        const questionDto : QuestionDto [] = questions.map((question) => plainToInstance(QuestionDto,question,{
                excludeExtraneousValues : true
        }));
        return questionDto;
    }
}