import { QuizSaveDto } from "../../DTO/Request/Quiz/QuizSaveRequestDto";

export interface IQuizService{
   saveQuiz(quizData : QuizSaveDto):Promise<boolean>;
}