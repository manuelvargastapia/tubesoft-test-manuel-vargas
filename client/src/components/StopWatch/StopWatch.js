import Buttons from '../Buttons/Buttons';
import Timer from '../Timer/Timer';
import useStopwatchController from './useStopwatchController';
import useTime from './useTime';

function StopWatch() {
  const [
    status,
    handleStart,
    handlePause,
    handleResume,
    handleFinish,
  ] = useStopwatchController();

  const time = useTime(status);

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
