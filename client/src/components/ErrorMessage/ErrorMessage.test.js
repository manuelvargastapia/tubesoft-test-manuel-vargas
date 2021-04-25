import { render, screen, configure } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  it('renders error message', () => {
    const testMessage = 'An error has ocurred while saving your time.';

    render(<ErrorMessage message={testMessage} />);

    expect(screen.getByRole('error-message')).toBeInTheDocument();
  });
});
