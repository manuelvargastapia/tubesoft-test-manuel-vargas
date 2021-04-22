import { configure, render, screen } from '@testing-library/react';
import Timer from './Timer';

describe('Timer', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  it('renders proper stopwatch format', () => {
    const testCases = [
      { time: 0, expected: '00:00:00' },
      { time: 1, expected: '00:00:00' },
      { time: 9, expected: '00:00:00' },
      { time: 10, expected: '00:00:01' },
      { time: 10000, expected: '00:10:00' },
      { time: 600000, expected: '10:00:00' },
      { time: 3599990, expected: '59:59:99' },
      { time: 3600000, expected: '00:00:00' },
      { time: 315346, expected: '05:15:34' },
      { time: 315345, expected: '05:15:34' },
      { time: 315344, expected: '05:15:34' },
    ];

    testCases.forEach(({ time, expected }) => {
      const { unmount } = render(<Timer time={time} />);
      expect(screen.queryByTestId('timer')).toHaveTextContent(expected);

      // Unmount the rendered component to prevent stacking multiple Timers
      unmount();
    });
  });
});
