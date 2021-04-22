function Buttons({ status, onStart, onPause, onResume, onFinish }) {
  const finishButton = <button onClick={onFinish}>Finish</button>;

  return (
    <div data-testid="buttons">
      {status.isRunning && (
        <div>
          <button onClick={onPause}>Pause</button>
          {finishButton}
        </div>
      )}
      {status.isStopped && (
        <div>
          <button onClick={onStart}>Start</button>
          {finishButton}
        </div>
      )}
      {status.isPaused && (
        <div>
          <button onClick={onResume}>Resume</button>
          {finishButton}
        </div>
      )}
    </div>
  );
}

export default Buttons;
