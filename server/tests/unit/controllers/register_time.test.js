const { registerTime } = require('../../../src/controllers');
const services = require('../../../src/services');

jest.mock('../../../src/services');

describe('controllers.registerTime', () => {
  it('should call next() with error when createTime fails', async () => {
    const testError = new Error('Unexpected error');
    services.createTime.mockImplementation(async (_) => ({
      newTime: null,
      error: testError,
    }));

    const mockedReq = {
      params: {},
      body: expect.anything(),
    };
    const mockedRes = {
      status: jest.fn().mockReturnValue(this),
      json: jest.fn().mockReturnValue(this),
    };
    const mockedNext = jest.fn();

    await registerTime(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(testError);
    expect(services.createTime).toHaveBeenCalledTimes(1);
  });

  it('should return 201 with created record when success', async () => {
    const testNewTime = { milliseconds: 30000 };
    services.createTime.mockImplementation(async (_) => ({
      newTime: testNewTime,
      error: null,
    }));

    const mockedReq = {
      params: {},
      body: expect.anything(),
    };
    const mockedRes = {
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
    const mockedNext = jest.fn();

    await registerTime(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.code).toBe(201);
    expect(mockedRes.data).toStrictEqual(testNewTime);
    expect(services.createTime).toHaveBeenCalledTimes(1);
  });
});
