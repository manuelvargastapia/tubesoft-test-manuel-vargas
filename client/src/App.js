import './App.css';
import StopWatch from './components/StopWatch/StopWatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Don't waste time!</p>
        <p>Start, pause and then finish your stopwatch to record your time.</p>
        <StopWatch />
      </header>
    </div>
  );
}

export default App;
