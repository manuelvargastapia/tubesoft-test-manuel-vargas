function CriticalErrorPage({ details }) {
  return (
    <div role="critical-error-page">
      <p>An unexpected error has ocurred!</p>
      <p>Details for nerds:</p>
      <p>{details}</p>
      <p>Please, reload this page.</p>
    </div>
  );
}

export default CriticalErrorPage;
