"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const validateDto_1 = require("../middlewares/validateDto");
const QuizSaveRequestDto_1 = require("../DTO/Request/Quiz/QuizSaveRequestDto");
const auth_1 = require("../middlewares/auth");
const quizController = config_1.container.get('QuizController');
const router = express_1.default.Router();
router.post('/quiz', auth_1.auth, (0, validateDto_1.validateDto)(QuizSaveRequestDto_1.QuizSaveDto), quizController.saveQuiz);
router.get('/quiz/history/:userId', auth_1.auth, quizController.getQuizHistory);
router.get('/quiz', auth_1.auth, quizController.getQuizQuestions);
exports.default = router;
