import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleHome = {
      citizen: "/citizen/dashboard",
      volunteer: "/rescue/dashboard",
      professional: "/rescue/dashboard",
      admin: "/admin/dashboard",
    };

    return <Navigate to={roleHome[user.role] || "/"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
