import { render, screen } from '@testing-library/react';
import StopWatch from './StopWatch';

describe('StopWatch', () => {
  it('renders initial setup', () => {
    render(<StopWatch />);

    expect(screen.getByText('00:00:000')).toBeInTheDocument();
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });
});
