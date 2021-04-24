import { render, screen, configure } from '@testing-library/react';
import LastRecord from './LastRecord';

describe('LastRecord', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  it('renders feedback message with last saved record', () => {
    render(<LastRecord time={30000} />);

    expect(
      screen.getByText('Cool! This is your last saved time:')
    ).toBeInTheDocument();
    expect(screen.getByTestId('timer')).toHaveTextContent('00:30:00');
  });
});
