function Buttons({ status, onStart, onPause, onResume, onFinish }) {
  const buildFinishButton = (disabled = false) => (
    <button disabled={disabled} onClick={onFinish}>
      Finish
    </button>
  );

  return (
    <div data-testid="buttons">
      {status.isRunning && (
        <div>
          <button onClick={onPause}>Pause</button>
          {buildFinishButton()}
        </div>
      )}
      {status.isStopped && (
        <div>
          <button onClick={onStart}>Start</button>
          {buildFinishButton(true)}
        </div>
      )}
      {status.isPaused && (
        <div>
          <button onClick={onResume}>Resume</button>
          {buildFinishButton()}
        </div>
      )}
    </div>
  );
}

export default Buttons;
