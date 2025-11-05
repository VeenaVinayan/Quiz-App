import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthRepository } from '../repository/authRepository';
import {IAuthRepository } from '../Interfaces/Auth/IAuthRepository';
import { AuthService } from '../services/authService';
import { IAuthService } from '../Interfaces/Auth/IAuthService';
import { AuthController } from '../controllers/authController';
import { QuestionRepository } from '../repository/questionRepository';
import { IQuestionRepository } from '../Interfaces/Question/IQuestionRepository';
import { QuestionService } from '../services/questionService';
import { IQuestionService } from '../Interfaces/Question/IQuestionService';
import { QuestionController} from '../controllers/questionController';
import { QuizController } from '../controllers/quizController';
import { QuizService } from '../services/quizService';
import { QuizRepository } from '../repository/quizRepository';
import { IQuizRepository } from '../Interfaces/Quiz/IQuizRepository';
import { IQuizService } from '../Interfaces/Quiz/IQuizService';

const container = new Container();

container.bind<IAuthRepository>('IAuthRepository').toDynamicValue(() =>{
    return new AuthRepository();
});
container.bind<IAuthService>('IAuthService').to(AuthService).inSingletonScope();
container.bind<AuthController>('AuthController').to(AuthController).inSingletonScope();

container.bind<IQuestionRepository>('IQuestionRepository').toDynamicValue(() =>{
    return new QuestionRepository();
});
container.bind<IQuestionService>('IQuestionService').to(QuestionService).inSingletonScope();
container.bind<QuestionController>('QuestionController').to(QuestionController).inSingletonScope();

container.bind<IQuizRepository>('IQuizRepository').toDynamicValue(() =>{
     return new QuizRepository();
})
container.bind<IQuizService>('IQuizService').to(QuizService).inSingletonScope();
container.bind<QuizController>('QuizController').to(QuizController).inSingletonScope();

export { container };