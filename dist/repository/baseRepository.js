"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
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
}
exports.BaseRepository = BaseRepository;
