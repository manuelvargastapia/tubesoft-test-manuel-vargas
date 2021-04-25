import {
  render,
  screen,
  configure,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import { services } from '../../services/stopwatchService';
import { ServerError, UnexpectedError } from '../../services/errors';
import App from './App';

describe('App', () => {
  const spiedSaveRecordAsMilliseconds = jest.spyOn(
    services,
    'saveRecordAsMilliseconds'
  );

  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  it('renders initial setup', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /don't waste time!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /start, pause and then finish your stopwatch to record your time\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
    expect(
      screen.queryByText('Cool! This is your last saved time:')
    ).toBeNull();
    expect(screen.queryByTestId('error-message')).toBeNull();
  });

  it('renders CriticalErrorPage when an unexpected error ocurrs', async () => {
    const testErrorMessage = 'Unexpected error';

    spiedSaveRecordAsMilliseconds.mockResolvedValue({
      success: false,
      error: new UnexpectedError(testErrorMessage),
    });

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));

    // After the click event, we need to wait for the proper update
    // in the component. Otherwise, we get the following error:
    // "Warning: An update to App inside a test was not wrapped in act".
    await waitForElementToBeRemoved(
      screen.getByRole('heading', { name: /don't waste time!/i })
    );

    expect(screen.queryByText("Don't waste time!")).toBeNull();
    expect(
      screen.queryByText(
        'Start, pause and then finish your stopwatch to record your time.'
      )
    ).toBeNull();
    expect(screen.queryByTestId('stopwatch')).toBeNull();
    expect(
      screen.getByRole('heading', { name: /an unexpected error has ocurred!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /details for nerds:/i })
    ).toBeInTheDocument();
    expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /please, reload this page\./i })
    ).toBeInTheDocument();
  });

  it('renders ErrorMessage when a ServerError ocurrs', async () => {
    const testErrorMessage = 'Termporal error';

    spiedSaveRecordAsMilliseconds.mockResolvedValue({
      success: false,
      error: new ServerError(testErrorMessage),
    });

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));

    await waitFor(() =>
      expect(screen.getByText(testErrorMessage)).toBeInTheDocument()
    );

    expect(
      screen.getByRole('heading', { name: /don't waste time!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /start, pause and then finish your stopwatch to record your time\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
    expect(
      screen.queryByText('Cool! This is your last saved time:')
    ).toBeNull();
  });

  it('renders LastRecord with newly saved time when clicking Finish', async () => {
    const testRecord = 50000;

    spiedSaveRecordAsMilliseconds.mockResolvedValue({
      success: true,
      newRecord: testRecord,
    });

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));

    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: /cool! this is your last saved time:/i,
        })
      ).toBeInTheDocument()
    );

    expect(
      screen.getByRole('heading', { name: /don't waste time!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /start, pause and then finish your stopwatch to record your time\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /cool! this is your last saved time:/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('timer')[1]).toHaveTextContent('00:50:00');
    expect(screen.queryByTestId('error-message')).toBeNull();
  });
});
