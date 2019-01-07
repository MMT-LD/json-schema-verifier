const SCHEMA_MAP = new Map();

const getRawSchema = key => SCHEMA_MAP.get(key);

const setRawSchema = (key, data) => SCHEMA_MAP.set(key, data);

const deleteRawSchema = key => SCHEMA_MAP.delete(key);

module.exports = {
  getRawSchema,
  setRawSchema,
  deleteRawSchema,
  SCHEMA_MAP,
};
