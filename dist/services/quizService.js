"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const inversify_1 = require("inversify");
const class_transformer_1 = require("class-transformer");
const GetQuestionDto_1 = require("../DTO/Response/GetQuestionDto");
let QuizService = class QuizService {
    constructor(_quizRepository) {
        this._quizRepository = _quizRepository;
    }
    async saveQuiz(quizData) {
        const res = await this._quizRepository.createNewData(quizData);
        if (res)
            return true;
        else
            return false;
    }
    async getQuizHistory(userId) {
        const quizData = await this._quizRepository.getQuizHistory(userId);
        return quizData;
    }
    async getQuizQuestions() {
        const questions = await this._quizRepository.getQuizQuestion();
        const questionDto = questions.map((question) => (0, class_transformer_1.plainToInstance)(GetQuestionDto_1.QuestionDto, question, {
            excludeExtraneousValues: true
        }));
        return questionDto;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    __param(0, (0, inversify_1.inject)('IQuizRepository')),
    __metadata("design:paramtypes", [Object])
], QuizService);
