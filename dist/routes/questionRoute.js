"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const validateDto_1 = require("../middlewares/validateDto");
const EditQuestionDto_1 = require("../DTO/Request/Question/EditQuestionDto");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
const questionController = config_1.container.get('QuestionController');
router.post('/questions', auth_1.auth, questionController.addquestions);
router.get('/questions/:page/:perPage', auth_1.auth, questionController.getQuestions);
router.delete('/questions/:questionId', auth_1.auth, questionController.deleteQuestion);
router.put('/questions', auth_1.auth, (0, validateDto_1.validateDto)(EditQuestionDto_1.EditQuestionDto), questionController.updateQuestion);
exports.default = router;
