import { useState } from 'react';

function Buttons() {
  const [status, setStatus] = useState({
    isRunning: false,
    isPaused: false,
    isStoped: true,
  });

  const handleStart = () => {
    setStatus({ isRunning: true, isPaused: false, isStoped: false });
  };
  const handlePause = () => {
    setStatus({ isRunning: false, isPaused: true, isStoped: false });
  };
  const handleResume = () => {
    setStatus({ isRunning: true, isPaused: false, isStoped: false });
  };
  const handleFinish = () => {
    setStatus({ isRunning: false, isPaused: false, isStoped: true });
  };

  const finishButton = <button onClick={handleFinish}>Finish</button>;

  return (
    <div data-testid="buttons">
      {status.isRunning && (
        <div>
          <button onClick={handlePause}>Pause</button>
          {finishButton}
        </div>
      )}
      {status.isStoped && (
        <div>
          <button onClick={handleStart}>Start</button>
          {finishButton}
        </div>
      )}
      {status.isPaused && (
        <div>
          <button onClick={handleResume}>Resume</button>
          {finishButton}
        </div>
      )}
    </div>
  );
}

export default Buttons;
