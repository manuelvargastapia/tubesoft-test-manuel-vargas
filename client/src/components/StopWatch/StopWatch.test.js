import { fireEvent, render, screen, act } from '@testing-library/react';
import StopWatch from './StopWatch';

describe('Stopwatch', () => {
  // Mock and reset setInterval() between tests
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders initial setup', () => {
    render(<StopWatch />);

    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });

  it('starts the timer when clicking Start button', () => {
    render(<StopWatch />);

    expect(setInterval).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Start'));

    expect(setInterval).toHaveBeenCalledTimes(1);

    // Forward setInterval 10 seconds.
    // act() wrapper is required because we're updating the component's state
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
  });

  it('resets the timer when clicking Finish button', () => {
    render(<StopWatch />);

    expect(setInterval).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Start'));

    expect(setInterval).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');

    fireEvent.click(screen.getByText('Finish'));

    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');
  });

  it('stops the timer at the current value when clicking Pause button', () => {
    render(<StopWatch />);

    expect(setInterval).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Start'));

    expect(setInterval).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');

    fireEvent.click(screen.getByText('Pause'));

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');
  });

  it('starts the timer when clicking Resume button', () => {
    render(<StopWatch />);

    expect(setInterval).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    fireEvent.click(screen.getByText('Pause'));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:10:00');

    fireEvent.click(screen.getByText('Resume'));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByTestId('timer')).toHaveTextContent('00:20:00');
  });
});
