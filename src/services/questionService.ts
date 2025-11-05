import { inject, injectable } from 'inversify';
import { IQuestionRepository } from '../Interfaces/Question/IQuestionRepository';
import { IQuestionService } from '../Interfaces/Question/IQuestionService';
import { TQuestion } from '../types/questions.types';
import { AddQuestionDto } from '../DTO/Request/Question/addQuestionDto';
import { plainToInstance } from 'class-transformer';
import { QuestionDto } from '../DTO/Response/GetQuestionDto';

@injectable()
export class QuestionService implements IQuestionService{
    constructor(
        @inject('IQuestionRepository') private readonly _questionRepository : IQuestionRepository
    ){}
    async addQuestions(questions:AddQuestionDto[]):Promise<boolean>{
        const res = await this._questionRepository.createNewData(questions as Partial <TQuestion>);
        if(res) return true;
        else return false;
    }
    async getQuestions():Promise<QuestionDto[]>{
        const questions : TQuestion []= await this._questionRepository.getQuestions();
        const questionDto : QuestionDto [] = questions.map((question) => plainToInstance(QuestionDto,question,{
                                                 excludeExtraneousValues: true}));
        return questionDto;

    }
}