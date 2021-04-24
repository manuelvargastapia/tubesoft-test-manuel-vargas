import axios from 'axios';
import { UnexpectedError, ServerError } from './errors';

// We use a class to be able to mock it with Jest.
// Otherwise, we'd need to use ES5 modules
export default class StopwatchService {
  async saveRecordAsMilliseconds(record) {
    try {
      const response = await axios.post(
        '/register_time',
        { milliseconds: record },
        { baseURL: 'http://localhost:3000' }
      );

      switch (response.status) {
        case 400:
          return {
            success: false,
            error: new UnexpectedError(
              `${response.data.error}: ${response.data.message}`
            ),
          };
        case 500:
          return {
            success: false,
            error: new ServerError('Server error. Please, try again later'),
          };
        case 201:
          return {
            success: true,
            newRecord: response.data.milliseconds,
          };

        default:
          return {
            success: false,
            error: new UnexpectedError(
              'An unexpected error has occurred while creating a new record'
            ),
          };
      }
    } catch (error) {
      return {
        success: false,
        error: new UnexpectedError(
          'An unexpected error has occurred while creating a new record'
        ),
      };
    }
  }
}
