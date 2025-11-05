"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepository = void 0;
const questionModel_1 = require("../models/questionModel");
const baseRepository_1 = require("./baseRepository");
class QuestionRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(questionModel_1.Question);
        this._questionModel = questionModel_1.Question;
    }
    async getQuestions() {
        const questions = await this._questionModel.find().limit(10).lean();
        return questions;
    }
}
exports.QuestionRepository = QuestionRepository;
