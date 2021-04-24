import { renderHook, act } from '@testing-library/react-hooks/dom';
import useStopwatchTime from './useStopwatchTime';

// This test uses react-hooks-testing-library to be able to test
// an isolated hook that calls useEffect(), thus, it requires
// a proper running environment (a functional component).
// react-hooks-testing-library solves this problem easily.

describe('useStopwatchTime', () => {
  beforeEach(() => {
    // Mock and reset setInterval() between tests
    jest.useFakeTimers();
  });

  it('calls setInterval() and update the state when status.isRunning', () => {
    const { result } = renderHook(() =>
      useStopwatchTime({
        isStopped: false,
        isRunning: true,
        isPaused: false,
        isFinished: false,
      })
    );

    act(() => {
      jest.advanceTimersByTime(30);
    });

    expect(setInterval).toHaveBeenCalledTimes(4); // first render and 3 due to jest.advanceTimersByTime(30)
    expect(clearInterval).toHaveBeenCalledTimes(3);
    expect(result.current).toBe(30);
  });

  it('calls clearInterval() and stop the state when status.isPaused', () => {
    const { result } = renderHook(() =>
      useStopwatchTime(
        {
          isStopped: false,
          isRunning: false,
          isPaused: true,
          isFinished: false,
        },
        30000
      )
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(30000);
  });

  it('calls clearInterval() and resets the state when status.isFinished', () => {
    const { result } = renderHook(() =>
      useStopwatchTime(
        {
          isStopped: false,
          isRunning: false,
          isPaused: false,
          isFinished: true,
        },
        30000
      )
    );

    expect(clearInterval).toHaveBeenCalledTimes(3); // isFinished, render due reseting time and clean up
    expect(result.current).toBe(0);
  });
});