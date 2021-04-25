import { useState, useEffect } from 'react';

function useStopwatchTime(status, onStopwatchFinished, initialValue = 0) {
  const [time, setTime] = useState(initialValue);

  useEffect(() => {
    let interval;

    if (status.isRunning) {
      // Increment the timer every 10 milliseconds to show only the
      // hundredths and tenths of a second and avoid triggering
      // unnecessary renders
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    if (status.isPaused) {
      clearInterval(interval);
    }

    if (status.isFinished) {
      clearInterval(interval);
      onStopwatchFinished(time);
      setTime(0);
    }

    // Clean up the interval after each render to prevent setTime()
    // being called even after pausing or reseting the timer
    return () => clearInterval(interval);

    // Ignore linting rules to avoid warning about including "time"
    // as dependency. Indeed, "time" should be added as a dependency,
    // but this useEffect is intended to run every time "status" changes.
    // More refactoring could be necessary to avoid properly this issue.

    // eslint-disable-next-line
  }, [status, onStopwatchFinished]);

  return time;
}

export default useStopwatchTime;
