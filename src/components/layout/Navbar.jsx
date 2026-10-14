import { useEffect, useState } from "react";
import { NAV, HERO } from "../../data/services.js";
import logoOnly from "../../assets/images/logo.png";
import logoWithName from "../../assets/images/WinrLogoName.png";
import { Modal } from "../ui/Modal.jsx";

export function Navbar() {
  const [open, setOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginNotice, setLoginNotice] = useState("");
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const updateCurrentHash = () => {
      setCurrentHash(window.location.hash);
      setMobileMenuOpen(false);
      setOpen(null);
    };
    window.addEventListener("hashchange", updateCurrentHash);
    return () => window.removeEventListener("hashchange", updateCurrentHash);
  }, []);

  const activeIndex = NAV.findIndex(
    (item) => item.href === currentHash || item.drop?.some((link) => link.h === currentHash),
  );
  const selectedIndex = activeIndex >= 0
    ? activeIndex
    : ["", "#", "#/"].includes(currentHash)
      ? NAV.findIndex((item) => item.label === "Home")
      : -1;

  return (
    <header className="wr-top">
      <a className="wr-brand" href="#home" aria-label="WINR Technologies home">
        <img src={logoOnly} alt="WINR logo" className="wr-logo-img" />
        <span className="wr-brand-t"><strong>WINR Technologies</strong><em>PVT LTD</em></span>
      </a>
      <button
        className="wr-mobile-menu-toggle"
        type="button"
        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={`wr-nav${open !== null ? " is-interacting" : ""}${mobileMenuOpen ? " is-mobile-open" : ""}`}
      >
        {NAV.map((n, i) => (
          <div
            key={n.label}
            className={`wr-nav-item wr-nav-item--${n.label.toLowerCase().replace(/\s+/g, "-")} ${open === i ? "is-open" : ""}`}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) setOpen(n.drop ? i : null);
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover)").matches) setOpen(null);
            }}
          >
            <a
              href={n.href}
              className={selectedIndex === i ? "on" : ""}
              aria-haspopup={n.drop ? "true" : undefined}
              aria-expanded={n.drop ? open === i : undefined}
              aria-controls={n.drop ? `wr-nav-dropdown-${i}` : undefined}
              onFocus={() => {
                if (!window.matchMedia("(max-width: 760px)").matches) {
                  setOpen(n.drop ? i : null);
                }
              }}
              onClick={(event) => {
                if (n.drop && window.matchMedia("(max-width: 760px)").matches) {
                  event.preventDefault();
                  setOpen((current) => current === i ? null : i);
                  return;
                }
                setMobileMenuOpen(false);
                setOpen(null);
              }}
            >
              {n.label}{n.hasMenu ? " ▾" : ""}
            </a>
            {n.drop && open === i && (
              <div id={`wr-nav-dropdown-${i}`} className="wr-drop" role="menu">
                {n.drop.map((d) => (
                  <a
                    key={d.t}
                    href={d.h}
                    role="menuitem"
                    className="wr-drop-card"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setOpen(null);
                    }}
                  >
                    <strong>{d.t}</strong>
                    {d.d ? <span>{d.d}</span> : null}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="wr-nav-item wr-nav-item--login">
          <button
            className="wr-login-link"
            type="button"
            onClick={() => {
              setLoginNotice("");
              setLoginOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            Login
          </button>
        </div>
      </nav>
      <Modal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        title="User Login"
        className="wr-login-modal"
      >
        <p className="wr-modal-intro">Sign in to your WINR account.</p>
        <form
          className="wr-modal-form wr-login-form"
          onSubmit={(event) => {
            event.preventDefault();
            setLoginNotice("Login is not connected yet. Your credentials have not been sent.");
          }}
        >
          <label className="wr-contact-field">
            <span>User ID / Email <b>*</b></span>
            <input autoComplete="username" name="username" required />
          </label>
          <label className="wr-contact-field">
            <span>Password <b>*</b></span>
            <input autoComplete="current-password" name="password" type="password" required />
          </label>
          {loginNotice && <p className="wr-modal-notice" role="status">{loginNotice}</p>}
          <button className="wr-contact-submit" type="submit">Login</button>
        </form>
      </Modal>
    </header>
  );
}

// Back-compat alias (old Header.jsx imports)
export const Header = Navbar;

export function Hero() {
  return (
    <section className="wr-hero split" id="home">
      <div className="wr-hero-left">
        <img src={logoWithName} alt="WINR Technologies Pvt Ltd" className="wr-hero-logo" />
        <p className="wr-tagline">{HERO.tagline}</p>
      </div>
      <div className="wr-hero-right">
        <p className="wr-eyebrow">{HERO.eyebrow}</p>
        <h1>{HERO.titleTop}<br /><span className="acc">{HERO.titleAccent}</span><br />{HERO.titleBottom}</h1>
        <p className="wr-sub">{HERO.desc}</p>
        <div className="wr-cta-row">
          <a className="btn skew pri" href={HERO.primaryCta.href}><span>{HERO.primaryCta.label}</span></a>
          <a className="btn skew sec" href={HERO.secondaryCta.href}><span>{HERO.secondaryCta.label}</span></a>
        </div>
      </div>
    </section>
  );
}
