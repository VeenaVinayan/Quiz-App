"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const validateDto_1 = require("../middlewares/validateDto");
const registerDTO_1 = require("../DTO/Request/registerDTO");
const loginDto_1 = require("../DTO/Request/loginDto");
const router = express_1.default.Router();
const authController = config_1.container.get('AuthController');
router.post('/signup', (0, validateDto_1.validateDto)(registerDTO_1.RegisterRequestDto), authController.register);
router.post('/login', (0, validateDto_1.validateDto)(loginDto_1.LoginDto), authController.login);
exports.default = router;
