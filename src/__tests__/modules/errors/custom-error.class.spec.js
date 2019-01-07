const {
  registerCustomErrorClass,
} = require('../../../modules/errors/custom-error.class');

const SchemaValidationError = registerCustomErrorClass('SchemaValidationError');
const CUSTOM_ERROR = new SchemaValidationError('test error');
const CUSTOM_OBJECT_ERROR = new SchemaValidationError(
  {
    message: 'test error',
  },
  400,
);

describe('Custom Errors', () => {
  it('should create a new error', () => {
    expect(SchemaValidationError).toEqual(expect.any(Function));
    expect(CUSTOM_ERROR).toBeInstanceOf(Error);
  });

  it('should return correct error message', () => {
    expect(CUSTOM_ERROR).toHaveProperty('message');
    expect(CUSTOM_ERROR).toHaveProperty('data');
    expect(CUSTOM_ERROR.message).toEqual('test error');
    expect(CUSTOM_ERROR.data).toBeUndefined();
  });

  it('should return correct error object', () => {
    expect(CUSTOM_OBJECT_ERROR).toHaveProperty('message');
    expect(CUSTOM_OBJECT_ERROR).toHaveProperty('data');
    expect(CUSTOM_OBJECT_ERROR.message).toEqual('test error');
    expect(CUSTOM_OBJECT_ERROR.data).toEqual({ message: 'test error' });
  });

  it('should return correct error status', () => {
    expect(CUSTOM_OBJECT_ERROR).toHaveProperty('statusCode');
    expect(CUSTOM_OBJECT_ERROR.statusCode).toEqual(400);
  });
});
