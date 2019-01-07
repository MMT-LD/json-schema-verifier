const _get = require('lodash.get');
const { getRawSchema } = require('../services/cache');
const { SCHEMA_VALIDATION_ERRORS } = require('../services/errors');

const validateRequest = (schema, validate = 'body', ext = '.json') => (
  req,
  res,
  next,
) => {
  if (!_get(req, `${validate}`))
    return next(
      SCHEMA_VALIDATION_ERRORS(`[${validate}] is not a valid request method`),
    );
  const { validator } = getRawSchema(`${schema}${ext}`);
  const valid = validator(req[validate]);
  if (!valid) next(SCHEMA_VALIDATION_ERRORS(validator.errors));
  return next();
};

module.exports = { validateRequest };
