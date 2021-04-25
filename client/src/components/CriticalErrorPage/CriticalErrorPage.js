function CriticalErrorPage({ details }) {
  return (
    <div>
      <p>An unexpected error has ocurred!</p>
      <p>Details for nerds:</p>
      <p>{details}</p>
      <p>Please, reload this page.</p>
    </div>
  );
}

export default CriticalErrorPage;
