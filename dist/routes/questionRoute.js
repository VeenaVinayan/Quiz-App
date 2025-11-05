"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const router = express_1.default.Router();
const questionController = config_1.container.get('QuestionController');
router.post('/questions', questionController.addquestions);
router.get('/questions', questionController.getQuestions);
exports.default = router;
