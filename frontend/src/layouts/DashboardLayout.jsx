import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="sdrems-dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <Link to="/" className="dashboard-mobile-brand">
            ✚ SDREMS
          </Link>

          <div className="dashboard-topbar-actions">
            <Link to="/" className="dashboard-welcome">
              {user?.name || "User"} · {(user?.role || "citizen").charAt(0).toUpperCase() + (user?.role || "citizen").slice(1)}
            </Link>

            <button
              type="button"
              className="dashboard-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
