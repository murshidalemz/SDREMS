import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="sdrems-footer">
      <div className="sdrems-footer-inner">
        <Link to="/" className="sdrems-footer-brand">
          ✚ SDREMS
        </Link>

        <p>
          Smart Disaster Response & Emergency Management System
        </p>

        <p>
          Supporting safer communities through technology and coordination.
        </p>

        <span>
          © {new Date().getFullYear()} SDREMS. Academic Project.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
