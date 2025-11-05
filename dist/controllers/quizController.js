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
exports.QuizController = void 0;
const inversify_1 = require("inversify");
const HttpStatusCode_1 = require("../Constants/HttpStatusCode");
const messages_1 = require("../Constants/messages");
let QuizController = class QuizController {
    constructor(_quizService) {
        this._quizService = _quizService;
        this.saveQuiz = async (req, res, next) => {
            try {
                console.log('Save Quiz !');
                const result = await this._quizService.saveQuiz(req.body);
                if (result) {
                    res.status(HttpStatusCode_1.STATUS_CODE.CREATED).json({ success: true, message: messages_1.MESSAGES.CREATED });
                }
                else {
                    res.status(HttpStatusCode_1.STATUS_CODE.FORBIDDEN).json({ success: false, message: messages_1.MESSAGES.ERROR });
                }
            }
            catch (err) {
                next(err);
            }
        };
    }
};
exports.QuizController = QuizController;
exports.QuizController = QuizController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IQuizService')),
    __metadata("design:paramtypes", [Object])
], QuizController);
