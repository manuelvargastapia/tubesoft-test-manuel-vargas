import './CriticalErrorPage.css';

function CriticalErrorPage({ details }) {
  return (
    <div className="CriticalErrorPage">
      <h2>An unexpected error has ocurred!</h2>
      <h3>Details for nerds:</h3>
      <p>{details}</p>
      <h4>Please, reload this page</h4>
    </div>
  );
}

export default CriticalErrorPage;
