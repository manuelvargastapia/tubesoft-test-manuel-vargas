const { ValidationError } = require('joi');
const errorHandler = require('../../../src/middlewares/error_handler');

describe('middlewares.errorHandler', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      json(payload) {
        this.data = payload;
      },
    };
    next.mockClear();
  });

  it('should return 500 for any non-Joi error', () => {
    const testError = new Error('Unexpected error');
    errorHandler(testError, req, res, next);
    expect(res.code).toBe(500);
    expect(res.data).toStrictEqual({
      error: 'Internal server error',
      message: testError.message,
    });
  });

  it('should return 400 with error type and message for Joi ValidationErrors', () => {
    const testError = new ValidationError('Validation error message', {
      type: 'error type',
    });

    errorHandler(
      { error: testError, type: testError.details.type },
      req,
      res,
      next
    );

    expect(res.code).toBe(400);
    expect(res.data).toStrictEqual({
      error: `Invalid data in ${testError.details.type}`,
      message: testError.toString(),
    });
  });
});
