import { inject , injectable} from 'inversify';
import { IQuizService } from '../Interfaces/Quiz/IQuizService';
import { IQuizRepository } from '../Interfaces/Quiz/IQuizRepository';
import { QuizSaveDto } from '../DTO/Request/Quiz/QuizSaveRequestDto';
import { IQuiz } from '../models/quizModel';

export class QuizService implements IQuizService{
    constructor(
        @inject('IQuizRepository') private readonly _quizRepository : IQuizRepository
    ){}

    async saveQuiz(quizData : QuizSaveDto):Promise<boolean>{
            const res = await this._quizRepository.createNewData(quizData);
            if(res) return true;
            else return false;
    }

}