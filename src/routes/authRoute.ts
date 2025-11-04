import express from 'express';
import { container } from '../config/config';
import { AuthController } from '../controllers/authController';
import { validateDto    } from '../middlewares/validateDto';
import { RegisterRequestDto } from '../DTO/Request/registerDTO';
import { LoginDto } from '../DTO/Request/loginDto';

const router = express.Router();

const authController = container.get<AuthController>('AuthController');

router.post('/signup',validateDto(RegisterRequestDto),authController.register);
router.post('/login',validateDto(LoginDto),authController.login)
router.post('/refresh',authController.getAccessToken);

export default router;
