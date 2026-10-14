import { SERVICE_CARDS } from "../../data/services.js";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { ServiceCard } from "../ui/ServiceCard.jsx";
import WinFolder from "./WinFolder.jsx";
import { SERVICES_INTRO } from "../../data/services.js";

export function ServicesGrid() {
  return (
    <section className="wr-sec page2" id="services" data-reveal data-reveal-group>
      <div className="wr-page2-split">
        <div className="wr-page2-left">
          <WinFolder cards={SERVICE_CARDS} />
        </div>
        <div className="wr-page2-head">
          <SectionHeading title={SERVICES_INTRO.title} desc={SERVICES_INTRO.desc} align="right" />
        </div>
      </div>
    </section>
  );
}

// Back-compat: old import path `./components/Services.jsx` -> Services
export function Services(props) {
  return <ServicesGrid {...props} />;
}

export function ServiceGrid({ cards = SERVICE_CARDS }) {
  return (
    <div className="wr-grid">
      {cards.slice(0, 4).map((c, i) => (
        <div key={c.id} className="wr-outer-card static">
          <ServiceCard card={c} index={i} />
        </div>
      ))}
    </div>
  );
}
