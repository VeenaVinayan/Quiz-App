
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

interface ErrorResponse {
  status: "error" | "fail";
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); 

  let customError = err;

    if (!(err instanceof ApiError)) {
    customError = new ApiError(
      err.message || "Something went wrong",
      err.statusCode || 500,
      false
    );
  }

  const response: ErrorResponse = {
    status: customError.statusCode >= 500 ? "error" : "fail",
    message: customError.message,
    ...(process.env.NODE_ENV === "development" && { stack: customError.stack }),
  };

  res.status(customError.statusCode).json(response);
};
