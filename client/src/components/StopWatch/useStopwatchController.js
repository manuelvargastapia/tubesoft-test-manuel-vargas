import { useState } from 'react';

function useStopwatchController() {
  const [status, setStatus] = useState({
    isRunning: false,
    isPaused: false,
    isStopped: true,
  });

  const handleStart = () => {
    setStatus({ isRunning: true, isPaused: false, isStopped: false });
  };
  const handlePause = () => {
    setStatus({ isRunning: false, isPaused: true, isStopped: false });
  };
  const handleFinish = () => {
    setStatus({ isRunning: false, isPaused: false, isStopped: true });
  };

  return [status, handleStart, handlePause, handleFinish];
}

export default useStopwatchController;
