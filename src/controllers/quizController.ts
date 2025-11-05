import { inject , injectable } from 'inversify';
import { STATUS_CODE } from '../Constants/HttpStatusCode';
import { MESSAGES } from '../Constants/messages';
import { Request, Response, NextFunction } from 'express';
import { IQuizService } from '../Interfaces/Quiz/IQuizService';

@injectable()
export class QuizController{
     constructor(
     @inject('IQuizService') private readonly _quizService : IQuizService
     ){}
     
     saveQuiz = async(req: Request, res: Response, next : NextFunction) =>{
         try{
            console.log('Save Quiz !');
            const result = await this._quizService.saveQuiz(req.body);
            if(result){
                res.status(STATUS_CODE.CREATED).json({success:true,message:MESSAGES.CREATED});
            }else{
                res.status(STATUS_CODE.FORBIDDEN).json({success:false,message:MESSAGES.ERROR});
            }
         }catch(err){
             next(err);
         }
     }
}