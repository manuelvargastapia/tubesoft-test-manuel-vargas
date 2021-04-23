import { useState, useEffect } from 'react';

function useTime(status) {
  const [time, setTime] = useState(0);

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

    if (status.isStopped) {
      clearInterval(interval);
      setTime(0);
    }

    // Clean up the interval after each render to prevent setTime()
    // being called even after pausing or reseting the timer
    return () => clearInterval(interval);
  }, [status]);

  return time;
}

export default useTime;
