import { Response } from "express";

const ErrorMessages: Record<number, string> = {
  400: "Invalid request",
  404: "Resource not found",
  500: "Server error",
};

const sendErrorResponse = (
  res: Response,
  statusCode: keyof typeof ErrorMessages,
  errorDescription?: any
) => {
  errorDescription && console.log(errorDescription);
  const errorMessage = ErrorMessages[statusCode] || "An Error occured";

  if (errorDescription) {
    res.status(statusCode).json({
      message: errorMessage,
      error: errorDescription,
    });
  } else {
    res.status(statusCode).json({
      message: errorMessage,
    });
  }
};

export default sendErrorResponse;
