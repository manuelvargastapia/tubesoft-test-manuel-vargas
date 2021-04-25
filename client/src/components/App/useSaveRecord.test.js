import { act, renderHook } from '@testing-library/react-hooks/dom';
import useSaveRecord from './useSaveRecord';
import { services } from '../../services/stopwatchService';
import { ServerError, UnexpectedError } from '../../services/errors';

describe('useSaveRecord', () => {
  const spiedSaveRecordAsMilliseconds = jest.spyOn(
    services,
    'saveRecordAsMilliseconds'
  );

  it('returns initial status', () => {
    const {
      result: { current },
    } = renderHook(() => useSaveRecord());

    const [lastRecord, temporalError, criticalError] = current;

    expect(lastRecord).toBeNull();
    expect(temporalError).toBeNull();
    expect(criticalError).toBeNull();
  });

  describe('onStopwatchFinished', () => {
    it('sets lastRecord to newly saved record', async () => {
      const testRecord = 50000;

      spiedSaveRecordAsMilliseconds.mockResolvedValue({
        success: true,
        newRecord: testRecord,
      });

      const { result } = renderHook(() => useSaveRecord());
      const [_, __, ___, onStopwatchFinished] = result.current;

      await act(async () => {
        await onStopwatchFinished(expect.anything());
      });

      expect(result.current[0]).toBe(testRecord);
    });

    it('sets temporalError to ServerError message', async () => {
      const testErrorMessage = 'Termporal error';

      spiedSaveRecordAsMilliseconds.mockResolvedValue({
        success: false,
        error: new ServerError(testErrorMessage),
      });

      const { result } = renderHook(() => useSaveRecord());

      const [_, __, ___, onStopwatchFinished] = result.current;

      await act(async () => {
        await onStopwatchFinished(expect.anything());
      });

      expect(result.current[1]).toBe(testErrorMessage);
    });

    it('sets criticalError to UnexpectedError message when code is 500', async () => {
      const testErrorMessage = 'Unexpected error';

      spiedSaveRecordAsMilliseconds.mockResolvedValue({
        success: false,
        error: new UnexpectedError(testErrorMessage),
      });

      const { result } = renderHook(() => useSaveRecord());

      const [_, __, ___, onStopwatchFinished] = result.current;

      await act(async () => {
        await onStopwatchFinished(expect.anything());
      });

      expect(result.current[2]).toBe(testErrorMessage);
    });

    it('sets criticalError to UnexpectedError message when request itself fails', async () => {
      const testErrorMessage = 'Unexpected error';

      spiedSaveRecordAsMilliseconds.mockRejectedValue({
        success: false,
        error: new UnexpectedError(testErrorMessage),
      });

      const { result } = renderHook(() => useSaveRecord());

      const [_, __, ___, onStopwatchFinished] = result.current;

      await act(async () => {
        await onStopwatchFinished(expect.anything());
      });

      expect(result.current[2]).toBe(testErrorMessage);
    });
  });
});
