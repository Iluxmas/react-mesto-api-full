const { StatusCodes } = require('../utils/StatusCodes');

class Error409 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = Error409;
