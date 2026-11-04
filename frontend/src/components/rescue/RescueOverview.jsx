
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Activity,
  MapPin,
  ArrowUpRight,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    label: "Assigned Missions",
    value: "08",
    note: "3 awaiting acceptance",
    icon: ClipboardList,
    color: "blue",
  },
  {
    label: "Completed Missions",
    value: "24",
    note: "Successful operations",
    icon: CheckCircle2,
    color: "green",
  },
  {
    label: "Pending Missions",
    value: "03",
    note: "Requires your attention",
    icon: Clock3,
    color: "orange",
  },
  {
    label: "Active Operations",
    value: "02",
    note: "Currently in progress",
    icon: Activity,
    color: "purple",
  },
];

const missions = [
  {
    id: "INC-1028",
    title: "Urban Flooding",
    location: "Sector 12, Ghaziabad",
    priority: "High",
    status: "Assigned",
    time: "10:42 AM",
  },
  {
    id: "INC-1027",
    title: "Building Fire",
    location: "Industrial Area, Noida",
    priority: "Critical",
    status: "In Progress",
    time: "10:18 AM",
  },
  {
    id: "INC-1026",
    title: "Road Accident",
    location: "NH-24, Ghaziabad",
    priority: "Medium",
    status: "Accepted",
    time: "09:56 AM",
  },
];

export default function RescueOverview({ onNavigate }) {
  return (
    <div className="rescue-overview">
      <div className="rescue-welcome">
        <div>
          <span className="rescue-eyebrow">RESCUE FORCE DASHBOARD</span>
          <h1>Welcome back, Rescue Member</h1>
          <p>
            Monitor your assignments, coordinate rescue operations and
            stay informed about emergencies.
          </p>
        </div>

        <div className="rescue-availability">
          <span className="rescue-status-dot" />
          <span>Available for Duty</span>
        </div>
      </div>

      <div className="rescue-overview-heading">
        <div>
          <h2>Operational Overview</h2>
          <p>Here's your rescue activity at a glance.</p>
        </div>
        <div className="rescue-date">
          <CalendarDays size={17} />
          04 November 2026
        </div>
      </div>

      <div className="rescue-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="rescue-stat-card" key={stat.label}>
              <div className={`rescue-stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>
              <p>{stat.label}</p>
              <h2>{stat.value}</h2>
              <span>{stat.note}</span>
            </div>
          );
        })}
      </div>

      <div className="rescue-overview-grid">
        <section className="rescue-panel rescue-missions-panel">
          <div className="rescue-panel-heading">
            <div>
              <h2>Recent Missions</h2>
              <p>Your latest rescue assignments</p>
            </div>
            <button onClick={() => onNavigate("missions")}>
              View All <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="rescue-mission-list">
            {missions.map((mission) => (
              <div className="rescue-mission-row" key={mission.id}>
                <div className="rescue-mission-main">
                  <div className="rescue-mission-icon">
                    <AlertTriangle size={19} />
                  </div>
                  <div>
                    <h3>{mission.title}</h3>
                    <span>{mission.id}</span>
                    <p>
                      <MapPin size={13} /> {mission.location}
                    </p>
                  </div>
                </div>

                <div className="rescue-mission-meta">
                  <span className={`rescue-priority ${mission.priority.toLowerCase()}`}>
                    {mission.priority}
                  </span>
                  <span className="rescue-mission-status">
                    {mission.status}
                  </span>
                  <small>{mission.time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rescue-panel rescue-duty-panel">
          <div className="rescue-panel-heading">
            <div>
              <h2>Duty Status</h2>
              <p>Your current availability</p>
            </div>
            <Activity size={20} />
          </div>

          <div className="rescue-duty-indicator">
            <div className="rescue-duty-circle">
              <CheckCircle2 size={34} />
            </div>
            <h3>Available</h3>
            <p>You are currently available for rescue assignments.</p>
          </div>

          <div className="rescue-duty-info">
            <div>
              <span>Assigned Region</span>
              <strong>Ghaziabad, UP</strong>
            </div>
            <div>
              <span>Member Status</span>
              <strong>Active Volunteer</strong>
            </div>
          </div>

          <button
            className="rescue-profile-button"
            onClick={() => onNavigate("profile")}
          >
            View My Profile
          </button>
        </section>
      </div>

      <div className="rescue-emergency-banner">
        <div className="rescue-emergency-icon">
          <AlertTriangle size={23} />
        </div>
        <div>
          <h3>Emergency Response Readiness</h3>
          <p>
            Stay alert and keep your contact details and availability
            information up to date.
          </p>
        </div>
        <button onClick={() => onNavigate("notifications")}>
          View Alerts
        </button>
      </div>
    </div>
  );
}

