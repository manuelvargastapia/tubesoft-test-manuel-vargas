import Buttons from '../Buttons/Buttons';
import Timer from '../Timer/Timer';
import useStopwatchStatus from './useStopwatchStatus';
import useStopwatchTime from './useStopwatchTime';

function StopWatch({ onStopwatchFinished }) {
  const [status, handleStart, handlePause, handleFinish] = useStopwatchStatus();

  const time = useStopwatchTime(status, onStopwatchFinished);

  return (
    <div data-testid="stopwatch">
      <Timer time={time} />
      <Buttons
        status={status}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleStart}
        onFinish={handleFinish}
      />
    </div>
  );
}

export default StopWatch;
