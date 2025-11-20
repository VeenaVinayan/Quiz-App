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
    async getQuestions(page, perPage) {
        const [questions, totalCount] = await Promise.all([
            this._questionModel.find().skip((page - 1) * perPage).limit(perPage).lean(),
            this._questionModel.countDocuments()
        ]);
        const questionResult = {
            questions,
            totalCount,
        };
        return { questions, totalCount };
    }
}
exports.QuestionRepository = QuestionRepository;
