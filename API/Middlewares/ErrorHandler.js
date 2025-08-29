export const ErrorHandler = (err, req, res, next) => {
  console.log("Error", err);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Something went wrong";
  }
  res.status(statusCode).json({
    success: false,
    error: true,
    message,
  });
};
