import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RescueForce() {
  const { user } = useAuth();

  const email = user?.email?.trim().toLowerCase();

  let applications = [];

  try {
    applications = JSON.parse(
      localStorage.getItem("sdrems_rescue_applications") || "[]"
    );
  } catch {
    applications = [];
  }

  const existingApplication = applications
    .filter(
      (application) =>
        application.email?.trim().toLowerCase() === email
    )
    .sort(
      (a, b) =>
        new Date(b.submittedAt || 0) -
        new Date(a.submittedAt || 0)
    )[0];

  const status = existingApplication?.status?.toLowerCase();

  const applicationInProgress = [
    "pending",
    "under_review",
    "withdrawal_requested",
  ].includes(status);

  const isApproved = status === "approved";

  const canReapply = ["rejected", "withdrawn"].includes(status);

  if (existingApplication && !canReapply) {
    return (
      <section className="rescue-choice-page">
        <div className="rescue-choice-container">
          <span className="application-eyebrow">
            SDREMS NATIONAL RESCUE FORCE
          </span>

          <h1>
            {isApproved
              ? "Your Membership"
              : "Your Application"}
          </h1>

          <p className="rescue-choice-intro">
            {isApproved
              ? "Your rescue force membership has been approved."
              : "You already have a rescue force application registered with SDREMS."}
          </p>

          <article className="rescue-choice-card">
            <span className="rescue-choice-tag">
              APPLICATION INFORMATION
            </span>

            <h2>
              {existingApplication.category === "professional"
                ? "Professional Responder"
                : "Volunteer Responder"}
            </h2>

            <p>
              <strong>Application ID:</strong>{" "}
              {existingApplication.applicationId}
            </p>

            <p>
              <strong>Applicant:</strong>{" "}
              {existingApplication.fullName}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {status === "under_review"
                ? "Under Review"
                : status === "withdrawal_requested"
                  ? "Withdrawal Requested"
                  : status === "approved"
                    ? "Approved"
                    : "Pending Verification"}
            </p>

            <Link
              to="/volunteer/status"
              className="rescue-choice-button"
            >
              {isApproved
                ? "View Membership"
                : "Track Application"}{" "}
              <span>→</span>
            </Link>
          </article>

          {applicationInProgress && (
            <div className="rescue-choice-note">
              <strong>Application already submitted</strong>
              <p>
                You cannot submit another application while this
                application is being processed.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="rescue-choice-page">
      <div className="rescue-choice-container">
        <span className="application-eyebrow">
          SDREMS NATIONAL RESCUE FORCE
        </span>

        <h1>
          {canReapply
            ? "Apply Again"
            : "Be Part of the Response"}
        </h1>

        <p className="rescue-choice-intro">
          Join a nationwide network dedicated to disaster preparedness,
          emergency response and community resilience.
        </p>

        {canReapply && (
          <div className="rescue-choice-note">
            <strong>Previous application: {status}</strong>
            <p>
              You may submit a new application. Your previous
              application record will remain available for
              administrative tracking.
            </p>
          </div>
        )}

        <div className="rescue-choice-grid">
          <article className="rescue-choice-card">
            <div className="rescue-choice-icon">🤝</div>

            <span className="rescue-choice-tag">
              COMMUNITY PARTICIPATION
            </span>

            <h2>Volunteer Responder</h2>

            <p>
              For citizens who want to support disaster relief,
              community assistance, logistics and other appropriate
              response activities. Previous experience is welcome
              but not compulsory.
            </p>

            <ul>
              <li>Open to eligible citizens across India</li>
              <li>Skills and availability registration</li>
              <li>Training and verification where applicable</li>
            </ul>

            <Link
              to="/volunteer/apply"
              className="rescue-choice-button"
            >
              Apply as Volunteer <span>→</span>
            </Link>
          </article>

          <article className="rescue-choice-card professional-choice">
            <div className="rescue-choice-icon">🛡️</div>

            <span className="rescue-choice-tag">
              PROFESSIONAL AFFILIATION
            </span>

            <h2>Professional Responder</h2>

            <p>
              For trained personnel affiliated with recognized
              emergency services, medical services or other
              relevant organizations.
            </p>

            <ul>
              <li>Organization and designation details</li>
              <li>Professional identity and certificates</li>
              <li>Credential verification by administrators</li>
            </ul>

            <Link
              to="/professional/apply"
              className="rescue-choice-button"
            >
              Apply as Professional <span>→</span>
            </Link>
          </article>
        </div>

        <div className="rescue-choice-note">
          <strong>Verification matters</strong>
          <p>
            Every application is reviewed before membership approval.
            Submitting an application does not automatically grant
            rescue force membership or operational privileges.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RescueForce;
