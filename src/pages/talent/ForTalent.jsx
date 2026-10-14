import { FloatingLogo } from "../../components/sections/FloatingLogo.jsx";

const TALENT_OPTIONS = [
  {
    title: "Resume Portal",
    description: "Build a role-focused resume, review your details, and prepare it for an ATS score.",
    href: "#/talent/resume-portal",
  },
  {
    title: "Career",
    description: "Explore current internship and full-time opportunities and apply through the form.",
    href: "#/talent/certification",
  },
];

export function ForTalent() {
  return (
    <div className="wr-talent-page">
      <section className="wr-sec wr-full-hero wr-talent-hero">
        <div className="wr-hero split wr-talent-intro">
          <div className="wr-hero-left">
            <FloatingLogo className="wr-hero-floating" />
            <p className="wr-tagline">Your next step starts here</p>
          </div>
          <div className="wr-about-right">
            <p className="wr-eyebrow">WINR TECHNOLOGIES — FOR TALENT</p>
            <h1 className="wr-main-title">For Talent</h1>
            <div className="wr-rule" />
            <p className="wr-sub about-text">
              Explore WINR&apos;s talent resources and certification information.
            </p>
          </div>
        </div>
      </section>

      <section className="wr-sec wr-talent-options" aria-label="Talent resources">
        {TALENT_OPTIONS.map((option) => (
          <article className="wr-talent-option" key={option.title}>
            <span className="wr-talent-option-mark" aria-hidden="true" />
            <h2>{option.title}</h2>
            <p>{option.description}</p>
            <a className="wr-talent-option-link" href={option.href}>
              {option.title === "Resume Portal" ? "Open Resume Portal" : "Explore careers"}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
