import { render, screen, fireEvent, configure } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  const stoppedStatus = {
    isStopped: true,
    isRunning: false,
    isPaused: false,
    isFinished: false,
  };
  const runningStatus = {
    isStopped: false,
    isRunning: true,
    isPaused: false,
    isFinished: false,
  };
  const pausedStatus = {
    isStopped: false,
    isRunning: false,
    isPaused: true,
    isFinished: false,
  };
  const finishedStatus = {
    isStopped: false,
    isRunning: false,
    isPaused: false,
    isFinished: true,
  };
  const mockedHandleStart = jest.fn();
  const mockedHandlePause = jest.fn();
  const mockedHandleResume = jest.fn();
  const mockedHandleFinish = jest.fn();

  const renderWrapper = (status) => {
    render(
      <Buttons
        status={status}
        onStart={mockedHandleStart}
        onPause={mockedHandlePause}
        onResume={mockedHandleResume}
        onFinish={mockedHandleFinish}
      />
    );
  };

  describe('Rendering', () => {
    it('renders corresponding buttons when stopped', () => {
      renderWrapper(stoppedStatus);

      expect(
        screen.queryByRole('button', { name: /start/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /finish/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /pause/i })).toBeNull();
      expect(screen.queryByRole('button', { name: /resume/i })).toBeNull();
    });

    it('renders corresponding button when running', () => {
      renderWrapper(runningStatus);

      expect(screen.queryByRole('button', { name: /start/i })).toBeNull();
      expect(
        screen.queryByRole('button', { name: /finish/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /pause/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /resume/i })).toBeNull();
    });

    it('renders corresponding buttons when paused', () => {
      renderWrapper(pausedStatus);

      expect(screen.queryByRole('button', { name: /start/i })).toBeNull();
      expect(
        screen.queryByRole('button', { name: /finish/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /pause/i })).toBeNull();
      expect(
        screen.queryByRole('button', { name: /resume/i })
      ).toBeInTheDocument();
    });

    it('renders corresponding buttons when finished', () => {
      renderWrapper(finishedStatus);

      expect(
        screen.queryByRole('button', { name: /start/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /finish/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /pause/i })).toBeNull();
      expect(screen.queryByRole('button', { name: /resume/i })).toBeNull();
    });
  });

  describe('Handlers calls', () => {
    it('calls Start handler', () => {
      renderWrapper(finishedStatus);

      fireEvent.click(screen.getByRole('button', { name: /start/i }));

      expect(mockedHandleStart).toHaveBeenCalledTimes(1);
    });

    it('calls Pause handler', () => {
      renderWrapper(runningStatus);

      fireEvent.click(screen.getByRole('button', { name: /pause/i }));

      expect(mockedHandlePause).toHaveBeenCalledTimes(1);
    });

    it('calls Resume handler', () => {
      renderWrapper(pausedStatus);

      fireEvent.click(screen.getByRole('button', { name: /resume/i }));

      expect(mockedHandleResume).toHaveBeenCalledTimes(1);
    });

    it('calls Finish handler when running', () => {
      renderWrapper(runningStatus);

      fireEvent.click(screen.getByRole('button', { name: /finish/i }));

      expect(mockedHandleFinish).toHaveBeenCalledTimes(1);
    });

    it('calls Finish handler when paused', () => {
      renderWrapper(pausedStatus);

      fireEvent.click(screen.getByRole('button', { name: /finish/i }));

      expect(mockedHandleFinish).toHaveBeenCalledTimes(1);
    });

    it('does not call Finish handler when stopped', () => {
      renderWrapper(finishedStatus);

      fireEvent.click(screen.getByRole('button', { name: /finish/i }));

      expect(mockedHandleFinish).not.toHaveBeenCalled();
    });
  });
});
