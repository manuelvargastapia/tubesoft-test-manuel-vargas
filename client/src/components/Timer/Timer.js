// Algorithm explanation:
//
// We want to format the milliseconds to be shown as '00:00:00' (from
// left to right: minutes, seconds, and milliseconds).
//
// (i) Get the ammount of 'parts' of a second do we have: a millisecond
// is the 60000th part of a minute and it's the 1000th part of a second,
// so, for example, we use 'milliseconds / 60000' to know how many parts
// of a minute do we have.
// (ii) Set an upper limit for each field: we use '% X' to stop the loop
// of formated values at 'X - 1' (the max value will be '59:59:99').
// (iii) Use 'Math.floor()' to prevent formatting fractional numbers
// and also to ensure showing always hundredths of a second as
// milliseconds (e. g., 9 milliseconds are still shown as '00').
// (iv) Add a leading '0' and 'slice(-2)' to show 1 digit values as '0X'
// and keep 2 digits values as that.
function Timer({ time }) {
  const formatMinutes = (milliseconds) => {
    return ('0' + Math.floor((milliseconds / 60000) % 60)).slice(-2);
  };

  const formatSeconds = (milliseconds) => {
    return ('0' + Math.floor((milliseconds / 1000) % 60)).slice(-2);
  };

  const formatMilliseconds = (milliseconds) => {
    return ('0' + Math.floor((milliseconds / 10) % 100)).slice(-2);
  };

  return (
    <div data-testid="timer">
      <span>{formatMinutes(time)}:</span>
      <span>{formatSeconds(time)}:</span>
      <span>{formatMilliseconds(time)}</span>
    </div>
  );
}

export default Timer;
