import axios from 'axios';
import { ServerError, UnexpectedError } from './errors';
import StopwatchService from './stopwatchService';

jest.mock('axios');

describe('StopwatchService', () => {
  describe('saveRecordAsMilliseconds', () => {
    it('returns unexpected error when axios.post() request fails', async () => {
      axios.post.mockRejectedValue(new Error('Axios error'));

      const stopwatchService = new StopwatchService();
      const result = await stopwatchService.saveRecordAsMilliseconds(
        expect.anything()
      );

      expect(result).toHaveProperty('success', false);
      expect(result).toHaveProperty('error');
      expect(result.error).toBeInstanceOf(UnexpectedError);
      expect(result.error).toHaveProperty(
        'message',
        'An unexpected error has occurred while creating a new record'
      );
    });

    it('returns unexpected error when axios.post() fails with 400', async () => {
      axios.post.mockResolvedValue({
        status: 400,
        data: {
          error: 'Invalid data',
          message: 'ValidationError',
        },
      });

      const stopwatchService = new StopwatchService();
      const result = await stopwatchService.saveRecordAsMilliseconds(
        expect.anything()
      );

      expect(result).toHaveProperty('success', false);
      expect(result).toHaveProperty('error');
      expect(result.error).toBeInstanceOf(UnexpectedError);
      expect(result.error).toHaveProperty(
        'message',
        'Invalid data: ValidationError'
      );
    });

    it('returns server error when axios.post() fails with 500', async () => {
      axios.post.mockResolvedValue({
        status: 500,
        data: { error: 'Internal server error', message: expect.anything() },
      });

      const stopwatchService = new StopwatchService();
      const result = await stopwatchService.saveRecordAsMilliseconds(
        expect.anything()
      );

      expect(result).toHaveProperty('success', false);
      expect(result).toHaveProperty('error');
      expect(result.error).toBeInstanceOf(ServerError);
      expect(result.error).toHaveProperty(
        'message',
        'Server error. Please, try again later'
      );
    });

    it('returns unexpected error when axios.post() fails with unknown code', async () => {
      axios.post.mockResolvedValue({
        status: expect.anything(),
        data: expect.anything(),
      });

      const stopwatchService = new StopwatchService();
      const result = await stopwatchService.saveRecordAsMilliseconds(
        expect.anything()
      );

      expect(result).toHaveProperty('success', false);
      expect(result).toHaveProperty('error');
      expect(result.error).toBeInstanceOf(UnexpectedError);
      expect(result.error).toHaveProperty(
        'message',
        'An unexpected error has occurred while creating a new record'
      );
    });

    it('returns newly saved record when axios.post() success', async () => {
      axios.post.mockResolvedValue({
        status: 201,
        data: {
          uuid: expect.anything(),
          milliseconds: 30000,
          updatedAt: expect.anything(),
          createdAt: expect.anything(),
        },
      });

      const stopwatchService = new StopwatchService();
      const result = await stopwatchService.saveRecordAsMilliseconds(30000);

      expect(result).toHaveProperty('success', true);
      expect(result).not.toHaveProperty('error');
      expect(result).toHaveProperty('newRecord', 30000);
    });
  });
});
