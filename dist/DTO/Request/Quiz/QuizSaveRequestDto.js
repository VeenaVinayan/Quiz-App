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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSaveDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = __importDefault(require("mongoose"));
class QuizSaveDto {
}
exports.QuizSaveDto = QuizSaveDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDefined)({ message: 'User ID Required!' }),
    (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.default.Types.ObjectId(value)),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], QuizSaveDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(5, { message: 'At least 5 questions required!' }),
    __metadata("design:type", Array)
], QuizSaveDto.prototype, "questions", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsDefined)({ message: 'Score is required!' }),
    __metadata("design:type", Number)
], QuizSaveDto.prototype, "score", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsDefined)({ message: 'Total score is required!' }),
    __metadata("design:type", Number)
], QuizSaveDto.prototype, "totalScore", void 0);
