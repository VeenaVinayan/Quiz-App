"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    let customError = err;
    if (!(err instanceof ApiError_1.ApiError)) {
        customError = new ApiError_1.ApiError(err.message || "Something went wrong", err.statusCode || 500, false);
    }
    const response = {
        status: customError.statusCode >= 500 ? "error" : "fail",
        message: customError.message,
        ...(process.env.NODE_ENV === "development" && { stack: customError.stack }),
    };
    res.status(customError.statusCode).json(response);
};
exports.errorHandler = errorHandler;
