import Timer from '../Timer/Timer';
import './LastRecord.css';

function LastRecord({ time }) {
  return (
    <div className="LastRecord">
      <h2>Cool! This is your last saved time:</h2>
      <Timer time={time} />
    </div>
  );
}

export default LastRecord;
