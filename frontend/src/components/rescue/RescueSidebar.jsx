
import {
  LayoutDashboard,
  ClipboardList,
  Map,
  FileText,
  RefreshCw,
  Package,
  Bell,
  UserRound,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";

const rescueMenu = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "missions", label: "Assigned Missions", icon: ClipboardList },
  { id: "map", label: "Disaster Map", icon: Map },
  { id: "details", label: "Mission Details", icon: FileText },
  { id: "update", label: "Update Mission", icon: RefreshCw },
  { id: "resources", label: "Resource Management", icon: Package },
  { id: "reports", label: "Incident Reports", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "My Profile", icon: UserRound },
];

export default function RescueSidebar({ activeModule, onNavigate }) {
  return (
    <aside className="rescue-sidebar">
      <div className="rescue-sidebar-brand">
        <div className="rescue-brand-icon">
          <ShieldCheck size={25} />
        </div>
        <div>
          <h2>SDREMS</h2>
          <span>RESCUE FORCE</span>
        </div>
      </div>

      <div className="rescue-sidebar-label">RESCUE OPERATIONS</div>

      <nav className="rescue-sidebar-nav">
        {rescueMenu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              className={`rescue-nav-item ${
                activeModule === item.id ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rescue-sidebar-footer">
        <div className="rescue-sidebar-status">
          <span className="rescue-status-dot" />
          Rescue Operations
        </div>
        <span>SDREMS v1.0</span>
      </div>
    </aside>
  );
}


