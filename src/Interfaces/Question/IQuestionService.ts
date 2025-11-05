import { AddQuestionDto } from '../../DTO/Request/Question/addQuestionDto';
import { QuestionDto } from '../../DTO/Response/GetQuestionDto';

export interface IQuestionService{
     addQuestions(questions :AddQuestionDto[]):Promise<boolean>;
     getQuestions():Promise<QuestionDto []>;
}
