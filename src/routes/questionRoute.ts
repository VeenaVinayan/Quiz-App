import  express  from 'express';
import { container } from '../config/config';
import { QuestionController } from '../controllers/questionController';
import { validateDto } from '../middlewares/validateDto';
import { EditQuestionDto } from '../DTO/Request/Question/EditQuestionDto';
import { auth } from '../middlewares/auth';

const router = express.Router();

const questionController = container.get<QuestionController>('QuestionController');

router.post('/questions',auth,questionController.addquestions);
router.get('/questions/:page/:perPage',auth,questionController.getQuestions);
router.delete('/questions/:questionId',auth,questionController.deleteQuestion);
router.put('/questions',auth,validateDto(EditQuestionDto),questionController.updateQuestion);

export default router;