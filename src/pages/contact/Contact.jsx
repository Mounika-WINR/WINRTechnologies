import { useState } from "react";
import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";
import { Modal } from "../../components/ui/Modal.jsx";
import { MotionSubmitFeedback } from "../../components/ui/MotionSubmitFeedback.jsx";

const QUOTE_SERVICES = [
  "Web Development",
  "App Development",
  "Software Development",
  "Staffing",
];

const keepLettersAndSpaces = (value) => value.replace(/[^\p{L}\s]/gu, "").slice(0, 100);
const keepCountryCodeAndDigits = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  return value.trimStart().startsWith("+") ? `+${digits}` : digits;
};

export function Contact() {
  const [primaryInterest, setPrimaryInterest] = useState("");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const submitQuote = (event) => {
    event.preventDefault();
    setQuoteSent(true);
  };

  const submitContactMessage = (event) => {
    event.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="wr-contact-page">
      <section className="wr-sec wr-full-hero" id="contact-intro">
        <div className="wr-hero split">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Let&apos;s build what moves you forward</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">CONTACT WINR TECHNOLOGIES</p>
            <h1 className="wr-main-title">Let&apos;s Start a Conversation</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              Whether you&apos;re planning a digital product, looking for technology talent, or
              exploring a partnership, our team is ready to learn about your goals and help you
              find the right next step.
            </p>
          </div>
        </div>
      </section>

      <div className="wr-page-line" />

      <section className="wr-sec wr-full-section wr-contact-quotes" aria-labelledby="contact-quotes-title">
        <div className="wr-section-header-block">
          <p className="wr-eyebrow">LET&apos;S TALK ABOUT YOUR PROJECT</p>
          <button
            className="wr-large-heading wr-contact-quote-trigger"
            id="contact-quotes-title"
            type="button"
            onClick={() => {
              setQuoteSent(false);
              setQuoteOpen(true);
            }}
          >
            Request Quote
          </button>
          <p className="wr-sub wr-sub-wide">
            Tell us what you&apos;re looking to build or staff. Share a few details to continue.
          </p>
        </div>
      </section>

      <Modal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        title="Request a Quote"
        className="wr-contact-quote-modal"
      >
        {quoteSent ? (
          <MotionSubmitFeedback />
        ) : (
          <>
            <p className="wr-modal-intro">
              Share your details and choose a service to continue.
            </p>
            <form className="wr-modal-form" onSubmit={submitQuote}>
              <label className="wr-contact-field">
                <span>Full name <b>*</b></span>
                <input
                  autoComplete="name"
                  name="fullName"
                  pattern="(?=.*\p{L})[\p{L}\s]{2,100}"
                  maxLength={100}
                  minLength={2}
                  onChange={(event) => {
                    event.target.value = keepLettersAndSpaces(event.target.value);
                  }}
                  required
                />
              </label>
              <label className="wr-contact-field">
                <span>Phone number <b>*</b></span>
                <input
                  autoComplete="tel"
                  inputMode="tel"
                  name="phone"
                  type="tel"
                  placeholder="+919876543210"
                  pattern="\+[1-9][0-9]{0,2}[0-9]{10}"
                  title="Enter a + country code followed by exactly 10 phone digits, for example +919876543210."
                  onChange={(event) => {
                    event.target.value = keepCountryCodeAndDigits(event.target.value);
                  }}
                  required
                />
                <small>Include the country code followed by 10 digits (example: +91XXXXXXXXXX).</small>
              </label>
              <label className="wr-contact-field">
                <span>Email <b>*</b></span>
                <input autoComplete="email" maxLength={254} name="email" type="email" required />
              </label>
              <label className="wr-contact-field">
                <span>Company name <b>*</b></span>
                <input
                  autoComplete="organization"
                  name="companyName"
                  pattern="(?=.*\p{L})[\p{L}\s]{2,100}"
                  maxLength={100}
                  minLength={2}
                  onChange={(event) => {
                    event.target.value = keepLettersAndSpaces(event.target.value);
                  }}
                  required
                />
              </label>
              <label className="wr-contact-field">
                <span>Services you&apos;re interested in <b>*</b></span>
                <select name="service" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  {QUOTE_SERVICES.map((service) => <option key={service}>{service}</option>)}
                </select>
              </label>
              <label className="wr-contact-field wr-modal-field-wide">
                <span>Message <b>*</b></span>
                <textarea name="message" rows="4" maxLength={2000} required />
              </label>
              <button className="wr-contact-submit wr-modal-field-wide" type="submit">
                Schedule the Meet
              </button>
            </form>
          </>
        )}
      </Modal>

      <div className="wr-page-line" />

      <section className="wr-sec wr-full-section wr-contact-message-section" aria-labelledby="contact-message-title">
        <div className="wr-section-header-block">
          <p className="wr-eyebrow">WE&apos;RE HERE TO HELP</p>
          <h2 className="wr-large-heading" id="contact-message-title">Get in Touch</h2>
        </div>
        <article className="wr-contact-message-card">
          <h3>Send us a Message</h3>
          <p className="wr-contact-form-intro">Tell us about your goals and how we can help.</p>
          {contactSent ? <MotionSubmitFeedback /> : (
          <form className="wr-contact-form" onSubmit={submitContactMessage}>
            <label className="wr-contact-field">
              <span>Full Name <b>*</b></span>
              <input autoComplete="name" name="fullName" required />
            </label>
            <label className="wr-contact-field">
              <span>Email <b>*</b></span>
              <input autoComplete="email" name="email" type="email" required />
            </label>
            <label className="wr-contact-field">
              <span>Phone Number <b>*</b></span>
              <input autoComplete="tel" name="phone" type="tel" required />
            </label>
            <label className="wr-contact-field wr-contact-field-wide">
              <span>Primary Interest <b>*</b></span>
              <select
                name="primaryInterest"
                value={primaryInterest}
                onChange={(event) => setPrimaryInterest(event.target.value)}
                required
              >
                <option value="" disabled>Choose your primary interest</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Student">Student</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </label>
            {primaryInterest === "Business Owner" && (
              <label className="wr-contact-field wr-contact-field-wide">
                <span>Purpose <b>*</b></span>
                <select name="purpose" defaultValue="" required>
                  <option value="" disabled>Select a development service</option>
                  <option value="App Development">App Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Software Development">Software Development</option>
                </select>
              </label>
            )}
            {primaryInterest === "Student" && (
              <label className="wr-contact-field wr-contact-field-wide">
                <span>What are you looking for? <b>*</b></span>
                <select name="studentOpportunity" defaultValue="" required>
                  <option value="" disabled>Select an opportunity</option>
                  <option value="Internship">Internship</option>
                  <option value="Opportunities">Opportunities</option>
                </select>
              </label>
            )}
            <label className="wr-contact-field wr-contact-field-wide">
              <span>Message</span>
              <textarea
                name="message"
                placeholder={primaryInterest === "Job Seeker"
                  ? "Share the roles you are looking for and your requirements..."
                  : "Tell us about your specific challenges and requirements..."}
                rows="5"
                required
              />
              {primaryInterest === "Job Seeker" && (
                <span className="wr-contact-resume-upload">
                  <span>Attach your resume (PDF, DOC, or DOCX)</span>
                  <input
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                </span>
              )}
            </label>
            <label className="wr-contact-consent wr-contact-field-wide">
              <input type="checkbox" name="privacyConsent" required />
              <span>
                I agree to WIN-R Technologies&apos; <a href="#/privacy-policy">Privacy Policy</a> and
                consent to being contacted about our services. <b>*</b>
              </span>
            </label>
            <label className="wr-contact-consent wr-contact-field-wide">
              <input type="checkbox" name="newsletterConsent" />
              <span>Subscribe to our newsletter for strategic insights and industry updates.</span>
            </label>
            <button className="wr-contact-submit wr-contact-field-wide" type="submit">
              Send Message
            </button>
            <p className="wr-contact-secure wr-contact-field-wide">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              Your information is secure and will never be shared with third parties.
            </p>
          </form>
          )}
        </article>
      </section>
    </div>
  );
}
