import { HERO } from "../../data/services.js";
import { FloatingLogo } from "./FloatingLogo.jsx";

/* Hero — Home 1st section.
   While the logo intro is playing (introDone === false) the section is held
   hidden; once the video finishes, the 3D floating logo is already settled on
   the LEFT while the RIGHT content slides in smoothly from the right. */
export function Hero({ introDone = true }) {
  return (
    <section className={`wr-hero split${introDone ? " is-intro-done" : " is-intro-pending"}`} id="home">
      <div className="wr-hero-left">
        <FloatingLogo className="wr-hero-floating" play={introDone} />
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
