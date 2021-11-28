const constants = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.errorCode = constants.errorCodes.NOT_FOUND;
    this.message = message || 'Resource Not found';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NotFoundError;
