import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const skillOptions = [
  "First Aid",
  "Basic Life Support",
  "Medical Assistance",
  "Search and Rescue",
  "Swimming",
  "Fire Safety",
  "Driving",
  "Communication",
  "Logistics",
  "Community Support",
];

const steps = [
  "Personal Details",
  "Skills & Documents",
  "Review & Submit",
];

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  state: "",
  district: "",
  city: "",
  pinCode: "",
  operatingLocation: "",
  serviceArea: "",
  availability: "",
  emergencyContact: "",
  skills: [],
  experience: "",
  training: "",
  organization: "",
  designation: "",
  credentials: "",
  consent: false,
};

function RescueApplication({ category = "volunteer" }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isProfessional = category === "professional";

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    ...emptyForm,
    fullName: user?.name || "",
    email: user?.email || "",
  });

  const [documents, setDocuments] = useState({
    identityProof: null,
    trainingCertificate: null,
    professionalId: null,
  });

  const updateField = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSkill = (skill) => {
    setForm((previous) => ({
      ...previous,
      skills: previous.skills.includes(skill)
        ? previous.skills.filter((item) => item !== skill)
        : [...previous.skills, skill],
    }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG, JPG, JPEG and PDF files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Each document must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }

    setError("");
    setDocuments((previous) => ({
      ...previous,
      [name]: file,
    }));
  };

  const removeFile = (name) => {
    setDocuments((previous) => ({
      ...previous,
      [name]: null,
    }));
  };

  const validateStep = () => {
    setError("");

    if (step === 1) {
      const requiredFields = [
        "fullName",
        "phone",
        "dateOfBirth",
        "address",
        "state",
        "district",
        "city",
        "pinCode",
        "operatingLocation",
        "serviceArea",
        "availability",
        "emergencyContact",
      ];

      const missing = requiredFields.some(
        (field) => !String(form[field]).trim()
      );

      if (missing) {
        setError("Please complete all required personal information fields.");
        return false;
      }

      if (!/^\d{6}$/.test(form.pinCode)) {
        setError("Enter a valid 6-digit PIN code.");
        return false;
      }

      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
        setError("Enter a valid 10-digit mobile number.");
        return false;
      }

      if (!/^\d{10}$/.test(form.emergencyContact.replace(/\D/g, ""))) {
        setError("Enter a valid 10-digit emergency contact number.");
        return false;
      }
    }

    if (step === 2) {
      if (!documents.identityProof) {
        setError("Please upload an identity proof document.");
        return false;
      }

      if (
        isProfessional &&
        (!form.organization.trim() ||
          !form.designation.trim() ||
          !form.credentials.trim())
      ) {
        setError("Complete your professional affiliation details.");
        return false;
      }

      if (
        isProfessional &&
        (!documents.professionalId || !documents.trainingCertificate)
      ) {
        setError(
          "Professional applicants must upload their professional ID and relevant qualification or service certificate."
        );
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((current) => Math.min(current + 1, 3));
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (!form.consent) {
      setError("Please accept the declaration before submitting.");
      return;
    }

    let applications = [];

    try {
      applications = JSON.parse(
        localStorage.getItem("sdrems_rescue_applications") || "[]"
      );
    } catch {
      applications = [];
    }

    const blockedStatuses = [
      "pending",
      "under_review",
      "withdrawal_requested",
      "approved",
      "suspended",
    ];

    const currentEmail = user?.email?.trim().toLowerCase();

    const alreadyApplied = applications.some(
      (application) =>
        application.email?.trim().toLowerCase() === currentEmail &&
        blockedStatuses.includes(application.status?.toLowerCase())
    );

    if (alreadyApplied) {
      setError("You already have an active rescue force application.");
      return;
    }

    const application = {
      ...form,
      category,
      applicationId: `NRF-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString(),
      documents: Object.fromEntries(
        Object.entries(documents).map(([key, file]) => [
          key,
          file
            ? {
                name: file.name,
                type: file.type,
                size: file.size,
              }
            : null,
        ])
      ),
    };

    localStorage.setItem(
      "sdrems_rescue_applications",
      JSON.stringify([...applications, application])
    );

    navigate("/volunteer/status");
  };

  const renderUpload = (name, title, description, required = false) => (
    <div className="document-upload-card" key={name}>
      <div className="document-upload-heading">
        <span className="document-upload-icon">↑</span>
        <div>
          <strong>{title}</strong>
          <small>{description}</small>
        </div>
      </div>

      {documents[name] ? (
        <div className="document-selected">
          <span>📄</span>
          <div className="document-selected-name">
            <strong>{documents[name].name}</strong>
            <small>
              {(documents[name].size / 1024).toFixed(0)} KB
            </small>
          </div>
          <button
            type="button"
            onClick={() => removeFile(name)}
            className="document-remove"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="document-upload-button">
          <input
            type="file"
            name={name}
            accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"
            onChange={handleFile}
          />
          <span>Choose file</span>
          <small>{required ? "Required" : "Optional"}</small>
        </label>
      )}

      <small className="document-format">
        PNG, JPG, JPEG or PDF · Maximum 5 MB
      </small>
    </div>
  );

  return (
    <section className="rescue-application-page">
      <div className="rescue-application-container">
        <div className="rescue-application-heading">
          <span className="application-eyebrow">
            SDREMS NATIONAL RESCUE FORCE
          </span>
          <h1>
            {isProfessional
              ? "Professional Responder Application"
              : "Volunteer Responder Application"}
          </h1>
          <p>
            Join a nationwide network supporting disaster preparedness,
            emergency response and community resilience.
          </p>
          <span className="application-status-note">
            Applications are subject to verification and admin approval.
          </span>
        </div>

        <div className="application-progress">
          {steps.map((label, index) => {
            const number = index + 1;

            return (
              <div
                className={`progress-step ${
                  step === number
                    ? "active"
                    : step > number
                      ? "completed"
                      : ""
                }`}
                key={label}
              >
                <span className="progress-number">
                  {step > number ? "✓" : number}
                </span>
                <span className="progress-label">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="rescue-application-form">
          {step === 1 && (
            <>
              <div className="application-section-heading">
                <span>STEP 01</span>
                <h2>Personal Information</h2>
                <p>Tell us about yourself and where you can respond.</p>
              </div>

              <div className="application-grid">
                <label>
                  Full Name *
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={updateField}
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input value={form.email} readOnly />
                </label>

                <label>
                  Mobile Number *
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="10-digit mobile number"
                  />
                </label>

                <label>
                  Date of Birth *
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={updateField}
                  />
                </label>

                <label className="application-full-width">
                  Residential Address *
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={updateField}
                  />
                </label>

                <label>
                  State *
                  <input
                    name="state"
                    value={form.state}
                    onChange={updateField}
                  />
                </label>

                <label>
                  District *
                  <input
                    name="district"
                    value={form.district}
                    onChange={updateField}
                  />
                </label>

                <label>
                  City / Town *
                  <input
                    name="city"
                    value={form.city}
                    onChange={updateField}
                  />
                </label>

                <label>
                  PIN Code *
                  <input
                    name="pinCode"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pinCode}
                    onChange={updateField}
                  />
                </label>

                <label>
                  Current Operating Location *
                  <input
                    name="operatingLocation"
                    value={form.operatingLocation}
                    onChange={updateField}
                    placeholder="Your current response location"
                  />
                </label>

                <label>
                  Preferred Service Area *
                  <input
                    name="serviceArea"
                    value={form.serviceArea}
                    onChange={updateField}
                    placeholder="District, state or anywhere in India"
                  />
                </label>

                <label>
                  Availability *
                  <select
                    name="availability"
                    value={form.availability}
                    onChange={updateField}
                  >
                    <option value="">Select availability</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Weekends">Weekends</option>
                    <option value="On-call">On-call</option>
                  </select>
                </label>

                <label>
                  Emergency Contact Number *
                  <input
                    name="emergencyContact"
                    type="tel"
                    value={form.emergencyContact}
                    onChange={updateField}
                    placeholder="10-digit mobile number"
                  />
                </label>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="application-section-heading">
                <span>STEP 02</span>
                <h2>Skills, Experience & Documents</h2>
                <p>
                  Select your skills and provide supporting documents for
                  verification.
                </p>
              </div>

              <h3 className="application-subheading">
                Relevant Skills
              </h3>
              <div className="application-skills">
                {skillOptions.map((skill) => (
                  <label
                    key={skill}
                    className={`application-skill ${
                      form.skills.includes(skill) ? "selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.skills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>

              <label className="application-block-label">
                Previous Experience
                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={updateField}
                  placeholder="Describe any relevant experience. You can leave this blank if you are new."
                />
              </label>

              <label className="application-block-label">
                Training and Certifications
                <textarea
                  name="training"
                  value={form.training}
                  onChange={updateField}
                  placeholder="List relevant courses, training or certifications."
                />
              </label>

              {isProfessional && (
                <>
                  <h3 className="application-subheading">
                    Professional Affiliation
                  </h3>

                  <div className="application-grid professional-fields">
                    <label>
                      Organization / Department *
                      <input
                        name="organization"
                        value={form.organization}
                        onChange={updateField}
                      />
                    </label>

                    <label>
                      Designation *
                      <input
                        name="designation"
                        value={form.designation}
                        onChange={updateField}
                      />
                    </label>

                    <label className="application-full-width">
                      Professional Credentials *
                      <textarea
                        name="credentials"
                        value={form.credentials}
                        onChange={updateField}
                        placeholder="Registration, qualification or service identification details."
                      />
                    </label>
                  </div>
                </>
              )}

              <h3 className="application-subheading">
                Document Uploads
              </h3>
              <p className="application-help">
                Upload clear and readable documents. Sensitive documents
                should only be provided for verification.
              </p>

              <div className="document-upload-grid">
                {renderUpload(
                  "identityProof",
                  "Identity Proof",
                  "Government-issued identity document",
                  true
                )}

                {renderUpload(
                  "trainingCertificate",
                  "Training / Qualification Certificate",
                  "Relevant training or qualification evidence",
                  isProfessional
                )}

                {isProfessional &&
                  renderUpload(
                    "professionalId",
                    "Professional / Service ID",
                    "Organization-issued identity or service proof",
                    true
                  )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="application-section-heading">
                <span>STEP 03</span>
                <h2>Review Your Application</h2>
                <p>
                  Check your information carefully before submitting.
                </p>
              </div>

              <div className="review-section">
                <h3>Personal Details</h3>
                <div className="review-grid">
                  {[
                    ["Full Name", form.fullName],
                    ["Email", form.email],
                    ["Mobile", form.phone],
                    ["Date of Birth", form.dateOfBirth],
                    ["Address", form.address],
                    ["State", form.state],
                    ["District", form.district],
                    ["City", form.city],
                    ["PIN Code", form.pinCode],
                    ["Operating Location", form.operatingLocation],
                    ["Service Area", form.serviceArea],
                    ["Availability", form.availability],
                    ["Emergency Contact", form.emergencyContact],
                  ].map(([label, value]) => (
                    <div className="review-item" key={label}>
                      <small>{label}</small>
                      <strong>{value || "Not provided"}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="review-section">
                <h3>Skills & Experience</h3>
                <div className="review-skills">
                  {form.skills.length
                    ? form.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))
                    : "No skills selected"}
                </div>
                <p><strong>Experience:</strong> {form.experience || "Not provided"}</p>
                <p><strong>Training:</strong> {form.training || "Not provided"}</p>
              </div>

              {isProfessional && (
                <div className="review-section">
                  <h3>Professional Affiliation</h3>
                  <p><strong>Organization:</strong> {form.organization}</p>
                  <p><strong>Designation:</strong> {form.designation}</p>
                  <p><strong>Credentials:</strong> {form.credentials}</p>
                </div>
              )}

              <div className="review-section">
                <h3>Uploaded Documents</h3>
                {Object.entries(documents).map(([key, file]) =>
                  file ? (
                    <p key={key}>
                      <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
                      {file.name}
                    </p>
                  ) : null
                )}
              </div>

              <label className="application-consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={updateField}
                />
                <span>
                  I confirm that the information provided is accurate and
                  consent to verification by authorized SDREMS administrators.
                  I understand that submission does not guarantee approval or
                  authorize me to perform rescue operations.
                </span>
              </label>
            </>
          )}

          {error && (
            <p className="auth-error application-error" role="alert">
              {error}
            </p>
          )}

          <div className="application-navigation">
            {step > 1 ? (
              <button
                type="button"
                className="application-back-button"
                onClick={previousStep}
              >
                ← Back
              </button>
            ) : (
              <Link to="/rescue-force" className="application-back-button">
                Cancel
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                className="auth-submit application-next-button"
                onClick={nextStep}
              >
                Continue to {steps[step]} →
              </button>
            ) : (
              <button
                type="button"
                className="auth-submit application-next-button"
                onClick={handleSubmit}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RescueApplication;
