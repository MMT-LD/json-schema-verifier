const {
  SCHEMA_ALREADY_REGISTERED,
  SCHEMA_NOT_EXIST,
  SCHEMA_HAS_ERRORS,
} = require('../errors');

const key = 'test';
const file = 'test.json';
const messages = [`Some error`];

describe('Error Messages', () => {
  it('SCHEMA_ALREADY_REGISTERED should return a function and be an instance of Error and be named', () => {
    expect(SCHEMA_ALREADY_REGISTERED).toEqual(expect.any(Function));
    expect(SCHEMA_ALREADY_REGISTERED(key)).toBeInstanceOf(Error);
  });

  it('SCHEMA_ALREADY_REGISTERED should return correct message', () => {
    const { message } = SCHEMA_ALREADY_REGISTERED(key);
    expect(message).toEqual(
      `Schema with key: '${key}' has already been registered`,
    );
  });

  it('SCHEMA_NOT_EXIST should return a function', () => {
    expect(SCHEMA_NOT_EXIST).toEqual(expect.any(Function));
    expect(SCHEMA_NOT_EXIST(key)).toBeInstanceOf(Error);
  });

  it('SCHEMA_NOT_EXIST should return correct message', () => {
    const { message } = SCHEMA_NOT_EXIST(key);
    expect(message).toEqual(`Schema with key: '${key}' does not exist`);
  });

  it('SCHEMA_HAS_ERRORS should return a function', () => {
    expect(SCHEMA_HAS_ERRORS).toEqual(expect.any(Function));
    expect(SCHEMA_HAS_ERRORS(file, messages[0])).toBeInstanceOf(Error);
  });

  it('SCHEMA_HAS_ERRORS should return correct message', () => {
    const { message } = SCHEMA_HAS_ERRORS(file, messages[0]);
    expect(message).toEqual(`'${file}' has errors. ${messages[0]}`);
  });
});
