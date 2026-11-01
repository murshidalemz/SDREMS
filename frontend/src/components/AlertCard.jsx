function AlertCard({
  title = "Emergency Alert",
  message,
  severity = "warning",
  location,
  date,
}) {
  return (
    <article className={`sdrems-alert-card severity-${severity}`}>
      <div className="alert-card-indicator">
        {severity === "critical" ? "🚨" : "⚠️"}
      </div>

      <div className="alert-card-content">
        <h3>{title}</h3>
        <p>{message || "Please follow official safety instructions."}</p>

        {location && <span>📍 {location}</span>}
        {date && <time>{date}</time>}
      </div>

      <span className="alert-severity">
        {severity.toUpperCase()}
      </span>
    </article>
  );
}

export default AlertCard;
