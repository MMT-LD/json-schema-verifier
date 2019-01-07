const _get = require('lodash.get');

const _isErrorObject = error => _get(error, 'message');

const registerCustomErrorClass = (constructor, code) =>
  class CustomErrorExtender extends Error {
    name = `Custom${constructor}`;

    constructor(error, statusCode = code || undefined) {
      super();
      // Create default statusCode
      this.statusCode = statusCode;
      // Full error object
      this.data = _isErrorObject(error) && { ...error };
      // Check for error object or it must be a string
      this.message = (_isErrorObject(error) && error.message) || error;
      // Cleaner stack trace
      Error.captureStackTrace(this, constructor);
    }
  };

module.exports = { registerCustomErrorClass };
