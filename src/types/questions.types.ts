import mongoose from "mongoose";

export type TQuestion={
    _id?:mongoose.Types.ObjectId;
    question:string;
    type:"MCQ" | "T/F";
    options?:string[];
    answer:string;
    score:number;
}