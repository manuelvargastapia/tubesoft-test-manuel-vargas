import useStopwatchStatus from './useStopwatchStatus';

const mockedSetState = jest.fn();

jest.mock('react', () => ({
  useState: (initial) => [initial, mockedSetState],
}));

describe('useStopwatchStatus', () => {
  it('returns initial status', () => {
    const [status] = useStopwatchStatus();

    expect(status).toStrictEqual({
      isRunning: false,
      isPaused: false,
      isStopped: true,
    });
  });

  it('handleStart() changes the status', () => {
    const [_, handleStart] = useStopwatchStatus();

    handleStart();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isRunning: true,
      isPaused: false,
      isStopped: false,
    });
  });

  it('handlePause() changes the status', () => {
    const [_, __, handlePause] = useStopwatchStatus();

    handlePause();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isRunning: false,
      isPaused: true,
      isStopped: false,
    });
  });

  it('handleFinish() changes the status', () => {
    const [_, __, ___, handleFinish] = useStopwatchStatus();

    handleFinish();

    expect(mockedSetState).toHaveBeenCalledTimes(1);
    expect(mockedSetState).toHaveBeenCalledWith({
      isRunning: false,
      isPaused: false,
      isStopped: true,
    });
  });
});
