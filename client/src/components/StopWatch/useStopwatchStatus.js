import { useState } from 'react';

function useStopwatchStatus() {
  const [status, setStatus] = useState({
    isStopped: true,
    isRunning: false,
    isPaused: false,
    isFinished: false,
  });

  const handleStart = () => {
    setStatus({
      isStopped: false,
      isRunning: true,
      isPaused: false,
      isFinished: false,
    });
  };
  const handlePause = () => {
    setStatus({
      isStopped: false,
      isRunning: false,
      isPaused: true,
      isFinished: false,
    });
  };
  const handleFinish = () => {
    setStatus({
      isStopped: true,
      isRunning: false,
      isPaused: false,
      isFinished: true,
    });
  };

  return [status, handleStart, handlePause, handleFinish];
}

export default useStopwatchStatus;
