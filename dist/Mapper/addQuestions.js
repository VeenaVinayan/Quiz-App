"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionMapper = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const addQuestionDto_1 = require("../DTO/Request/Question/addQuestionDto");
const ApiError_1 = require("../utils/ApiError");
const questionMapper = async (questions) => {
    const dtos = questions.map((question) => (0, class_transformer_1.plainToInstance)(addQuestionDto_1.AddQuestionDto, question));
    for (let dto of dtos) {
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError("Validation Error in Add Questions !");
        }
    }
    return dtos;
};
exports.questionMapper = questionMapper;
