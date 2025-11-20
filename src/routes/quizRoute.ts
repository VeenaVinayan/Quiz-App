import express from 'express';
import { QuizController } from '../controllers/quizController';
import { container } from '../config/config';
import { validateDto } from '../middlewares/validateDto';
import { QuizSaveDto } from '../DTO/Request/Quiz/QuizSaveRequestDto';
import { auth } from '../middlewares/auth';
const quizController = container.get<QuizController>('QuizController');

const router = express.Router();

router.post('/quiz',auth,validateDto(QuizSaveDto),quizController.saveQuiz);
router.get('/quiz/history/:userId',auth,quizController.getQuizHistory); 
router.get('/quiz',auth,quizController.getQuizQuestions);

export default router;