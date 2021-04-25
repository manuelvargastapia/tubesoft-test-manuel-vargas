import StopWatch from '../StopWatch/StopWatch';
import LastRecord from '../LastRecord/LastRecord';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CriticalErrorPage from '../CriticalErrorPage/CriticalErrorPage';
import useSaveRecord from './useSaveRecord';
import './App.css';

function App() {
  const [
    lastRecord,
    temporalError,
    criticalError,
    onStopwatchFinished,
  ] = useSaveRecord();

  return (
    <div className="App">
      {criticalError ? (
        <CriticalErrorPage details={criticalError} />
      ) : (
        <div>
          <h2>Don't waste time!</h2>
          <h3>
            Start, pause and then finish your stopwatch to record your time.
          </h3>
          <StopWatch onStopwatchFinished={onStopwatchFinished} />
          {lastRecord && <LastRecord time={lastRecord} />}
          {temporalError && <ErrorMessage message={temporalError} />}
        </div>
      )}
    </div>
  );
}

export default App;
