import { Expose , Exclude , Transform } from 'class-transformer';

export class QuestionDto{
    @Transform(({obj}) => obj._id.toString())
    @Expose()
    id!:string;

    @Expose()
    question!:string;

    @Expose()
    type!:"MCQ" | "T/F";

    @Expose()
    options!:string[];

    @Expose()
    answer!:string

    @Expose()
    score!:number;

    @Exclude()
    _id!:string;

    @Exclude()
    __v!:string;
}