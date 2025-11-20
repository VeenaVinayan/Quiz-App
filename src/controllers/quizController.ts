import { inject , injectable } from 'inversify';
import { STATUS_CODE } from '../Constants/HttpStatusCode';
import { MESSAGES } from '../Constants/messages';
import { Request, Response, NextFunction } from 'express';
import { IQuizService } from '../Interfaces/Quiz/IQuizService';
import { TQuiz } from '../types/quiz.types';
import { QuestionDto } from '../DTO/Response/GetQuestionDto';

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
     getQuizHistory = async(req: Request, res: Response ,next: NextFunction) =>{
        try{
             console.log("Get Quiz History !!");
             const { userId } = req.params;
             if(!userId) return res.status(STATUS_CODE.BAD_REQUEST).json({message:MESSAGES.ERROR});
             const quizData : TQuiz [] = await this._quizService.getQuizHistory(userId);
             if(quizData){
                res.status(STATUS_CODE.OK).json({success:true,quizData});
             }else{
                res.status(STATUS_CODE.NO_CONTENT).json({success:true});
             }
        }catch(err){
            console.log(err);
            next(err);
        }
     }
     getQuizQuestions = async(req:Request, res: Response, next : NextFunction) => {
        try{
                const questions : QuestionDto[] = await this._quizService.getQuizQuestions();
                if(questions){
                     res.status(STATUS_CODE.OK).json({success:true,questions});
                }else{
                    res.status(STATUS_CODE.BAD_REQUEST).json({success:true,message:MESSAGES.ERROR});
                }
        }catch(err){
            next(err);
        }
     }
}