import { Link } from "react-router-dom";
import heroImage from "../assets/flood-hero.png";

const services = [
  {
    icon: "🏥",
    title: "Find Hospitals",
    description: "Locate nearby hospitals and emergency medical services.",
    link: "/hospitals",
    color: "blue",
  },
  {
    icon: "🏠",
    title: "Find Shelters",
    description: "Discover available emergency shelters and safe locations.",
    link: "/shelters",
    color: "cyan",
  },
  {
    icon: "📍",
    title: "View Disaster Map",
    description: "Explore disaster locations and reported incidents.",
    link: "/map",
    color: "indigo",
  },
  {
    icon: "🤖",
    title: "AI Risk Prediction",
    description: "Explore disaster intelligence and risk analytics.",
    link: "/analytics",
    color: "purple",
  },
];

const features = [
  {
    icon: "🚨",
    title: "Emergency Alerts",
    description: "Stay informed about important disaster warnings and emergency notifications.",
  },
  {
    icon: "🗺️",
    title: "Disaster Monitoring",
    description: "Access disaster locations and incident information through mapping technology.",
  },
  {
    icon: "🆘",
    title: "SOS Assistance",
    description: "Request emergency assistance when you need immediate help.",
  },
  {
    icon: "🧠",
    title: "AI Risk Intelligence",
    description: "Support disaster preparedness through intelligent risk analysis.",
  },
  {
    icon: "🏥",
    title: "Emergency Resources",
    description: "Find hospitals, shelters and other essential emergency facilities.",
  },
  {
    icon: "👥",
    title: "Rescue Coordination",
    description: "Support communication between citizens and emergency response teams.",
  },
];

function Home() {
  return (
    <div className="sdrems-home">

      {/* Navigation */}
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-icon">✚</span>
            <span>SDREMS</span>
          </Link>

          <nav className="main-nav">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </nav>

          <div className="header-actions">
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="register-button">Register</Link>
          </div>
        </div>
      </header>

      {/* Emergency Alert */}
      <div className="alert-strip">
        <div className="alert-inner">
          <span className="alert-label">
            <span className="alert-dot"></span>
            Emergency Alert
          </span>
          <span className="alert-message">
            Stay alert! Check official emergency updates and local warnings.
          </span>
          <Link to="/sos" className="alert-action">Get Help →</Link>
        </div>
      </div>

      {/* Hero */}
      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-eyebrow">
             <span className="eyebrow-icon">🌐</span> <span>

              <strong>Unified Disaster Response</strong></span> <span>
              <small>One platform. Faster coordination. Safer communities.</small>
             </span>
            </div>                  
            <h1>
              Be Prepared.
              <span>Stay Safe.</span>
            </h1>

            <p className="hero-description">
              Your all-in-one disaster management platform for emergency
              alerts, assistance and real-time information. Stay informed,
              report incidents and connect with emergency resources.
            </p>

            <div className="hero-actions">
              <Link to="/sos" className="sos-button">
                <span className="sos-symbol">✚</span>
                <span>
                  <strong>SOS</strong>
                  <small>Get Help</small>
                </span>
              </Link>

              <Link to="/report-disaster" className="report-button">
                <span>⚑</span>
                Report Disaster
                <span className="button-arrow">→</span>
              </Link>
            </div>

            <div className="hero-trust">
              <span className="trust-check">✓</span>
              One platform for preparedness, response and recovery
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                src={heroImage}
                alt="Flood-affected residential neighbourhood requiring emergency response"
                className="hero-image"
              />
              <div className="image-overlay"></div>

              <div className="image-caption">
                <span className="caption-icon">🛡️</span>
                <div>
                  <strong>Preparedness saves lives</strong>
                  <small>Stay informed. Stay protected.</small>
                </div>
              </div>
            </div>

            
          </div>
        </section>

        {/* Emergency Services */}
        <section className="services-section" id="services">
          <div className="section-heading">
            <span className="section-eyebrow">EMERGENCY ASSISTANCE</span>
            <h2>How Can We Help You?</h2>
            <p>Quick access to essential disaster management services.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <Link
                to={service.link}
                className="service-card"
                key={service.title}
              >
                <div className={`service-icon ${service.color}`}>
                  {service.icon}
                </div>
                <div className="service-card-text">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Community Banner */}
        <section className="community-section" id="about">
          <div className="community-content">
            <span className="community-eyebrow">TOGETHER WE ARE STRONGER</span>
            <h2>Trusted by Communities</h2>
            <p>Together for a Safer Tomorrow</p>
            <div className="community-steps">
              <span>⚑ Report</span>
              <span className="step-divider">•</span>
              <span>✚ Respond</span>
              <span className="step-divider">•</span>
              <span>✦ Recover</span>
            </div>
          </div>
          <div className="community-shield">🛡️</div>
        </section>

        {/* Features */}
        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="section-eyebrow">OUR CAPABILITIES</span>
            <h2>One Platform. Multiple Solutions.</h2>
            <p>
              Technology designed to support communities before, during
              and after disasters.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="about-section">
          <div>
            <span className="section-eyebrow">ABOUT SDREMS</span>
            <h2>Building a More Resilient Future</h2>
          </div>
          <p>
            SDREMS is an AI-powered disaster response and emergency
            management initiative focused on improving disaster preparedness,
            incident reporting and rescue coordination through technology.
          </p>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Be Prepared. Stay Connected.</h2>
          <p>Join SDREMS and take a step towards a safer community.</p>
          <Link to="/register" className="cta-button">
            Get Started →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <Link to="/" className="footer-brand">✚ SDREMS</Link>
        <p>Smart Disaster Response & Emergency Management System</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/login">Login</Link>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} SDREMS. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home
