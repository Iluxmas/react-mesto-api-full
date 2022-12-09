const { StatusCodes } = require('../utils/StatusCodes');

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Authorization error';
    this.statusCode = StatusCodes.AUTH_ERROR;
  }
}

module.exports = Error401;
