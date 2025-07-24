const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
  
    // If it's a validation error, change the status code to 400
    if (err.name === "ValidationError") {
      statusCode = 400;
    }
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  };
  
  export { errorHandler };