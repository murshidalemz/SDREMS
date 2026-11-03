import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import RescueForce from "./pages/RescueForce";
import { AuthProvider } from "./context/AuthContext";
import RescueApplication from "./pages/RescueApplication";
import ApplicationStatus from "./pages/ApplicationStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import AdaptiveLayout from "./components/AdaptiveLayout";
import PlaceholderPage from "./components/PlaceholderPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const Page = ({ title, description }) => (
  <PlaceholderPage title={title} description={description} />
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public homepage */}
          <Route path="/" element={<Home />} />

          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route path="/rescue-force" element={<RescueForce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Route>

          {/* Public pages that adapt to the user's authentication state */}
          <Route element={<AdaptiveLayout />}>
            <Route path="/hospitals" element={<Page title="Emergency Hospitals" description="Find emergency medical facilities." />} />
            <Route path="/shelters" element={<Page title="Emergency Shelters" description="Find emergency shelters and safe locations." />} />
            <Route path="/map" element={<Page title="Disaster Map" description="Explore disaster incidents across India." />} />
          </Route>

          {/* Authenticated citizen routes */}
          <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
            <Route element={<PublicLayout />}>
              <Route path="/volunteer/status" element={<ApplicationStatus />} />
            </Route>
            <Route element={<DashboardLayout />}>
              
               <Route path="/volunteer/apply" element={<RescueApplication category="volunteer" />} />
               <Route path="/professional/apply" element={<RescueApplication category="professional" />} />
              <Route path="/citizen/rescue-force" element={<RescueForce />} />
              <Route path="/citizen/application-status" element={<ApplicationStatus />} />
              <Route path="/citizen/dashboard" element={<Page title="Citizen Dashboard" description="Your emergency information and activity." />} />
              <Route path="/report-disaster" element={<Page title="Report a Disaster" description="Submit a disaster incident report." />} />
              <Route path="/sos" element={<Page title="Emergency SOS" description="Request emergency assistance." />} />
              <Route path="/my-reports" element={<Page title="My Reports" description="Track your submitted incident reports." />} />
              <Route path="/profile" element={<Page title="My Profile" description="Manage your account information." />} />
            </Route>
          </Route>

          {/* Approved responders only */}
          <Route element={<ProtectedRoute allowedRoles={["volunteer", "professional"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/rescue/dashboard" element={<Page title="Rescue Dashboard" description="Your rescue response workspace." />} />
              <Route path="/rescue/incidents" element={<Page title="Available Incidents" description="Review incidents eligible for your response." />} />
              <Route path="/rescue/assignments" element={<Page title="My Assignments" description="Manage your rescue assignments." />} />
              <Route path="/rescue/availability" element={<Page title="My Availability" description="Manage your response availability." />} />
              <Route path="/rescue/credentials" element={<Page title="My Credentials" description="Review your professional credentials." />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin/dashboard" element={<Page title="Admin Dashboard" description="Manage SDREMS operations." />} />
              <Route path="/admin/incidents" element={<Page title="Incident Management" description="Review and coordinate disaster incidents." />} />
              <Route path="/admin/volunteers" element={<Page title="Volunteer Verification" description="Review and verify responder applications." />} />
              <Route path="/admin/teams" element={<Page title="Rescue Teams" description="Manage rescue force membership." />} />
              <Route path="/admin/users" element={<Page title="User Management" description="Manage registered SDREMS users." />} />
              <Route path="/analytics" element={<Page title="Disaster Analytics" description="Explore disaster trends and risk intelligence." />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<Page title="Access Denied" description="You do not have permission to access this page." />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
