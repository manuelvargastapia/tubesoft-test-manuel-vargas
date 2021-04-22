import { render, screen, configure } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  it('renders header messages', () => {
    render(<App />);

    expect(screen.getByText("Don't waste time!")).toBeInTheDocument();
    expect(
      screen.getByText(
        'Start, pause and then finish your stopwatch to record your time.'
      )
    ).toBeInTheDocument();
  });

  it('renders Stopwatch', () => {
    render(<App />);
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument();
  });
});
