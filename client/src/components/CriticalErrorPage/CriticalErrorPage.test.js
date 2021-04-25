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
      screen.getByRole('heading', { name: /an unexpected error has ocurred!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /details for nerds:/i })
    ).toBeInTheDocument();
    expect(screen.getByText(testDetails)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /please, reload this page/i })
    ).toBeInTheDocument();
  });
});
