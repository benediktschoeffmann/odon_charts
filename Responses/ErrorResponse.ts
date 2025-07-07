import { Response } from "express";

const ErrorMessages: Record<number, string> = {
  400: "Invalid request",
  404: "Resource not found",
  500: "Server error",
};

const sendErrorResponse = (res: Response, statusCode: keyof typeof ErrorMessages, error?: any) => {
  error && console.log(error);
  const errorMessage = ErrorMessages[statusCode] || "An Error occured";

  res.status(statusCode).json({
    message: errorMessage,
  });
};


export default sendErrorResponse;