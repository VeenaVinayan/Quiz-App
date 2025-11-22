import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/dbConfig';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import  questionRoute  from './routes/questionRoute';
import quizRoute from './routes/quizRoute';

dotenv.config();
const app = express();
const port = process.env.PORT || 7002;

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/api/auth', authRoute);
app.use('/api/question',questionRoute);
app.use('/api/user',quizRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
