import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AddQuestionDto } from "../DTO/Request/Question/addQuestionDto";
import { TQuestion } from '../types/questions.types';
import { ApiError } from '../utils/ApiError';

export const questionMapper = async (questions :TQuestion[]):Promise<AddQuestionDto[]> => { 

  const dtos :AddQuestionDto[] =  questions.map((question: TQuestion) =>plainToInstance(AddQuestionDto,question));
  for(let dto of dtos){
     const errors = await validate(dto);
     if (errors.length > 0) {
      throw new ApiError("Validation Error in Add Questions !");
     }
  }
   
  return dtos;
};
