import { SERVICE_CARDS, SERVICES_INTRO } from "../data/services.js";
import { SectionHeading } from "../components/ui/SectionHeading.jsx";
import { ServiceGrid } from "../components/sections/ServicesGrid.jsx";

export function Services() {
  return (
    <section className="wr-sec" id="services">
      <SectionHeading title={SERVICES_INTRO.title} desc={SERVICES_INTRO.desc} />
      <ServiceGrid cards={SERVICE_CARDS} />
    </section>
  );
}
