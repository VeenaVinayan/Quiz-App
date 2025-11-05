import  express  from 'express';
import { container } from '../config/config';
import { QuestionController } from '../controllers/questionController';

const router = express.Router();

const questionController = container.get<QuestionController>('QuestionController');

router.post('/questions',questionController.addquestions);
router.get('/questions',questionController.getQuestions);

export default router;