"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatusCode_1 = require("../Constants/HttpStatusCode");
const messages_1 = require("../Constants/messages");
function auth(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("Token ::", token);
        if (!token) {
            res.status(HttpStatusCode_1.STATUS_CODE.UNAUTHORIZED)
                .json({ success: false, message: messages_1.MESSAGES.UNAUTHORIZED });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }
    catch (err) {
        res.status(HttpStatusCode_1.STATUS_CODE.UNAUTHORIZED)
            .json({ success: false, message: messages_1.MESSAGES.UNAUTHORIZED });
    }
}
