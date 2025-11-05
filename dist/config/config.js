"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const authRepository_1 = require("../repository/authRepository");
const authService_1 = require("../services/authService");
const authController_1 = require("../controllers/authController");
const questionRepository_1 = require("../repository/questionRepository");
const questionService_1 = require("../services/questionService");
const questionController_1 = require("../controllers/questionController");
const quizController_1 = require("../controllers/quizController");
const quizService_1 = require("../services/quizService");
const quizRepository_1 = require("../repository/quizRepository");
const container = new inversify_1.Container();
exports.container = container;
container.bind('IAuthRepository').toDynamicValue(() => {
    return new authRepository_1.AuthRepository();
});
container.bind('IAuthService').to(authService_1.AuthService).inSingletonScope();
container.bind('AuthController').to(authController_1.AuthController).inSingletonScope();
container.bind('IQuestionRepository').toDynamicValue(() => {
    return new questionRepository_1.QuestionRepository();
});
container.bind('IQuestionService').to(questionService_1.QuestionService).inSingletonScope();
container.bind('QuestionController').to(questionController_1.QuestionController).inSingletonScope();
container.bind('IQuizRepository').toDynamicValue(() => {
    return new quizRepository_1.QuizRepository();
});
container.bind('IQuizService').to(quizService_1.QuizService).inSingletonScope();
container.bind('QuizController').to(quizController_1.QuizController).inSingletonScope();
