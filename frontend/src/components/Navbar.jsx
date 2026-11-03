import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const roleHome = {
    citizen: "/citizen/dashboard",
    volunteer: "/rescue/dashboard",
    professional: "/rescue/dashboard",
    admin: "/admin/dashboard",
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sdrems-public-header">
      <div className="sdrems-public-header-inner">
        <Link to="/" className="sdrems-public-brand">
          <span>✚</span>
          SDREMS
        </Link>

        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/shelters">Shelters</Link>
          <Link to="/rescue-force">Join Rescue Force</Link>

          {isAuthenticated ? (
            <>
              <Link to={roleHome[user?.role] || "/"}>
                My Dashboard
              </Link>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Citizen Registration</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
