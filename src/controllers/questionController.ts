import { inject, injectable } from 'inversify';
import { STATUS_CODE } from '../Constants/HttpStatusCode';
import { MESSAGES } from '../Constants/messages';
import { Request , Response ,NextFunction} from 'express';
import { IQuestionService } from '../Interfaces/Question/IQuestionService';
import { questionMapper  } from '../Mapper/addQuestions';
import { AddQuestionDto } from '../DTO/Request/Question/addQuestionDto';

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
             const questions = await this._questionService.getQuestions();
             if(questions){
                 res.status(STATUS_CODE.OK).json({success: true,data:questions});
             }else{
                 res.status(STATUS_CODE.BAD_REQUEST).json({success:false,message:MESSAGES.ERROR});
             }   
        }catch(err){
            next(err);
        }
    }
}
