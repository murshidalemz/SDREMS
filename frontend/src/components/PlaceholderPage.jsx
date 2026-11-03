function PlaceholderPage({ title, description }) {
  return (
    <main className="sdrems-placeholder">
      <div className="sdrems-placeholder-card">
        <span className="placeholder-icon">✚</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <span className="placeholder-status">
          Feature under development
        </span>
      </div>
    </main>
  );
}

export default PlaceholderPage;
