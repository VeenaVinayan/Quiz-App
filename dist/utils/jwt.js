"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new Error("No secrets or expiry provided");
    }
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiresIn,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES;
    if (!refreshSecret || !refreshExpiresIn) {
        throw new Error("Invalid refresh token secret or expiry !!");
    }
    return jsonwebtoken_1.default.sign(payload, refreshSecret, {
        expiresIn: refreshExpiresIn,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw new Error('JWT SECRET MISSING');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded && decoded.id) {
            const payload = {
                id: decoded.id
            };
            const accessToken = (0, exports.generateAccessToken)(payload);
            return accessToken;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            console.error("TokenExpiredError: Refresh token expired!", err.message);
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            console.error("JsonWebTokenError: Invalid Refresh Token!", err.message);
        }
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
