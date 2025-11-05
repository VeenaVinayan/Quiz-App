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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const HttpStatusCode_1 = require("../Constants/HttpStatusCode");
const messages_1 = require("../Constants/messages");
let AuthController = class AuthController {
    constructor(_authservice) {
        this._authservice = _authservice;
        this.register = async (req, res, next) => {
            try {
                console.log(req.body);
                const registerResponse = await this._authservice.register(req.body);
                console.log('Register Response ::', registerResponse);
                if (registerResponse) {
                    res.status(HttpStatusCode_1.STATUS_CODE.CREATED).json({ success: true, message: messages_1.MESSAGES.CREATED });
                }
                else {
                    res.status(HttpStatusCode_1.STATUS_CODE.FORBIDDEN).json({ success: false, message: messages_1.MESSAGES.ERROR });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                console.log('Auth controller ::', req.body);
                const loginResponse = await this._authservice.login(req.body);
                if (loginResponse) {
                    res.cookie("token", loginResponse.refreshToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                        maxAge: 10 * 24 * 60 * 60 * 1000,
                    });
                    res.status(HttpStatusCode_1.STATUS_CODE.OK).json({ succes: true, message: messages_1.MESSAGES.LOGIN_SUCCESS, userData: loginResponse });
                }
                else {
                    res.status(HttpStatusCode_1.STATUS_CODE.FORBIDDEN).json({ message: messages_1.MESSAGES.LOGIN_FAILED });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.getAccessToken = async (req, res, next) => {
            try {
                if (!req.cookies || !req.cookies.token) {
                    res.status(HttpStatusCode_1.STATUS_CODE.BAD_REQUEST).json({ message: messages_1.MESSAGES.SUCCESS });
                    return;
                }
                const refreshToken = req.cookies.token;
                const accessToken = await this._authservice.getAccessToken(refreshToken);
                if (accessToken) {
                    res.status(HttpStatusCode_1.STATUS_CODE.OK).json({ success: true, accessToken });
                }
                else {
                    res.status(HttpStatusCode_1.STATUS_CODE.UNAUTHORIZED).json({ success: false, message: messages_1.MESSAGES.REFRESH_TOKEN_EXPIRD });
                }
            }
            catch (err) {
                next(err);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                res.clearCookie('token', {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict"
                });
                res.status(HttpStatusCode_1.STATUS_CODE.OK).json({ success: true, message: messages_1.MESSAGES.LOGOUT_SUCCESS });
            }
            catch (err) {
                next(err);
            }
        };
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IAuthService')),
    __metadata("design:paramtypes", [Object])
], AuthController);
