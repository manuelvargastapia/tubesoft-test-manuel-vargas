import axios from 'axios';
import { UnexpectedError, ServerError } from './errors';

async function saveRecordAsMilliseconds(record) {
  try {
    const response = await axios.post(
      '/register_time',
      { milliseconds: record },
      { baseURL: 'http://localhost:3000' }
    );

    return {
      success: true,
      newRecord: response.data.milliseconds,
    };
  } catch ({ response }) {
    if (response) {
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
        default:
          return {
            success: false,
            error: new UnexpectedError(
              'An unexpected error has occurred while creating a new record'
            ),
          };
      }
    }

    return {
      success: false,
      error: new UnexpectedError(
        'An unexpected error has occurred while creating a new record'
      ),
    };
  }
}

// We need to export the services as an object to be able to
// mocked them during tests
export const services = { saveRecordAsMilliseconds };
