import { IsArray, ArrayMinSize, IsNumber, IsDefined } from 'class-validator';
import { Expose , Transform } from 'class-transformer';
import mongoose from 'mongoose' ;

export class QuizSaveDto {
  @Expose()
  @IsDefined({ message: 'User ID Required!' })
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  userId!: mongoose.Types.ObjectId;

  @Expose()
  @IsArray()
  @ArrayMinSize(5, { message: 'At least 5 questions required!' })
  questions!: string[];

  @Expose()
  @IsNumber()
  @IsDefined({ message: 'Score is required!' })
  score!: number;

  @Expose()
  @IsNumber()
  @IsDefined({ message: 'Total score is required!' })
  totalScore!: number;
}
