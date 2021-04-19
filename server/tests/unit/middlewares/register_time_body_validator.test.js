const { ValidationError } = require('joi');
const middlewares = require('../../../src/middlewares');

describe('middlewares.registerTimeBodyValidator', () => {
  it('should call next() with error when finds an error', () => {
    const mockedReq = {
      params: {},
      body: {
        milliseconds: 123.456,
      },
    };
    const mockedRes = {
      status: jest.fn().mockReturnValue(this),
      json: jest.fn().mockReturnValue(this),
    };
    const mockedNext = jest.fn();

    middlewares.registerTimeBodyValidator(mockedReq, mockedRes, mockedNext);

    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedNext.mock.calls[0][0].value).toStrictEqual(mockedReq.body);
    expect(mockedNext.mock.calls[0][0].error).toBeInstanceOf(ValidationError);
    expect(mockedNext.mock.calls[0][0].type).toBe('body');
  });

  it('should call next() without arguments when success', () => {
    const mockedReq = {
      params: {},
      body: {
        milliseconds: 90000,
      },
    };
    const mockedRes = {
      status: jest.fn().mockReturnValue(this),
      json: jest.fn().mockReturnValue(this),
    };
    const mockedNext = jest.fn();

    middlewares.registerTimeBodyValidator(mockedReq, mockedRes, mockedNext);

    expect(mockedNext.mock.calls.length).toBe(1);
    expect(mockedNext).toHaveBeenCalledWith();
  });
});
