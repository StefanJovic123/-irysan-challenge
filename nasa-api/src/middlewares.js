function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'Error' : err.stack,
  });
}

function validateMiddleware(schema, path) {
  return (req, res, next) => {
    if (!req[path]) {
      throw new Error('Supported request fields are "body", "query", "params');
    }

    const { error } = schema.validate(req[path]);

    if (error) {
      return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    return next();
  };
}

module.exports = {
  notFound,
  errorHandler,
  validateMiddleware,
};
