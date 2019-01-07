const { prepareSchemas } = require('../../services/ajv-wrapper');

let validate = null;
const { req, res, next } = {
  req: {},
  res: {},
  next: jest.fn(),
};

describe('Validation middleware', async () => {
  beforeAll(async () => {
    const { validateRequest } = await prepareSchemas();
    validate = validateRequest;
  });

  it('should return a function', () => {
    expect(validate).toBeInstanceOf(Function);
  });

  it('executing validate should return a function', () => {
    expect(validate()).toEqual(expect.any(Function));
  });

  it('validate function should have correct arguments', () => {
    expect(validate.length).toEqual(1);
  });

  describe('Validate express middleware', async () => {
    let mw = null;
    beforeAll(async () => {
      mw = validate('ref');
    });

    it('should accept three arguments, req, res, next', () => {
      expect(mw.length).toEqual(3);
    });

    it('should error when body is not present', () => {
      const error = jest.fn(e => {
        expect(e.message.errors).toEqual(
          '[body] is not a valid request method',
        );
      });
      mw(req, res, error);
      expect(error).toHaveBeenCalled();
      expect(error).toHaveBeenCalledTimes(1);
    });

    it('should error when body does not match schema', () => {
      const error = jest.fn(e => {
        expect(e.message).toHaveProperty('message');
        expect(e.message).toHaveProperty('errors');
      });
      mw(
        {
          body: {
            test: 'test',
          },
        },
        res,
        error,
      );
      expect(error).toHaveBeenCalled();
      expect(error).toHaveBeenCalledTimes(1);
    });

    it('should error when body does not match schema', () => {
      mw(
        {
          body: {
            place: [
              {
                name: 'test',
                description: 'sddsss',
              },
            ],
          },
        },
        res,
        next,
      );
      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
