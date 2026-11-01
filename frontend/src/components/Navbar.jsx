import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sdrems-public-header">
      <div className="sdrems-public-header-inner">
        <Link to="/" className="sdrems-public-brand">
          <span>✚</span>
          SDREMS
        </Link>

        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/register">Citizen Registration</Link>
          <Link to="/rescue-force">Join Rescue Force</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
