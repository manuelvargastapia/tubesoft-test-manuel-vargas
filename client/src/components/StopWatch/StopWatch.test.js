import {
  render,
  screen,
  configure,
  fireEvent,
  act,
} from '@testing-library/react';
import StopWatch from './StopWatch';

describe('Stopwatch', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });

    // Mock and reset setInterval() between tests
    jest.useFakeTimers();
  });

  it('renders initial setup', () => {
    render(<StopWatch onStopwatchFinished={jest.fn()} />);

    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });

  it('starts the timer when clicking Start button', () => {
    render(<StopWatch onStopwatchFinished={jest.fn()} />);

    expect(setInterval).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(setInterval).toHaveBeenCalledTimes(1);

    // Forward setInterval 10 seconds.
    // act() wrapper is required because we're updating the component's state
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
  });

  it('resets the timer when clicking Finish button', () => {
    render(<StopWatch onStopwatchFinished={jest.fn()} />);

    expect(setInterval).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(setInterval).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');
  });

  it('stops the timer at the current value when clicking Pause button', () => {
    render(<StopWatch onStopwatchFinished={jest.fn()} />);

    expect(setInterval).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(setInterval).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
  });

  it('starts the timer when clicking Resume button', () => {
    render(<StopWatch onStopwatchFinished={jest.fn()} />);

    expect(setInterval).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /start/i }));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    fireEvent.click(screen.getByRole('button', { name: /pause/i }));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
    fireEvent.click(screen.getByRole('button', { name: /resume/i }));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:20:00');
  });
});
