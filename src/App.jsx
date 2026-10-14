import { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { WhoWeAre } from "./pages/about/WhoWeAre.jsx";
import { Leadership } from "./pages/about/Leadership.jsx";
import { Partnerships } from "./pages/about/Partnerships.jsx";
import { TechnologyInnovation } from "./pages/about/TechnologyInnovation.jsx";
import { TechnologyIT } from "./pages/services/TechnologyIT.jsx";
/* Old individual industry pages — hidden for now; preserved for later decision.
import {
  Telecommunications,
  BankingFinancial,
  HealthcareLifeSciences,
  Manufacturing,
  ProfessionalServices,
} from "./pages/industries/IndustryPages.jsx"; */
import { Industries } from "./pages/industries/Industries.jsx";
import { WebDevelopment, AppDevelopment, SoftwareDevelopment, Training } from "./pages/services/details.jsx";
import { Consultation, Quote } from "./pages/contact/forms.jsx";
import { Contact } from "./pages/contact/Contact.jsx";
import { WhyWinR } from "./pages/about/WhyWinR.jsx";
import { Careers } from "./pages/about/Careers.jsx";
import { BgCompare } from "./pages/BgCompare.jsx";
import { ForTalent } from "./pages/talent/ForTalent.jsx";
import { Certification } from "./pages/talent/Certification.jsx";
import { ResumePortal } from "./pages/talent/ResumePortal.jsx";
import { CookiePolicy, PrivacyPolicy, TermsOfService } from "./pages/policies.jsx";
import "./styles/index.css";
/* Declarative scroll-reveal + on-load card stagger (opt-in via data-reveal).
   Loaded AFTER index.css so its soft transitions are not beaten by the
   blanket `transition` shorthand in aurora-background.css. */
import "./styles/scroll-reveal.css";

// Simple hash routing for now (react-router can replace this later).
// #/who-we-are, #/why-winr, #/careers — Home is the default page.
// Industries: all /industries and /industries/* routes render the consolidated
// Industries page. Old sub-routes pass focusId so the matching card is identified.
const INDUSTRY_FOCUS_MAP = {
  "/industries/technology-it": "technology-it",
  "/industries/telecommunications": "telecommunications",
  "/industries/banking-financial-services": "banking-financial-services",
  "/industries/healthcare-life-sciences": "healthcare-life-sciences",
  "/industries/manufacturing": "manufacturing",
  "/industries/professional-services": "professional-services",
};

const PAGES = {
  "/who-we-are": <WhoWeAre />,
  "/leadership": <Leadership />,
  "/partnerships": <Partnerships />,
  "/technology-innovation": <TechnologyInnovation />,
  "/technology-it": <TechnologyIT />,
  "/services/technology-it": <TechnologyIT />,
  "/services/web-development": <WebDevelopment />,
  "/services/app-development": <AppDevelopment />,
  "/services/software-development": <SoftwareDevelopment />,
  "/services/training": <Training />,
  "/contact": <Contact />,
  "/contact/consultation": <Consultation />,
  "/contact/quote": <Quote />,
  "/why-winr": <WhyWinR />,
  "/careers": <Careers />,
  "/talent": <ForTalent />,
  "/talent/certification": <Certification />,
  "/talent/resume-portal": <ResumePortal />,
  "/privacy-policy": <PrivacyPolicy />,
  "/terms-of-service": <TermsOfService />,
  "/cookie-policy": <CookiePolicy />,
};

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const cleanPath = hash.replace(/^#/, "");
  const routeKey = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;

  /* Every page opens FRESH at its first section: whenever the route changes,
     jump straight to the top so a previous deep scroll position is never
     inherited (e.g. Who We Are → Industries must show the 1st section, not a
     later one), and disable the browser's automatic scroll restoration so it
     cannot put us back mid-page. In-page anchors like #contact/#services are
     NOT routes — they still scroll normally. */
  useEffect(() => {
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [routeKey]);

  // Background component comparison — reference page only, rendered standalone
  // (no navbar/footer/aurora) so each background can be screenshotted cleanly.
  if (routeKey === "/__bg-compare") {
    return <BgCompare />;
  }

  // Consolidated Industries page — handles /industries and all /industries/* sub-routes
  if (routeKey === "/industries" || routeKey in INDUSTRY_FOCUS_MAP) {
    const focusId = INDUSTRY_FOCUS_MAP[routeKey] ?? null;
    return <Layout routeKey={routeKey}><Industries focusId={focusId} /></Layout>;
  }

  const page = PAGES[routeKey];
  return <Layout routeKey={routeKey}>{page ?? <Home />}</Layout>;
}
