import {
  IsString,
  IsArray,
  IsEnum,
  IsNotEmpty,
  ArrayMinSize,
  IsNumber,
  Min,
  ValidateIf,
} from "class-validator";
import { Expose } from "class-transformer";

export class EditQuestionDto{
  @Expose()
  @IsString()
  @IsNotEmpty({message: "Id is required"})
  id!: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: "Question text is required" })
  question!: string;

  @Expose()
  @IsEnum(["MCQ", "T/F"], { message: "Type must be either 'MCQ' or 'T/F'" })
  type!: "MCQ" | "T/F";

  @Expose()
  @ValidateIf((o) => o.type === "MCQ")
  @IsArray({ message: "Options must be an array" })
  @ArrayMinSize(4, { message: "MCQ must have at least two options" })
  @IsString({ each: true, message: "Each option must be a string" })
  options?: string[];

  @Expose()
  @IsString()
  @IsNotEmpty({ message: "Answer is required" })
  answer!: string;

  @Expose()
  @IsNumber({}, { message: "Score must be a number" })
  @Min(1, { message: "Score must be at least 1" })
  score!: number;
}

    
