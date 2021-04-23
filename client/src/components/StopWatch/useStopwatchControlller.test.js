import useStopwatchController from './useStopwatchController';

const mockedSetState = jest.fn();

jest.mock('react', () => ({
  useState: (initial) => [initial, mockedSetState],
}));

describe('useStopwatchController', () => {
  it('returns initial status', () => {
    const [status] = useStopwatchController();

    expect(status).toStrictEqual({
      isRunning: false,
      isPaused: false,
      isStopped: true,
    });
  });

  it('handleStart() changes the status', () => {
    const [_, handleStart] = useStopwatchController();

    handleStart();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isRunning: true,
      isPaused: false,
      isStopped: false,
    });
  });

  it('handlePause() changes the status', () => {
    const [_, __, handlePause] = useStopwatchController();

    handlePause();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isRunning: false,
      isPaused: true,
      isStopped: false,
    });
  });

  it('handleFinish() changes the status', () => {
    const [_, __, ___, handleFinish] = useStopwatchController();

    handleFinish();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isRunning: false,
      isPaused: false,
      isStopped: true,
    });
  });
});
