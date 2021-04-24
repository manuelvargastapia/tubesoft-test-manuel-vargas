import useStopwatchStatus from './useStopwatchStatus';

const mockedSetState = jest.fn();

jest.mock('react', () => ({
  useState: (initial) => [initial, mockedSetState],
}));

describe('useStopwatchStatus', () => {
  it('returns initial status', () => {
    const [status] = useStopwatchStatus();

    expect(status).toStrictEqual({
      isStopped: true,
      isRunning: false,
      isPaused: false,
      isFinished: false,
    });
  });

  it('handleStart() changes the status', () => {
    const [_, handleStart] = useStopwatchStatus();

    handleStart();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isStopped: false,
      isRunning: true,
      isPaused: false,
      isFinished: false,
    });
  });

  it('handlePause() changes the status', () => {
    const [_, __, handlePause] = useStopwatchStatus();

    handlePause();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isStopped: false,
      isRunning: false,
      isPaused: true,
      isFinished: false,
    });
  });

  it('handleFinish() changes the status', () => {
    const [_, __, ___, handleFinish] = useStopwatchStatus();

    handleFinish();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isStopped: true,
      isRunning: false,
      isPaused: false,
      isFinished: true,
    });
  });
});
