import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

function AdaptiveLayout() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardLayout /> : <PublicLayout />;
}

export default AdaptiveLayout;
