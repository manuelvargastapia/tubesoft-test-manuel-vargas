import { useState } from 'react';
import { services } from './services/stopwatchService';
import { ServerError, UnexpectedError } from './services/errors';

function useSaveRecord() {
  const [lastRecord, setLastRecord] = useState(null);
  const [criticalError, setCriticalError] = useState(null);
  const [temporalError, setTemporalError] = useState(null);

  const onRecordSavedSuccess = (result) => {
    if (result.success) {
      setLastRecord(result.newRecord);
    } else {
      if (result.error instanceof UnexpectedError) {
        setCriticalError(result.error.message);
      }

      if (result.error instanceof ServerError) {
        setTemporalError(result.error.message);
      }
    }
  };

  const onRecordSavedFailed = (result) => {
    setCriticalError(result.error.message);
  };

  const onStopwatchFinished = (time) => {
    services
      .saveRecordAsMilliseconds(time)
      .then(onRecordSavedSuccess)
      .catch(onRecordSavedFailed);
  };

  return [lastRecord, temporalError, criticalError, onStopwatchFinished];
}

export default useSaveRecord;
