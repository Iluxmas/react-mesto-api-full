const { StatusCodes } = require('../utils/StatusCodes');

class Error400 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Bad request';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = Error400;
