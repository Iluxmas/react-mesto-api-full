const { StatusCodes } = require('../utils/StatusCodes');

class Error404 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Not Found';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = Error404;
