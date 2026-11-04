import { Link } from "react-router-dom";

const demoStats = [
  {
    label: "Total Incidents",
    value: "128",
    change: "+12 this week",
    icon: "⚠",
    tone: "blue",
  },
  {
    label: "Pending Verification",
    value: "18",
    change: "Requires review",
    icon: "◷",
    tone: "orange",
  },
  {
    label: "Active Rescue Teams",
    value: "24",
    change: "Across all regions",
    icon: "✚",
    tone: "green",
  },
  {
    label: "Active Emergencies",
    value: "07",
    change: "3 high priority",
    icon: "🚨",
    tone: "red",
  },
];

const demoIncidents = [
  {
    id: "INC-1028",
    title: "Urban Flooding",
    location: "Sector 12, Ghaziabad",
    priority: "High",
    status: "Awaiting Review",
    time: "10:42 AM",
  },
  {
    id: "INC-1027",
    title: "Building Fire",
    location: "Industrial Area, Noida",
    priority: "Critical",
    status: "Verified",
    time: "10:18 AM",
  },
  {
    id: "INC-1026",
    title: "Road Accident",
    location: "NH-24, Ghaziabad",
    priority: "Medium",
    status: "Assigned",
    time: "09:56 AM",
  },
  {
    id: "INC-1025",
    title: "Heavy Rainfall Alert",
    location: "Indirapuram, Ghaziabad",
    priority: "High",
    status: "Monitoring",
    time: "09:30 AM",
  },
];

const demoActivity = [
  {
    title: "New incident report submitted",
    detail: "INC-1028 · Urban Flooding",
    time: "10:42 AM",
    icon: "⚠",
  },
  {
    title: "Volunteer application received",
    detail: "New application awaiting verification",
    time: "10:25 AM",
    icon: "👤",
  },
  {
    title: "Rescue team assignment updated",
    detail: "Team Alpha · Operation status changed",
    time: "10:10 AM",
    icon: "✚",
  },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">EMERGENCY OPERATIONS CENTRE</span>
          <h1>Admin Dashboard</h1>
          <p>
            Monitor incidents, coordinate rescue operations, and manage
            emergency response activities.
          </p>
        </div>

        <div className="admin-demo-indicator">
          <span />
          DEMO ENVIRONMENT
        </div>
      </div>

      <section className="admin-stats-grid">
        {demoStats.map((stat) => (
          <article className="admin-stat-card" key={stat.label}>
            <div className={`admin-stat-icon ${stat.tone}`}>
              {stat.icon}
            </div>
            <div className="admin-stat-content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.change}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-alert-banner">
        <div className="admin-alert-symbol">!</div>
        <div>
          <strong>Emergency Operations Overview</strong>
          <p>
            Review high-priority incidents and pending volunteer applications.
            The records below are demonstration data.
          </p>
        </div>
        <Link to="/admin/incidents" className="admin-alert-link">
          Review Incidents →
        </Link>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel admin-incidents-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Incident Reports</h2>
              <p>Latest submitted emergency reports</p>
            </div>
            <Link to="/admin/incidents">View all →</Link>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-incidents-table">
              <thead>
                <tr>
                  <th>Incident</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Reported</th>
                </tr>
              </thead>
              <tbody>
                {demoIncidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <strong>{incident.title}</strong>
                      <small>{incident.id}</small>
                    </td>
                    <td>{incident.location}</td>
                    <td>
                      <span
                        className={`admin-priority ${incident.priority.toLowerCase()}`}
                      >
                        {incident.priority}
                      </span>
                    </td>
                    <td>
                      <span className="admin-incident-status">
                        {incident.status}
                      </span>
                    </td>
                    <td>{incident.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-panel admin-activity-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest platform activity</p>
            </div>
          </div>

          <div className="admin-activity-list">
            {demoActivity.map((activity, index) => (
              <div className="admin-activity-item" key={index}>
                <div className="admin-activity-icon">{activity.icon}</div>
                <div>
                  <strong>{activity.title}</strong>
                  <p>{activity.detail}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="admin-panel admin-quick-actions">
        <div className="admin-panel-heading">
          <div>
            <h2>Management & Operations</h2>
            <p>Quick access to administrative modules</p>
          </div>
        </div>

        <div className="admin-actions-grid">
          <Link to="/admin/incidents" className="admin-action-card">
            <span>⚠</span>
            <strong>Incident Management</strong>
            <small>Review and verify reports</small>
            <b>Open module →</b>
          </Link>

          <Link to="/admin/volunteers" className="admin-action-card">
            <span>👥</span>
            <strong>Volunteer Verification</strong>
            <small>Review volunteer applications</small>
            <b>Open module →</b>
          </Link>

          <Link to="/admin/teams" className="admin-action-card">
            <span>✚</span>
            <strong>Rescue Team Management</strong>
            <small>Manage approved response teams</small>
            <b>Open module →</b>
          </Link>

          <Link to="/admin/users" className="admin-action-card">
            <span>♙</span>
            <strong>User Management</strong>
            <small>Manage registered platform users</small>
            <b>Open module →</b>
          </Link>

          <Link to="/analytics" className="admin-action-card">
            <span>▥</span>
            <strong>Disaster Analytics</strong>
            <small>View emergency statistics</small>
            <b>Open module →</b>
          </Link>
        </div>
      </section>

      <p className="admin-demo-disclaimer">
        Demonstration environment · All statistics, incidents, locations, and
        activity records shown on this page are sample data. They do not
        represent verified live emergencies.
      </p>
    </div>
  );
}

export default AdminDashboard;
