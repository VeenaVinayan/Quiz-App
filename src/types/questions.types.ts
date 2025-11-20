import mongoose from "mongoose";
import { QuestionDto } from "../DTO/Response/GetQuestionDto";

export type TQuestion={
    _id?:mongoose.Types.ObjectId;
    question:string;
    type:"MCQ" | "T/F";
    options?:string[];
    answer:string;
    score:number;
}
export interface IDeleteResult{
    acknowledged:boolean;
    deleteCount?:number;
}

export interface IUpdateResult{
    acknowledged: boolean;
    matchedCount:number;
    modifiedCount:number;
}

export type TQuestionResult<T> = {
    questions: T[];
    totalCount:number
}