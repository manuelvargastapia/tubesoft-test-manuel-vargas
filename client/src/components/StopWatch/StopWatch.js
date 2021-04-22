import { useEffect, useState } from 'react';
import Buttons from '../Buttons/Buttons';
import Timer from '../Timer/Timer';

function StopWatch() {
  const [status, setStatus] = useState({
    isRunning: false,
    isPaused: false,
    isStopped: true,
  });
  const [time, setTime] = useState(0);

  const handleStart = () => {
    setStatus({ isRunning: true, isPaused: false, isStopped: false });
  };
  const handlePause = () => {
    setStatus({ isRunning: false, isPaused: true, isStopped: false });
  };
  const handleResume = () => {
    setStatus({ isRunning: true, isPaused: false, isStopped: false });
  };
  const handleFinish = () => {
    setStatus({ isRunning: false, isPaused: false, isStopped: true });
  };

  useEffect(() => {
    let interval = null;

    if (status.isRunning) {
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

  return (
    <div data-testid="stopwatch">
      <Timer time={time} />
      <Buttons
        status={status}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onFinish={handleFinish}
      />
    </div>
  );
}

export default StopWatch;
