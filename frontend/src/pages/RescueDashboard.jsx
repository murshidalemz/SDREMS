import { useState } from "react";
import { Menu, Bell, Search, ShieldCheck } from "lucide-react";

import RescueSidebar from "../components/rescue/RescueSidebar";
import RescueOverview from "../components/rescue/RescueOverview";

const moduleTitles = {
  overview: "Overview",
  missions: "Assigned Missions",
  map: "Disaster Map",
  details: "Mission Details",
  update: "Update Mission",
  resources: "Resource Management",
  reports: "Incident Reports",
  notifications: "Notifications",
  profile: "My Profile",
};

function ModulePlaceholder({ title }) {
  return (
    <section className="rescue-coming-soon">
      <div className="rescue-coming-icon">
        <ShieldCheck size={32} />
      </div>
      <span className="rescue-eyebrow">RESCUE OPERATIONS</span>
      <h2>{title}</h2>
      <p>
        This module is part of the SDREMS Rescue Force Dashboard.
        We will implement its complete functionality next.
      </p>
    </section>
  );
}

export default function RescueDashboard() {
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigateToModule = (module) => {
    setActiveModule(module);
    setSidebarOpen(false);
  };

  return (
    <div className="rescue-dashboard-layout">
      {sidebarOpen && (
        <button
          className="rescue-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`rescue-sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <RescueSidebar
          activeModule={activeModule}
          onNavigate={navigateToModule}
        />
      </div>

      <main className="rescue-dashboard-main">
        <header className="rescue-topbar">
          <div className="rescue-topbar-left">
            <button
              className="rescue-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              <Menu size={22} />
            </button>

            <div>
              <span className="rescue-topbar-label">SDREMS / RESCUE FORCE</span>
              <h2>{moduleTitles[activeModule]}</h2>
            </div>
          </div>

          <div className="rescue-topbar-right">
            <div className="rescue-search">
              <Search size={17} />
              <input type="search" placeholder="Search dashboard..." />
            </div>

            <button
              className="rescue-topbar-notification"
              onClick={() => navigateToModule("notifications")}
              aria-label="View notifications"
            >
              <Bell size={20} />
              <span />
            </button>

            <div className="rescue-user-info">
              <div className="rescue-user-avatar">RF</div>
              <div>
                <strong>Rescue Member</strong>
                <span>Rescue Force</span>
              </div>
            </div>
          </div>
        </header>

        <div className="rescue-dashboard-content">
          {activeModule === "overview" ? (
            <RescueOverview onNavigate={navigateToModule} />
          ) : (
            <ModulePlaceholder title={moduleTitles[activeModule]} />
          )}
        </div>
      </main>
    </div>
  );
}
