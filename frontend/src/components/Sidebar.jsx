import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigation = {
  citizen: [
    { label: "Dashboard", path: "/citizen/dashboard", icon: "⌂" },
    { label: "Report Disaster", path: "/report-disaster", icon: "!" },
    { label: "Emergency SOS", path: "/sos", icon: "🆘" },
    { label: "My Reports", path: "/my-reports", icon: "▤" },
    { label: "Hospitals", path: "/hospitals", icon: "+" },
    { label: "Shelters", path: "/shelters", icon: "⌂" },
    { label: "Rescue Force", path: "/citizen/rescue-force", icon: "🛡️" },
    { label: "My Application Status", path: "/citizen/application-status", icon: "▤" },
    { label: "My Profile", path: "/profile", icon: "●" },
  ],
  volunteer: [
    { label: "Dashboard", path: "/rescue/dashboard", icon: "⌂" },
    { label: "Available Incidents", path: "/rescue/incidents", icon: "!" },
    { label: "My Assignments", path: "/rescue/assignments", icon: "▤" },
    { label: "My Availability", path: "/rescue/availability", icon: "◷" },
    
  ],
  professional: [
    { label: "Dashboard", path: "/rescue/dashboard", icon: "⌂" },
    { label: "Available Incidents", path: "/rescue/incidents", icon: "!" },
    { label: "My Assignments", path: "/rescue/assignments", icon: "▤" },
    { label: "My Availability", path: "/rescue/availability", icon: "◷" },
    { label: "My Credentials", path: "/rescue/credentials", icon: "✓" },
   
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "⌂" },
    { label: "Incident Management", path: "/admin/incidents", icon: "!" },
    { label: "Volunteer Applications", path: "/admin/volunteers", icon: "♧" },
    { label: "Rescue Teams", path: "/admin/teams", icon: "♙" },
    { label: "User Management", path: "/admin/users", icon: "●" },
    { label: "Analytics", path: "/analytics", icon: "▥" },
  ],
};

function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const role = user.role;
  const links = navigation[role] || navigation.citizen;

  return (
    <aside className="sdrems-sidebar">
      <Link to="/" className="sidebar-heading sidebar-home-link">
        <span className="sidebar-brand-icon">✚</span>
        <span>SDREMS</span>
      </Link>

      <Link to="/" className="sidebar-user sidebar-home-link">
        <div className="sidebar-avatar">
          {(user.name || "U").charAt(0).toUpperCase()}
        </div>
        <div className="sidebar-user-details">
          <strong>{user.name || "SDREMS User"}</strong>
          <span>{role.replace("_", " ")}</span>
        </div>
      </Link>

      <nav className="sidebar-navigation" aria-label="Dashboard navigation">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
