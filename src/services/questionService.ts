import { inject, injectable } from 'inversify';
import { IQuestionRepository } from '../Interfaces/Question/IQuestionRepository';
import { IQuestionService } from '../Interfaces/Question/IQuestionService';
import { IDeleteResult, IUpdateResult, TQuestion, TQuestionResult } from '../types/questions.types';
import { AddQuestionDto } from '../DTO/Request/Question/addQuestionDto';
import { plainToInstance } from 'class-transformer';
import { QuestionDto } from '../DTO/Response/GetQuestionDto';
import { EditQuestionDto } from '../DTO/Request/Question/EditQuestionDto';

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
    async getQuestions(page : number, perPage : number):Promise<TQuestionResult<QuestionDto>>{
        const result : TQuestionResult<TQuestion>= await this._questionRepository.getQuestions(page,perPage);
        const questionDto : QuestionDto [] = result.questions.map((question) => plainToInstance(QuestionDto,question,{
                                                 excludeExtraneousValues: true}));
        const questionDtoResult : TQuestionResult<QuestionDto> ={
             questions:questionDto,
             totalCount:result.totalCount
        }                                         
        return questionDtoResult;
    }
    async deleteQuestion(questionId : string):Promise<boolean>{
         const deleteResult : IDeleteResult= await this._questionRepository.deleteResource(questionId);
         if(deleteResult.acknowledged){
            return true;
         }else return false;
    }
    async updateQuestion(data : EditQuestionDto):Promise<boolean>{
        const updateData : TQuestion = {
             question:data.question,
             type:data.type,
             options:data?.options,
             answer:data.answer,
             score:data.score,
        }
        const updateResult : IUpdateResult = await this._questionRepository.updateResource(data.id,updateData);
        if(updateResult.modifiedCount === 1) return true;
        else return false;
    }
}