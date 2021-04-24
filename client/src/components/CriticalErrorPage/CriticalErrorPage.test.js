import { render, screen, configure } from '@testing-library/react';
import CriticalErrorPage from './CriticalErrorPage';

describe('CriticalErrorPage', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  it('renders correctly', () => {
    const testDetails = 'Unexpected error details';

    render(<CriticalErrorPage details={testDetails} />);

    expect(
      screen.getByText('An unexpected error has ocurred!')
    ).toBeInTheDocument();
    expect(screen.getByText('Details for nerds:')).toBeInTheDocument();
    expect(screen.getByText(testDetails)).toBeInTheDocument();
    expect(screen.getByText('Please, reload this page.')).toBeInTheDocument();
  });
});
