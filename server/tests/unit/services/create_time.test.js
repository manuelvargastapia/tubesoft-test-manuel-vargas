const { createTime } = require('../../../src/services');
const { Times } = require('../../../src/models');

describe('services.createTime', () => {
  it('should return error without newTime when Times.create() fails', async () => {
    const testError = new Error('Unexpected error');
    const spiedCreate = jest
      .spyOn(Times, 'create')
      .mockRejectedValue(testError);

    const testPayload = expect.anything();
    const result = await createTime(testPayload);

    expect(result).toStrictEqual({
      error: testError,
      newTime: null,
    });
    expect(spiedCreate).toHaveBeenCalledTimes(1);
    expect(spiedCreate).toHaveBeenCalledWith(testPayload);
  });

  it('should return newTime without error when success', async () => {
    const testNewTime = { milliseconds: 30000 };
    const spiedCreate = jest
      .spyOn(Times, 'create')
      .mockResolvedValue(testNewTime);

    const testPayload = expect.anything();
    const result = await createTime(testPayload);

    expect(result).toStrictEqual({
      error: null,
      newTime: testNewTime,
    });
    expect(spiedCreate).toHaveBeenCalledTimes(1);
    expect(spiedCreate).toHaveBeenCalledWith(testPayload);
  });
});
