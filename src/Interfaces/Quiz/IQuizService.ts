import { QuizSaveDto } from "../../DTO/Request/Quiz/QuizSaveRequestDto";
import { TQuiz } from '../../types/quiz.types';
import { QuestionDto } from "../../DTO/Response/GetQuestionDto";

export interface IQuizService{
   saveQuiz(quizData : QuizSaveDto):Promise<boolean>;
   getQuizHistory(userId: string):Promise<TQuiz[]>;
   getQuizQuestions():Promise<QuestionDto[]>
}
