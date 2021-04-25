import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div data-testid="error-message" className="ErrorMessage">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
