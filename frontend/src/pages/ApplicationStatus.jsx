import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const STORAGE_KEY = "sdrems_rescue_applications";

function ApplicationStatus() {
  const { user } = useAuth();
  const location = useLocation();
  const rescueForcePath = location.pathname.startsWith("/citizen/")
    ? "/citizen/rescue-force"
    : "/rescue-force";
  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState("");

  const application = useMemo(() => {
    try {
      const applications = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      return applications
        .filter(
          (item) =>
            item.email?.trim().toLowerCase() ===
            user?.email?.trim().toLowerCase()
        )
        .sort(
          (a, b) =>
            new Date(b.submittedAt || 0) -
            new Date(a.submittedAt || 0)
        )[0] || null;
    } catch {
      return null;
    }
  }, [user?.email, refresh]);

  const status = application?.status?.toLowerCase();

  const statusLabels = {
    pending: "Pending Verification",
    under_review: "Under Review",
    withdrawal_requested: "Withdrawal Requested",
    approved: "Approved",
    rejected: "Rejected",
    withdrawn: "Withdrawn",
  };

  const updateApplication = (newStatus) => {
    if (!application) return;

    const confirmed = window.confirm(
      newStatus === "withdrawn"
        ? "Are you sure you want to withdraw this application?"
        : "Are you sure you want to request withdrawal? An administrator will need to review your request."
    );

    if (!confirmed) return;

    try {
      const applications = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const updatedApplications = applications.map((item) =>
        item.applicationId === application.applicationId
          ? {
              ...item,
              status: newStatus,
              ...(newStatus === "withdrawn"
                ? { withdrawnAt: new Date().toISOString() }
                : { withdrawalRequestedAt: new Date().toISOString() }),
            }
          : item
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedApplications)
      );

      setMessage(
        newStatus === "withdrawn"
          ? "Your application has been withdrawn."
          : "Your withdrawal request has been submitted."
      );

      setRefresh((value) => value + 1);
    } catch {
      setMessage("Unable to update your application. Please try again.");
    }
  };

  if (!application) {
    return (
      <section className="rescue-choice-page">
        <div className="rescue-choice-container">
          <span className="application-eyebrow">
            SDREMS NATIONAL RESCUE FORCE
          </span>
          <h1>No Application Found</h1>
          <p className="rescue-choice-intro">
            You have not submitted a rescue force application yet.
          </p>
          <Link to={rescueForcePath} className="rescue-choice-button">
            Explore Rescue Force <span>→</span>
          </Link>
        </div>
      </section>
    );
  }

  const isVolunteer = application.category !== "professional";
  const canWithdraw = status === "pending";
  const canRequestWithdrawal = status === "under_review";
  const canReapply = ["rejected", "withdrawn"].includes(status);
  const isApproved = status === "approved";

  const detailRows = [
    ["Full Name", application.fullName],
    ["Email", application.email],
    ["Mobile Number", application.phone],
    ["Date of Birth", application.dateOfBirth],
    ["Residential Address", application.address],
    ["State", application.state],
    ["District", application.district],
    ["City / Town", application.city],
    ["PIN Code", application.pinCode],
    ["Operating Location", application.operatingLocation],
    ["Preferred Service Area", application.serviceArea],
    ["Availability", application.availability],
    ["Emergency Contact", application.emergencyContact],
  ];

  const documentLabels = {
    identityProof: "Identity Proof",
    trainingCertificate: "Training / Qualification Certificate",
    professionalId: "Professional / Service ID",
  };

  return (
    <section className="rescue-choice-page">
      <div className="rescue-choice-container">
        <span className="application-eyebrow">
          SDREMS NATIONAL RESCUE FORCE
        </span>

        <h1>
          {isApproved ? "Rescue Force Membership" : "Application Status"}
        </h1>

        <p className="rescue-choice-intro">
          Track your application and review the information you submitted.
        </p>

        <article className="rescue-choice-card">
          <span className="rescue-choice-tag">
            {isApproved ? "MEMBERSHIP STATUS" : "APPLICATION STATUS"}
          </span>

          <h2>
            {isVolunteer
              ? "Volunteer Responder"
              : "Professional Responder"}
          </h2>

          <p>
            <strong>Application ID:</strong>{" "}
            {application.applicationId}
          </p>

          <p>
            <strong>Submitted:</strong>{" "}
            {application.submittedAt
              ? new Date(application.submittedAt).toLocaleString()
              : "Not available"}
          </p>

          <p>
            <strong>Current Status:</strong>{" "}
            {statusLabels[status] || status || "Unknown"}
          </p>

          {isApproved && (
            <div className="rescue-choice-note">
              <strong>Membership approved</strong>
              <p>
                Your application has been approved. Your rescue
                operational access is subject to your assigned role,
                verified qualifications and SDREMS authorization.
              </p>
            </div>
          )}

          {status === "pending" && (
            <div className="rescue-choice-note">
              <strong>Awaiting verification</strong>
              <p>
                Your application has been received and is waiting
                for administrator verification.
              </p>
            </div>
          )}

          {status === "under_review" && (
            <div className="rescue-choice-note">
              <strong>Verification in progress</strong>
              <p>
                An administrator is reviewing your application
                and submitted credentials.
              </p>
            </div>
          )}

          {status === "withdrawal_requested" && (
            <div className="rescue-choice-note">
              <strong>Withdrawal request submitted</strong>
              <p>
                Your request is awaiting administrator action.
                Your application remains under review until it
                is processed.
              </p>
            </div>
          )}

          {status === "rejected" && (
            <div className="rescue-choice-note">
              <strong>Application not approved</strong>
              <p>
                Your application was not approved. You may review
                your previous submission and apply again.
              </p>
              {application.rejectionReason && (
                <p>
                  <strong>Reason:</strong> {application.rejectionReason}
                </p>
              )}
            </div>
          )}

          {status === "withdrawn" && (
            <div className="rescue-choice-note">
              <strong>Application withdrawn</strong>
              <p>
                This application has been withdrawn. You may
                submit a new application if you wish.
              </p>
            </div>
          )}
        </article>

        <article className="rescue-choice-card">
          <span className="rescue-choice-tag">SUBMITTED INFORMATION</span>
          <h2>Personal Details</h2>

          <div className="review-grid">
            {detailRows.map(([label, value]) => (
              <div className="review-item" key={label}>
                <small>{label}</small>
                <strong>{value || "Not provided"}</strong>
              </div>
            ))}
          </div>

          <h3>Skills</h3>
          <div className="review-skills">
            {application.skills?.length
              ? application.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))
              : "No skills selected"}
          </div>

          <p>
            <strong>Experience:</strong>{" "}
            {application.experience || "Not provided"}
          </p>

          <p>
            <strong>Training:</strong>{" "}
            {application.training || "Not provided"}
          </p>

          {!isVolunteer && (
            <>
              <h3>Professional Affiliation</h3>
              <p>
                <strong>Organization:</strong>{" "}
                {application.organization || "Not provided"}
              </p>
              <p>
                <strong>Designation:</strong>{" "}
                {application.designation || "Not provided"}
              </p>
              <p>
                <strong>Credentials:</strong>{" "}
                {application.credentials || "Not provided"}
              </p>
            </>
          )}

          <h3>Uploaded Document Records</h3>
          {Object.entries(application.documents || {}).map(([key, file]) =>
            file ? (
              <p key={key}>
                <strong>{documentLabels[key] || key}:</strong>{" "}
                {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </p>
            ) : null
          )}

          <p className="application-help">
            These are document records saved at submission. Original
            uploaded files are not stored by the current frontend prototype.
          </p>
        </article>

        {message && (
          <p className="auth-success" role="status">
            {message}
          </p>
        )}

        <div className="application-navigation">
          {canWithdraw && (
            <button
              type="button"
              className="application-back-button"
              onClick={() => updateApplication("withdrawn")}
            >
              Withdraw Application
            </button>
          )}

          {canRequestWithdrawal && (
            <button
              type="button"
              className="application-back-button"
              onClick={() => updateApplication("withdrawal_requested")}
            >
              Request Withdrawal
            </button>
          )}

          {canReapply && (
            <Link
              to={
                application.category === "professional"
                  ? "/professional/apply"
                  : "/volunteer/apply"
              }
              className="rescue-choice-button"
            >
              Apply Again <span>→</span>
            </Link>
          )}

          <Link to={rescueForcePath} className="application-back-button">
            Back to Rescue Force
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ApplicationStatus;
