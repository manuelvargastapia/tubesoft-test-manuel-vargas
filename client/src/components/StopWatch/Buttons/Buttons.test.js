import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons', () => {
  it('renders initial setup', () => {
    render(<Buttons />);

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Finish')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();
    expect(screen.queryByText('Resume')).toBeNull();
  });

  it('changes Start button title to Pause when starting', () => {
    render(<Buttons />);

    const startButton = screen.queryByText('Start');

    expect(startButton).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();

    fireEvent.click(startButton);

    expect(screen.queryByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Start')).toBeNull();
  });

  it('changes Pause button title to Resume when paused', () => {
    render(<Buttons />);

    fireEvent.click(screen.queryByText('Start'));

    const pauseButton = screen.queryByText('Pause');

    expect(pauseButton).toBeInTheDocument();
    expect(screen.queryByText('Resume')).toBeNull();

    fireEvent.click(pauseButton);

    expect(screen.queryByText('Resume')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();
  });

  it('changes Resume button title to Paused when resumed', () => {
    render(<Buttons />);

    fireEvent.click(screen.queryByText('Start'));
    fireEvent.click(screen.queryByText('Pause'));

    const resumeButton = screen.queryByText('Resume');

    expect(resumeButton).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();

    fireEvent.click(resumeButton);

    expect(screen.queryByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Resume')).toBeNull();
  });

  it('changes Pause button title to Start when finished', () => {
    render(<Buttons />);

    fireEvent.click(screen.queryByText('Start'));

    const pauseButton = screen.queryByText('Pause');

    expect(pauseButton).toBeInTheDocument();
    expect(screen.queryByText('Start')).toBeNull();

    fireEvent.click(screen.queryByText('Finish'));

    expect(screen.queryByText('Start')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();
  });
});
