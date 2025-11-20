"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const mongoose_1 = require("mongoose");
class BaseRepository {
    constructor(_model) {
        this._model = _model;
    }
    async createNewData(data) {
        return this._model.create(data);
    }
    async getOwnMetadata(data) {
        return await this._model.findById(data._id);
    }
    async deleteResource(data) {
        return await this._model.deleteOne({ _id: data });
    }
    async updateResource(id, data) {
        const objId = new mongoose_1.Types.ObjectId(id);
        return await this._model.updateOne({ _id: objId }, { $set: data });
    }
}
exports.BaseRepository = BaseRepository;
