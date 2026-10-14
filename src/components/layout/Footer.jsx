import { FOOTER } from "../../data/services.js";

function Icon({ d, fill }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style={{ flex: "0 0 auto" }}>
      {fill ? (
        <path d={d} fill="#DE7829" />
      ) : (
        <path d={d} fill="none" stroke="#DE7829" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

const ICONS = {
  pin: "M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  phone: "M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M3.5 7l8.5 6 8.5-6",
  in: "M6.5 9.5V18 M6.5 6v.5 M10 18v-5a3 3 0 0 1 6 0v5 M10 9.5V18",
  ig: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M17.4 6.6h.01",
  fb: "M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3H9v9h3v-9h2.5l.5-3H12V6.8c0-.5.4-.8.9-.8H15V3z",
};

const CONTACT_EMAILS = [
  { label: "Email", email: "info@winrtechnologies.com" },
];

const SOCIALS = [
  { label: "LinkedIn", icon: "in", href: "https://www.linkedin.com/company/win-r-technologies-private-limited/" },
  { label: "Instagram", icon: "ig", href: "https://instagram.com/winr_technologies?dlrf=MTMzcHpid2Y4bXJzMA%3D%3D" },
  { label: "Facebook", icon: "fb", href: "https://www.facebook.com/winrtechnologies" },
];

export function NewsletterForm() {
  return (
    <form className="wr-news-stacked" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        required
        placeholder="Enter your email address"
        aria-label="Enter your email address"
        className="wr-news-input"
      />
      <button type="submit" className="wr-news-btn-orange">
        Subscribe
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="wr-foot" id="contact">
      <div className="wr-page-line" aria-hidden="true" />

      <div className="wr-foot-grid contact">
        {/* LEFT COLUMN: Address, Phone, Email, Social Media, Copyright */}
        <div className="wr-contact-col left-fitted">
          <ul className="wr-contact-list">
            <li>
              <span className="wr-cicon"><Icon d={ICONS.pin} /></span>
              <div><strong>ADDRESS</strong><span>{FOOTER.address}</span></div>
            </li>
            <li>
              <span className="wr-cicon"><Icon d={ICONS.phone} /></span>
              <div><strong>PHONE</strong><a href={`tel:${FOOTER.phone.replace(/[^+\d]/g, "")}`}>{FOOTER.phone}</a></div>
            </li>
            <li>
              <span className="wr-cicon"><Icon d={ICONS.mail} /></span>
              <div className="wr-footer-email">
                <strong>EMAIL</strong>
                <div className="wr-footer-email-list">
                  {CONTACT_EMAILS.map(({ label, email }) => (
                    <a href={`mailto:${email}`} key={label}>
                      <b>{label}:</b> {email}
                    </a>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          <div className="wr-social">
            <p className="wr-social-t">SOCIAL MEDIA</p>
            <div className="wr-social-row">
              {SOCIALS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <span className="wr-cicon sm"><Icon d={ICONS[icon]} /></span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STAY CONNECTED, Newsletter stacked, Policy Links */}
        <div className="wr-stay right-fitted">
          <p className="wr-label" style={{ marginTop: 0 }}>{FOOTER.newsletterTitle}</p>
          <p className="wr-sub xs">{FOOTER.newsletterDesc}</p>
          <NewsletterForm />

        </div>
      </div>
      <div className="wr-footer-legal-row">
        <span className="wr-copy-left">{FOOTER.copyright}</span>
        <nav className="wr-policy-links-right" aria-label="Legal policies">
          <a href="#/privacy-policy">Privacy Policy</a>
          <span className="wr-sep" aria-hidden="true">•</span>
          <a href="#/terms-of-service">Terms of Services &amp; Conditions</a>
          <span className="wr-sep" aria-hidden="true">•</span>
          <a href="#/cookie-policy">Cookie Policy</a>
        </nav>
      </div>
    </footer>
  );
}
