import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from './Buttons';

describe('Buttons', () => {
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

      expect(screen.queryByText('Start')).toBeNull();
      expect(screen.queryByText('Finish')).toBeInTheDocument();
      expect(screen.queryByText('Pause')).toBeInTheDocument();
      expect(screen.queryByText('Resume')).toBeNull();
    });

    it('renders corresponding buttons when paused', () => {
      renderWrapper(pausedStatus);

      expect(screen.queryByText('Start')).toBeNull();
      expect(screen.queryByText('Finish')).toBeInTheDocument();
      expect(screen.queryByText('Pause')).toBeNull();
      expect(screen.queryByText('Resume')).toBeInTheDocument();
    });

    it('renders corresponding buttons when finished', () => {
      renderWrapper(stoppedStatus);

      expect(screen.queryByText('Start')).toBeInTheDocument();
      expect(screen.queryByText('Finish')).toBeInTheDocument();
      expect(screen.queryByText('Pause')).toBeNull();
      expect(screen.queryByText('Resume')).toBeNull();
    });
  });

  describe('Handlers calls', () => {
    it('calls Start handler', () => {
      renderWrapper(stoppedStatus);

      fireEvent.click(screen.getByText('Start'));

      expect(mockedHandleStart).toHaveBeenCalledTimes(1);
    });

    it('calls Pause handler', () => {
      renderWrapper(runningStatus);

      fireEvent.click(screen.getByText('Pause'));

      expect(mockedHandlePause).toHaveBeenCalledTimes(1);
    });

    it('calls Resume handler', () => {
      renderWrapper(pausedStatus);

      fireEvent.click(screen.getByText('Resume'));

      expect(mockedHandleResume).toHaveBeenCalledTimes(1);
    });

    it('calls Finish handler when running', () => {
      renderWrapper(runningStatus);

      fireEvent.click(screen.getByText('Finish'));

      expect(mockedHandleFinish).toHaveBeenCalledTimes(1);
    });

    it('calls Finish handler when paused', () => {
      renderWrapper(pausedStatus);

      fireEvent.click(screen.getByText('Finish'));

      expect(mockedHandleFinish).toHaveBeenCalledTimes(1);
    });

    it('does not call Finish handler when stopped', () => {
      renderWrapper(stoppedStatus);

      fireEvent.click(screen.getByText('Finish'));

      expect(mockedHandleFinish).not.toHaveBeenCalled();
    });
  });
});
