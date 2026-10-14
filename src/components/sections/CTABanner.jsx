import { CTA_SECTION } from "../../data/services.js";

export function CTABanner() {
  return (
    <section className="wr-sec page3" id="quote" data-reveal data-reveal-group>
      {/* tagline top-center in blue shade that sits on the bg gradient */}
      <p className="wr-page3-tag">{CTA_SECTION.tagline}</p>
      {/* original website content, same position (centered below tagline) */}
      <p className="wr-sub sm">{CTA_SECTION.desc}</p>
      <div className="wr-page3-cols">
        {/* left: 3 pillar lines, one after one (no cards) */}
        <ul className="wr-lines left" aria-label="What we're building toward">
          {CTA_SECTION.pillars.map((p) => (
            <li key={p}><span className="odot" />{p}</li>
          ))}
        </ul>
        <span className="wr-vline" aria-hidden="true" />
        {/* right: 3 tick points, one after one */}
        <ul className="wr-lines right" aria-label="Engagement promises">
          {CTA_SECTION.ticks.map((t) => (
            <li key={t}><span className="odot" />{t}</li>
          ))}
        </ul>
      </div>
      {/* only quote button, centered */}
      <div className="wr-cta-row center">
        <a className="btn skew pri" href={CTA_SECTION.secondary.href}><span>{CTA_SECTION.secondary.label}</span></a>
      </div>
    </section>
  );
}
