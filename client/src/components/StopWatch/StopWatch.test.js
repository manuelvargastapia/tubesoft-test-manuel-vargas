import { render, screen, configure } from '@testing-library/react';
import StopWatch from './StopWatch';

describe('Stopwatch', () => {
  beforeEach(() => {
    configure({
      throwSuggestions: true,
    });
  });

  it('renders initial setup', () => {
    render(<StopWatch />);

    expect(screen.getByTestId('timer')).toHaveTextContent('00:00:00');
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });
});
