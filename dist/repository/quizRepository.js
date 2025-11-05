"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const quizModel_1 = require("../models/quizModel");
const baseRepository_1 = require("./baseRepository");
class QuizRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(quizModel_1.Quiz);
        this._quizModel = quizModel_1.Quiz;
    }
}
exports.QuizRepository = QuizRepository;
