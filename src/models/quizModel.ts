import mongoose , { Schema } from 'mongoose';

export interface IQuiz extends Document {
    userId:Schema.Types.ObjectId;
    questions:string[];
    score:number;
    totalScore:number;
}

const QuizSchema = new Schema<IQuiz>({
    userId:{
         type:Schema.Types.ObjectId,
         ref:'User',
         required:true,
      },
    questions:{
         type:[String],
         required:true,
    },
    score:{
        type:Number,
        required:true,
    },  
    totalScore:{
        type:Number,
        required:true,
    }
},{timestamps:true});

export const Quiz = mongoose.model<IQuiz>("Quiz",QuizSchema);