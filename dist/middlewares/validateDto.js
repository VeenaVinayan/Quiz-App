"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDto(dtoClass) {
    return async (req, res, next) => {
        console.log(req.body);
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.body, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });
        const errors = await (0, class_validator_1.validate)(dto, { whitelist: true });
        if (errors.length > 0) {
            console.log('Errors ::', errors);
            return res.status(400).json({
                message: 'Validation Failed !',
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints,
                }))
            });
        }
        req.dto = dto;
        next();
    };
}
