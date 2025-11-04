"use strict";
// import express ,{ Request ,Response}  from 'express';
// import  connectDB  from './config/dbConfig';
// import dotenv from 'dotenv';
// import authRoute from './routes/authRoute';
// import cors from 'cors';
// import { errorHandler } from './middlewares/error';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const port = process.env.PORT || 7002;
// connectDB();
// app.use(cors({
//     origin:'http://localhost:5001',
//     credentials:true,
// }))
// app.use('/api/auth',authRoute);
// app.use(errorHandler);
// app.listen(port,() => console.log('Server Started !!'));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./middlewares/error");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 7002;
(0, dbConfig_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5001',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use('/api/auth', authRoute_1.default);
app.use(error_1.errorHandler);
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
