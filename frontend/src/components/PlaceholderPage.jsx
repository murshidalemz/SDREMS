import { Link } from "react-router-dom";

function PlaceholderPage({
  title,
  description,
  backTo = "/",
  backLabel = "Back to Home",
}) {
  return (
    <main className="sdrems-placeholder">
      <div className="sdrems-placeholder-card">
        <span className="placeholder-icon">✚</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <span className="placeholder-status">
          Feature under development
        </span>
        <Link to={backTo}>{backLabel}</Link>
      </div>
    </main>
  );
}

export default PlaceholderPage;
