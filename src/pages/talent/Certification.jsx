import { useEffect, useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

const EMPTY_APPLICATION = {
  name: "",
  email: "",
  phone: "",
  resume: null,
  availability: "",
  question: "",
  consent: false,
};

export function Certification() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openings, setOpenings] = useState([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);
  const [openingsError, setOpeningsError] = useState("");
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [application, setApplication] = useState(EMPTY_APPLICATION);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadOpenings() {
      try {
        const response = await fetch("/api/opportunities", { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Opportunities request failed (${response.status}).`);
        }

        const result = await response.json();
        if (!Array.isArray(result.opportunities)) {
          throw new Error("The opportunities API returned an invalid response.");
        }

        setOpenings(result.opportunities.map((opportunity) => {
          const employmentType = opportunity.employmentType || "Not specified";
          const isInternship = employmentType.toLowerCase().includes("intern");

          return {
            ...opportunity,
            category: isInternship ? "Internship" : "Job",
            duration: employmentType,
          };
        }));
      } catch (error) {
        if (error.name !== "AbortError") {
          setOpeningsError("Could not load opportunities. Check that the WINR API and PostgreSQL are running, then try again.");
          console.error("Failed to load opportunities:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingOpenings(false);
        }
      }
    }

    loadOpenings();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedOpening) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedOpening(null);
        setApplication(EMPTY_APPLICATION);
        setSubmitted(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedOpening]);

  const closeApplication = () => {
    setSelectedOpening(null);
    setApplication(EMPTY_APPLICATION);
    setSubmitted(false);
  };

  const openApplication = (opening) => {
    setSelectedOpening(opening);
    setApplication(EMPTY_APPLICATION);
    setSubmitted(false);
  };

  const filteredOpenings = activeFilter === "All"
    ? openings
    : openings.filter((opening) => opening.category === activeFilter);

  const submitApplication = (event) => {
    event.preventDefault();
    if (!application.consent || !application.resume) return;
    setSubmitted(true);
  };

  return (
    <div className="wr-talent-page cert-page">
      <section className="wr-sec wr-full-hero wr-talent-hero">
        <div className="wr-hero split wr-talent-intro">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Find your next opportunity</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">WINR TECHNOLOGIES — CAREER OPPORTUNITIES</p>
            <h1 className="wr-main-title">Internships &amp; Jobs</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              Explore current opportunities published by WINR.
            </p>
          </div>
        </div>
      </section>

      <section className="cert-openings-section" aria-label="Internship and job openings">
        <div className="cert-section-heading">
          <p className="wr-eyebrow">CAREER OPPORTUNITIES</p>
          <h2>Explore Open Roles</h2>
          <p>Review the role details before applying.</p>
        </div>
        <div className="cert-filter" role="group" aria-label="Filter opportunities">
          {["All", "Internship", "Job"].map((filter) => (
            <button
              type="button"
              key={filter}
              className={`cert-filter-btn${activeFilter === filter ? " active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "All" ? "All openings" : filter === "Job" ? "Full-time jobs" : "Internships"}
            </button>
          ))}
        </div>
        {loadingOpenings && <p className="cert-demo-note" role="status">Loading published opportunities…</p>}
        {openingsError && <p className="cert-demo-note" role="alert">{openingsError}</p>}
        {!loadingOpenings && !openingsError && openings.length === 0 && (
          <p className="cert-demo-note">There are no published opportunities right now.</p>
        )}
        {["Internship", "Job"].map((category) => {
          const openings = filteredOpenings.filter((opening) => opening.category === category);
          if (openings.length === 0) return null;
          return (
            <section className="cert-category" key={category} aria-label={category === "Job" ? "Full-time jobs" : "Internships"}>
              <h3>{category === "Job" ? "Full-Time Jobs" : "Internship Opportunities"}</h3>
              <div className="cert-opening-grid" data-reveal-group>
                {openings.map((opening) => (
                  <article className="cert-opening-card" key={opening.id}>
                    <div className="cert-card-meta">
                      <span className="cert-role-type">{opening.category}</span>
                      <span>{opening.duration}</span>
                    </div>
                    <h4>{opening.title}</h4>
                    {opening.team && <p className="cert-location">{opening.team}</p>}
                    {opening.location && <p className="cert-location">{opening.location}</p>}
                    <p className="cert-description">{opening.description}</p>
                    <button className="rp-primary-btn" type="button" onClick={() => openApplication(opening)}>Apply Now</button>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
        <p className="cert-demo-note">Opportunity listings are loaded from WINR’s database. Applications are still a demo: no personal information or uploaded resume is sent to WINR.</p>
      </section>

      {selectedOpening && (
        <div className="cert-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeApplication();
        }}>
          <section className="cert-application-modal" role="dialog" aria-modal="true" aria-labelledby="cert-application-title">
            <div className="cert-modal-heading">
              <div>
                <p className="wr-eyebrow">APPLICATION FORM</p>
                <h2 id="cert-application-title">{submitted ? "Application preview complete" : `Apply: ${selectedOpening.title}`}</h2>
              </div>
              <button type="button" className="cert-modal-close" aria-label="Close application form" onClick={closeApplication}>×</button>
            </div>
            {submitted ? (
              <div className="cert-demo-success" role="status">
                <strong>This was a demo only.</strong>
                <p>Your information was not sent or saved. Connect a secure application API before accepting real applications.</p>
                <button type="button" className="rp-primary-btn" onClick={closeApplication}>Close</button>
              </div>
            ) : (
              <form className="cert-application-form" onSubmit={submitApplication}>
                <div className="rp-fields-grid">
                  <label className="rp-field">
                    <span>Full name</span>
                    <input className="rp-input" autoComplete="name" required value={application.name} onChange={(event) => setApplication((current) => ({ ...current, name: event.target.value }))} />
                  </label>
                  <label className="rp-field">
                    <span>Email</span>
                    <input className="rp-input" type="email" autoComplete="email" required value={application.email} onChange={(event) => setApplication((current) => ({ ...current, email: event.target.value }))} />
                  </label>
                  <label className="rp-field">
                    <span>Phone number</span>
                    <input className="rp-input" type="tel" autoComplete="tel" required value={application.phone} onChange={(event) => setApplication((current) => ({ ...current, phone: event.target.value }))} />
                  </label>
                  <label className="rp-field">
                    <span>Upload resume (PDF, DOC, DOCX)</span>
                    <input className="rp-input rp-file-input" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required onChange={(event) => setApplication((current) => ({ ...current, resume: event.target.files?.[0] ?? null }))} />
                    {application.resume && <span className="rp-hint">{application.resume.name}</span>}
                  </label>
                  <label className="rp-field">
                    <span>When could you start?</span>
                    <select className="rp-input" required value={application.availability} onChange={(event) => setApplication((current) => ({ ...current, availability: event.target.value }))}>
                      <option value="">Select availability</option>
                      <option>Immediately</option>
                      <option>Within 2 weeks</option>
                      <option>Within 1 month</option>
                      <option>More than 1 month</option>
                    </select>
                  </label>
                  <label className="rp-field rp-field-wide">
                    <span>Why are you interested in this role?</span>
                    <textarea className="rp-input rp-textarea" rows={3} required value={application.question} onChange={(event) => setApplication((current) => ({ ...current, question: event.target.value }))} />
                  </label>
                </div>
                <label className="rp-checkbox cert-consent">
                  <input type="checkbox" required checked={application.consent} onChange={(event) => setApplication((current) => ({ ...current, consent: event.target.checked }))} />
                  I consent to sharing these details and my resume with WINR for this application. This demo does not transmit or store them.
                </label>
                <div className="cert-form-actions">
                  <button type="button" className="rp-secondary-btn" onClick={closeApplication}>Cancel</button>
                  <button type="submit" className="rp-primary-btn">Submit application</button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
