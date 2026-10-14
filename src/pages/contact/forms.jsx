import { LeadForm } from "../../components/sections/LeadForm.jsx";
import { SectionHeading } from "../../components/ui/SectionHeading.jsx";

export function Consultation() {
  return (
    <section className="wr-sec" id="contact">
      <SectionHeading
        title="Get a free consultation"
        desc="Tell us what you want to build — we reply with scope, timeline and next steps."
      />
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <LeadForm title="Get a free consultation" cta="Request callback" />
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="wr-sec" id="quote">
      <SectionHeading
        title="Request a project quote"
        desc="Share a short brief — we estimate cost, team and delivery plan."
      />
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <LeadForm title="Request a project quote" cta="Get my quote" />
      </div>
    </section>
  );
}
