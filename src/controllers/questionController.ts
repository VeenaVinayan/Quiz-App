import { inject, injectable } from 'inversify';
import { STATUS_CODE } from '../Constants/HttpStatusCode';
import { MESSAGES } from '../Constants/messages';
import { Request , Response ,NextFunction} from 'express';
import { IQuestionService } from '../Interfaces/Question/IQuestionService';
import { questionMapper  } from '../Mapper/addQuestions';
import { AddQuestionDto } from '../DTO/Request/Question/addQuestionDto';
import { TQuestionResult } from '../types/questions.types';
import { QuestionDto } from '../DTO/Response/GetQuestionDto';

@injectable()
export class QuestionController{
    constructor(
        @inject('IQuestionService') private readonly _questionService : IQuestionService
    ){}

    addquestions = async(req: Request , res: Response, next: NextFunction) =>{
         try{
             const questionDto : AddQuestionDto[] = await questionMapper(req.body);
             const result = await this._questionService.addQuestions(questionDto);
             if(result){
                res.status(STATUS_CODE.CREATED).json({success:true,message:MESSAGES.CREATED})
             }
         }catch(err){
             next(err);
         }
    }
    getQuestions = async(req : Request,res : Response, next: NextFunction) =>{
        try{
             const { page, perPage } = req.params;
             if(!page || !perPage){
                 res.send(STATUS_CODE.BAD_REQUEST).json({message:MESSAGES.MISSING_FIELDS});
                 return;
             }
             const questionResult : TQuestionResult<QuestionDto>= await this._questionService.getQuestions(Number(page),Number(perPage));
             if(questionResult){
                 res.status(STATUS_CODE.OK).json({success: true,data:questionResult});
             }else{
                 res.status(STATUS_CODE.BAD_REQUEST).json({success:false,message:MESSAGES.ERROR});
             }   
        }catch(err){
            next(err);
        }
    }
    deleteQuestion = async(req: Request, res: Response, next : NextFunction) =>{
        try{
                const {questionId } = req.params;
                if(!questionId){
                    res.status(STATUS_CODE.BAD_REQUEST).json({message:MESSAGES.MISSING_FIELDS});
                } 
                const response = await this._questionService.deleteQuestion(questionId);
                if(response){
                    res.status(STATUS_CODE.OK).json({message:MESSAGES.SUCCESS});
                }else{
                    res.status(STATUS_CODE.BAD_REQUEST).json({message:MESSAGES.ERROR});
                }
        }catch(err){
            next(err);
        }
    }
    updateQuestion = async(req: Request, res: Response, next: NextFunction) =>{
         try{
                const response = await this._questionService.updateQuestion(req.body);
                if(response){
                    res.status(STATUS_CODE.OK).json({success:true});
                }else{
                    res.status(STATUS_CODE.BAD_REQUEST).json({success:false});
                }
         }catch(err){
            console.log("Error in update Question ::",err);
            next(err);
         }
    }
}
