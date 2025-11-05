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
exports.QuestionService = void 0;
const inversify_1 = require("inversify");
const class_transformer_1 = require("class-transformer");
const GetQuestionDto_1 = require("../DTO/Response/GetQuestionDto");
let QuestionService = class QuestionService {
    constructor(_questionRepository) {
        this._questionRepository = _questionRepository;
    }
    async addQuestions(questions) {
        const res = await this._questionRepository.createNewData(questions);
        if (res)
            return true;
        else
            return false;
    }
    async getQuestions() {
        const questions = await this._questionRepository.getQuestions();
        const questionDto = questions.map((question) => (0, class_transformer_1.plainToInstance)(GetQuestionDto_1.QuestionDto, question, {
            excludeExtraneousValues: true
        }));
        return questionDto;
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IQuestionRepository')),
    __metadata("design:paramtypes", [Object])
], QuestionService);
