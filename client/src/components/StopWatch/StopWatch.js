import Buttons from '../Buttons/Buttons';
import Timer from '../Timer/Timer';
import useStopwatchController from './useStopwatchController';
import useStopwatchTime from './useStopwatchTime';

function StopWatch() {
  const [
    status,
    handleStart,
    handlePause,
    handleResume,
    handleFinish,
  ] = useStopwatchController();

  const time = useStopwatchTime(status);

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
