const { StatusCodes } = require('../utils/StatusCodes');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = StatusCodes.SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === StatusCodes.SERVER_ERROR ? 'Internal Server Error (Внутренняя ошибка сервера)' : message });

  next();
};

module.exports = errorsHandler;
