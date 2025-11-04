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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const class_transformer_1 = require("class-transformer");
const LoginResponseDto_1 = require("../DTO/Response/LoginResponseDto");
let AuthService = class AuthService {
    constructor(_authRepository) {
        this._authRepository = _authRepository;
    }
    async register(registerData) {
        const res = await this._authRepository.isUserExist(registerData.email);
        if (res)
            return true;
        else {
            const registerResponse = await this._authRepository.createNewData(registerData);
            if (registerResponse)
                return true;
            else
                return false;
        }
    }
    async login(loginData) {
        const userData = await this._authRepository.isUserExist(loginData.email);
        console.log('User Data ::', userData);
        if (!userData)
            return null;
        const isVerified = await bcrypt_1.default.compare(loginData.password, userData.password);
        if (!isVerified || !userData)
            return null;
        else {
            const payload = {
                id: userData._id,
            };
            const accessToken = (0, jwt_1.generateAccessToken)(payload);
            const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
            const loginData = {
                userData: { ...(0, class_transformer_1.plainToInstance)(LoginResponseDto_1.LoginResponseDto, userData, {
                        excludeExtraneousValues: true
                    }) },
                accessToken: accessToken ?? "",
                refreshToken: refreshToken ?? "",
            };
            return loginData;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IAuthRepository')),
    __metadata("design:paramtypes", [Object])
], AuthService);
