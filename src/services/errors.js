const {
  registerCustomErrorClass,
} = require('../modules/errors/custom-error.class');

const SchemaCacheValidationError = registerCustomErrorClass(
  'SchemaCacheValidationError',
);
const SchemaValidationError = registerCustomErrorClass('SchemaValidationError');

module.exports = {
  SCHEMA_ALREADY_REGISTERED: key =>
    new SchemaCacheValidationError(
      `Schema with key: '${key}' has already been registered`,
      500,
    ),
  SCHEMA_NOT_EXIST: key =>
    new SchemaCacheValidationError(
      `Schema with key: '${key}' does not exist`,
      500,
    ),
  SCHEMA_HAS_ERRORS: (file, message) =>
    new SchemaValidationError(`'${file}' has errors. ${message}`, 400),
  SCHEMA_VALIDATION_ERRORS: message =>
    new SchemaValidationError(
      {
        message: {
          message: `Request has errors and can't be matched against its schema.`,
          errors: message,
        },
      },
      400,
    ),
};
