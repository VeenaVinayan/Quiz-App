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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AddQuestionDto {
}
exports.AddQuestionDto = AddQuestionDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Question text is required" }),
    __metadata("design:type", String)
], AddQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(["MCQ", "T/F"], { message: "Type must be either 'MCQ' or 'T/F'" }),
    __metadata("design:type", String)
], AddQuestionDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.ValidateIf)((o) => o.type === "MCQ"),
    (0, class_validator_1.IsArray)({ message: "Options must be an array" }),
    (0, class_validator_1.ArrayMinSize)(4, { message: "MCQ must have at least two options" }),
    (0, class_validator_1.IsString)({ each: true, message: "Each option must be a string" }),
    __metadata("design:type", Array)
], AddQuestionDto.prototype, "options", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Answer is required" }),
    __metadata("design:type", String)
], AddQuestionDto.prototype, "answer", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)({}, { message: "Score must be a number" }),
    (0, class_validator_1.Min)(1, { message: "Score must be at least 1" }),
    __metadata("design:type", Number)
], AddQuestionDto.prototype, "score", void 0);
