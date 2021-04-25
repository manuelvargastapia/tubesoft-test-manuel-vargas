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

    expect(screen.getByText("Don't waste time!")).toBeInTheDocument();
    expect(
      screen.getByText(
        'Start, pause and then finish your stopwatch to record your time.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
    expect(
      screen.queryByText('Cool! This is your last saved time:')
    ).toBeNull();
    expect(screen.queryByRole('error-message')).toBeNull();
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
    await waitForElementToBeRemoved(screen.getByText("Don't waste time!"));

    expect(screen.queryByText("Don't waste time!")).toBeNull();
    expect(
      screen.queryByText(
        'Start, pause and then finish your stopwatch to record your time.'
      )
    ).toBeNull();
    expect(screen.queryByTestId('stopwatch')).toBeNull();
    expect(screen.getByRole('critical-error-page')).toBeInTheDocument();
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
      expect(screen.getByRole('error-message')).toBeInTheDocument()
    );

    expect(screen.getByText("Don't waste time!")).toBeInTheDocument();
    expect(
      screen.getByText(
        'Start, pause and then finish your stopwatch to record your time.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
    expect(
      screen.queryByText('Cool! This is your last saved time:')
    ).toBeNull();
    expect(screen.getByRole('error-message')).toHaveTextContent(
      testErrorMessage
    );
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
      expect(screen.queryByTestId('timer')).toBeInTheDocument()
    );

    expect(screen.getByText("Don't waste time!")).toBeInTheDocument();
    expect(
      screen.getByText(
        'Start, pause and then finish your stopwatch to record your time.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
    expect(
      screen.getByText('Cool! This is your last saved time:')
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('timer')[1]).toHaveTextContent('00:50:00');
    expect(screen.queryByRole('error-message')).toBeNull();
  });
});
