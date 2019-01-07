const debug = require('debug')('ajv:wrapper');
const Ajv = require('ajv');
const _get = require('lodash.get');
const { getFileNames, readFile } = require('../utils');
const {
  SCHEMA_ALREADY_REGISTERED,
  SCHEMA_NOT_EXIST,
  SCHEMA_HAS_ERRORS,
} = require('../services/errors');
const {
  getRawSchema,
  setRawSchema,
  deleteRawSchema,
  SCHEMA_MAP,
} = require('../services/cache');
const { validateRequest } = require('../middleware/validator');

let ajv = null;

const _getAJVSchema = key => {
  const schema = ajv.getSchema(key);
  if (!schema) throw SCHEMA_NOT_EXIST(key);
  return schema;
};

const _setAJVSchema = (schema, key) => {
  try {
    ajv.addSchema(schema, key);
  } catch (error) {
    throw SCHEMA_HAS_ERRORS(key, error);
  }
};

const _registerSchema = (schema, key) => {
  const rawSchema = getRawSchema(key);
  if (SCHEMA_MAP.size > 0 && rawSchema) throw SCHEMA_ALREADY_REGISTERED(key);
  _setAJVSchema(schema, key);
  setRawSchema(key, {
    schema,
    validator: _getAJVSchema(key),
  });
};

const _processSchemas = async (location, filenames, errors = []) => {
  const processd = await Promise.all(
    filenames.map(async file => {
      const schemaFromDir = await readFile(file);
      // Key is for refs to work inside the same directory
      // So paths are relative to schema root dir
      // for example ${process.cwd()}/schemas
      // then any ref would become filename.json or dir/dir/some-file.json
      const key = file.replace(`${location}/`, '');
      try {
        debug(`Trying to register schema ${key}`);
        _registerSchema(schemaFromDir, key);
        debug(`Registered schema ${key}`);
        return;
      } catch (error) {
        // Catch only missing ref errors otherwise throw them
        if (!_get(error, 'missingRef')) throw error;
        debug(
          `Schema has missing ref inside ${key}. MissingRef = ${
            error.missingRef
          }`,
        );
        // Cleanup...
        deleteRawSchema(key);
        ajv.removeSchema(key);
        errors.push(`${location}/${key}`);
      }
    }),
  );

  // Retry schemas that have errored...
  if (processd.length && errors.length) {
    debug(`Retrying to load schemas that have missing refs ${errors}`);
    await _processSchemas(location, errors);
  }

  return true;
};

const prepareSchemas = async (
  options = {},
  location = `${process.cwd()}/schemas`,
  ext = '.json',
) => {
  try {
    ajv = new Ajv(options);
    const filenames = await getFileNames(location, ext);
    await _processSchemas(location, filenames);
    return { validateRequest };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepareSchemas,
};
