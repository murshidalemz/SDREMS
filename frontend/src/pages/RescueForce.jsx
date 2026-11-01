import { Link } from "react-router-dom";

function RescueForce() {
  return (
    <section className="rescue-choice-page">
      <div className="rescue-choice-container">
        <span className="application-eyebrow">SDREMS NATIONAL RESCUE FORCE</span>
        <h1>Be Part of the Response</h1>
        <p className="rescue-choice-intro">
          Join a nationwide network dedicated to disaster preparedness,
          emergency response and community resilience.
        </p>

        <div className="rescue-choice-grid">
          <article className="rescue-choice-card">
            <div className="rescue-choice-icon">🤝</div>
            <span className="rescue-choice-tag">COMMUNITY PARTICIPATION</span>
            <h2>Volunteer Responder</h2>
            <p>
              For citizens who want to support disaster relief, community
              assistance, logistics and other appropriate response activities.
              Previous experience is welcome but not compulsory.
            </p>
            <ul>
              <li>Open to eligible citizens across India</li>
              <li>Skills and availability registration</li>
              <li>Training and verification where applicable</li>
            </ul>
            <Link to="/volunteer/apply" className="rescue-choice-button">
              Apply as Volunteer <span>→</span>
            </Link>
          </article>

          <article className="rescue-choice-card professional-choice">
            <div className="rescue-choice-icon">🛡️</div>
            <span className="rescue-choice-tag">PROFESSIONAL AFFILIATION</span>
            <h2>Professional Responder</h2>
            <p>
              For trained personnel affiliated with recognized emergency
              services, medical services or other relevant organizations.
            </p>
            <ul>
              <li>Organization and designation details</li>
              <li>Professional identity and certificates</li>
              <li>Credential verification by administrators</li>
            </ul>
            <Link to="/professional/apply" className="rescue-choice-button">
              Apply as Professional <span>→</span>
            </Link>
          </article>
        </div>

        <div className="rescue-choice-note">
          <strong>Verification matters</strong>
          <p>
            Every application is reviewed before membership approval.
            Submitting an application does not automatically grant rescue
            force membership or operational privileges.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RescueForce;
