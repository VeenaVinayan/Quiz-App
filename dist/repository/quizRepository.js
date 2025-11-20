"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const quizModel_1 = require("../models/quizModel");
const baseRepository_1 = require("./baseRepository");
const mongoose_1 = require("mongoose");
const questionModel_1 = require("../models/questionModel");
class QuizRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(quizModel_1.Quiz);
        this._quizModel = quizModel_1.Quiz;
        this._questionModel = questionModel_1.Question;
    }
    async getQuizHistory(userId) {
        const quizData = await this._quizModel.aggregate([
            { $match: { userId: new mongoose_1.Types.ObjectId(userId) } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            { $project: { userId: 1, score: 1, totalScore: 1, createdAt: 1 } }
        ]);
        return quizData;
    }
    async getQuizQuestion() {
        const questions = await this._questionModel.aggregate([
            { $sample: { size: 10 } }
        ]);
        return questions;
    }
}
exports.QuizRepository = QuizRepository;
