"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const userModel_1 = require("../models/userModel");
const baseRepository_1 = require("./baseRepository");
class AuthRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(userModel_1.User);
        this._userModel = userModel_1.User;
    }
    async isUserExist(email) {
        try {
            const isUserExist = await this._userModel.findOne({ email: email });
            return isUserExist;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.AuthRepository = AuthRepository;
