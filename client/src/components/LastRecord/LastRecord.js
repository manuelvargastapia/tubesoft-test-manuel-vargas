import Timer from '../Timer/Timer';

function LastRecord({ time }) {
  return (
    <div>
      <p>Cool! This is your last saved time:</p>
      <Timer time={time} />
    </div>
  );
}

export default LastRecord;
