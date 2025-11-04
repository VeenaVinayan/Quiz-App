import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthRepository } from '../repository/authRepository';
import {IAuthRepository } from '../Interfaces/Auth/IAuthRepository';
import { AuthService } from '../services/authService';
import { IAuthService } from '../Interfaces/Auth/IAuthService';
import { AuthController } from '../controllers/authController';

const container = new Container();

container.bind<IAuthRepository>('IAuthRepository').toDynamicValue(() =>{
    return new AuthRepository();
});

container.bind<IAuthService>('IAuthService').to(AuthService).inSingletonScope();
container.bind<AuthController>('AuthController').to(AuthController).inSingletonScope();

export { container };