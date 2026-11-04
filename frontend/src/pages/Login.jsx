
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEMO_ADMIN = {
  name: "Murshid",
  email: "murshiddrx@gmail.com",
  password: "Mumushid@786",
};

const DEMO_RESCUE_ACCOUNTS = [
  {
    name: "Rescue Volunteer",
    email: "volunteer@sdrems.com",
    password: "Volunteer@123",
    role: "volunteer",
  },
  {
    name: "Rescue Professional",
    email: "professional@sdrems.com",
    password: "Professional@123",
    role: "professional",
  },
];

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = form.email.trim().toLowerCase();

    // Admin login
    if (
      normalizedEmail === DEMO_ADMIN.email &&
      form.password === DEMO_ADMIN.password
    ) {
      login({
        name: DEMO_ADMIN.name,
        email: DEMO_ADMIN.email,
        role: "admin",
      });

      navigate("/admin/dashboard", { replace: true });
      return;
    }

    // Rescue Force demo login
    const rescueAccount = DEMO_RESCUE_ACCOUNTS.find(
      (account) =>
        account.email === normalizedEmail &&
        account.password === form.password
    );

    if (rescueAccount) {
      login({
        name: rescueAccount.name,
        email: rescueAccount.email,
        role: rescueAccount.role,
        applicationStatus: "approved",
        membershipStatus: "active",
        identityVerified: true,
      });

      navigate("/rescue/dashboard", { replace: true });
      return;
    }

    // Registered Citizen login
    const savedUser = JSON.parse(
      localStorage.getItem("sdrems_registered_user") || "null"
    );

    if (
      !savedUser ||
      savedUser.email?.toLowerCase() !== normalizedEmail ||
      savedUser.password !== form.password
    ) {
      setError("Invalid email or password. Please register first.");
      return;
    }

    login({
      name: savedUser.name,
      email: savedUser.email,
      role: "citizen",
    });

    navigate(
      location.state?.from?.pathname || "/citizen/dashboard",
      { replace: true }
    );
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-icon">✚</span>
          <h1>Welcome Back</h1>
          <p>Sign in to access your SDREMS account.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

