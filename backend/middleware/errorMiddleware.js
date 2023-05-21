const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// if I add err as my first argument then express will identify that this is my custom error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // condition for mongoose cast error
  if (err.name === "CastError" && err.kind === "ObjectID") {
    statusCode = 404;
    message = "resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stacks,
  });
};

export { notFound, errorHandler };
