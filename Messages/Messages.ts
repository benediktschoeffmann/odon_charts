const ErrorMessages = {
  400: "Invalid request",
  404: "Resource not found",
  500: "Server error",
};

const sendErrorResponse = (res, statusCode) => {
  const errorMessage = ErrorMessages[statusCode] || "An Error occured";

  res.status(statusCode).json({
    message: errorMessage,
  });
};
