const { StatusCodes } = require('../utils/StatusCodes');

class Error403 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Error403;
