import StopWatch from './components/StopWatch/StopWatch';
import LastRecord from './components/LastRecord/LastRecord';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import CriticalErrorPage from './components/CriticalErrorPage/CriticalErrorPage';
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
      <header className="App-header">
        {criticalError ? (
          <CriticalErrorPage details={criticalError} />
        ) : (
          <div>
            <p>Don't waste time!</p>
            <p>
              Start, pause and then finish your stopwatch to record your time.
            </p>
            <StopWatch onStopwatchFinished={onStopwatchFinished} />
            {lastRecord && <LastRecord time={lastRecord} />}
            {temporalError && <ErrorMessage message={temporalError} />}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
