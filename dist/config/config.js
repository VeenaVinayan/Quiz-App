"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const authRepository_1 = require("../repository/authRepository");
const authService_1 = require("../services/authService");
const authController_1 = require("../controllers/authController");
const container = new inversify_1.Container();
exports.container = container;
container.bind('IAuthRepository').toDynamicValue(() => {
    return new authRepository_1.AuthRepository();
});
container.bind('IAuthService').to(authService_1.AuthService).inSingletonScope();
container.bind('AuthController').to(authController_1.AuthController).inSingletonScope();
