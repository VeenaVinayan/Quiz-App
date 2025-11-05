import mongoose , { Schema } from "mongoose";

export interface IQuestion extends Document{
     question : string;
     type:"MCQ" | "T/F";
     options?:string[];
     answer:string;
     score:number;
}

const QuestionSchema = new Schema<IQuestion>({
    question :{
         type:String,
         required:true,
    },
    type:{
        type:String,
        required:true,
        enum: ["MCQ" , "T/F"],
    },
    options:{
        type:[String],
        required: function(this: IQuestion){
             return this.type ==="MCQ"
        }
    },
    answer:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
        min:0,
    }
});

export const Question = mongoose.model<IQuestion>("Question",QuestionSchema); 