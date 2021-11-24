const constants = require('../constants');

class BadRequestError extends Error {
	constructor(message) {
		super(message);

		this.name = this.constructor.name;
		this.errorCode = constants.errorCodes.BAD_REQUEST;
		this.message = message || 'Bad request';

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = BadRequestError;
