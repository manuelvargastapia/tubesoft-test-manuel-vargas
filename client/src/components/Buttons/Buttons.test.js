import { render, screen, fireEvent, configure } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons', () => {
  beforeEach(() => {
    configure({ throwSuggestions: true });
  });

  const runningStatus = { isRunning: true, isPaused: false, isStopped: false };
  const pausedStatus = { isRunning: false, isPaused: true, isStopped: false };
  const stoppedStatus = { isRunning: false, isPaused: false, isStopped: true };
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
  });

  describe('Handlers calls', () => {
    it('calls Start handler', () => {
      renderWrapper(stoppedStatus);

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
      renderWrapper(stoppedStatus);

      fireEvent.click(screen.getByRole('button', { name: /finish/i }));

      expect(mockedHandleFinish).not.toHaveBeenCalled();
    });
  });
});
