import { render, screen } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons', () => {
  const mockedHandleStart = jest.fn();
  const mockedHandlePause = jest.fn();
  const mockedHandleResume = jest.fn();
  const mockedHandleFinish = jest.fn();

  it('renders corresponding button when running', () => {
    const mockedStatus = { isRunning: true, isPaused: false, isStopped: false };

    render(
      <Buttons
        status={mockedStatus}
        onStart={mockedHandleStart}
        onPause={mockedHandlePause}
        onResume={mockedHandleResume}
        onFinish={mockedHandleFinish}
      />
    );

    expect(screen.queryByText('Start')).toBeNull();
    expect(screen.queryByText('Finish')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Resume')).toBeNull();
  });

  it('renders corresponding buttons when paused', () => {
    const mockedStatus = { isRunning: false, isPaused: true, isStopped: false };

    render(
      <Buttons
        status={mockedStatus}
        onStart={mockedHandleStart}
        onPause={mockedHandlePause}
        onResume={mockedHandleResume}
        onFinish={mockedHandleFinish}
      />
    );

    expect(screen.queryByText('Start')).toBeNull();
    expect(screen.queryByText('Finish')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();
    expect(screen.queryByText('Resume')).toBeInTheDocument();
  });

  it('renders corresponding buttons when finished', () => {
    const mockedStatus = { isRunning: false, isPaused: false, isStopped: true };

    render(
      <Buttons
        status={mockedStatus}
        onStart={mockedHandleStart}
        onPause={mockedHandlePause}
        onResume={mockedHandleResume}
        onFinish={mockedHandleFinish}
      />
    );

    expect(screen.queryByText('Start')).toBeInTheDocument();
    expect(screen.queryByText('Finish')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).toBeNull();
    expect(screen.queryByText('Resume')).toBeNull();
  });
});
