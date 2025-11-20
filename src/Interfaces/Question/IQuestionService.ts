import { AddQuestionDto } from '../../DTO/Request/Question/addQuestionDto';
import { QuestionDto } from '../../DTO/Response/GetQuestionDto';
import { EditQuestionDto } from '../../DTO/Request/Question/EditQuestionDto';
import { TQuestionResult } from '../../types/questions.types';

export interface IQuestionService{
     addQuestions(questions :AddQuestionDto[]):Promise<boolean>;
     getQuestions(page: number,perPage : number):Promise<TQuestionResult<QuestionDto>>;
     deleteQuestion(questionId : string):Promise<boolean>;
     updateQuestion(data : EditQuestionDto):Promise<boolean>;
}
