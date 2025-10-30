"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URI;
        if (URI) {
            const conn = await mongoose_1.default.connect(URI);
            console.log(`Mongodb connected : ${conn.connection.host}`);
        }
        else {
            console.log('Connection string error...');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.log('Error in MOngoDB : ', err.message);
        }
        else {
            console.error('Unexpected Error :', err);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
