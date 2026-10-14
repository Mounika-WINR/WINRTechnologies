import { useState } from "react";
import { Hero } from "../components/sections/Hero.jsx";
import { ServicesGrid } from "../components/sections/ServicesGrid.jsx";
import { CTABanner } from "../components/sections/CTABanner.jsx";
import { LogoIntro } from "../components/sections/LogoIntro.jsx";

function PageLine() {
  return <div className="wr-page-line" data-reveal="line" aria-hidden="true" />;
}

export function Home() {
  /* Intro plays once per visit to Home. `exiting` flips as the curtain starts
     its centre->left glide, so the Hero reveal begins UNDER the fading curtain -
     one continuous motion with no dead beat. `introDone` removes the overlay. */
  const [exiting, setExiting] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <LogoIntro onExitStart={() => setExiting(true)} onDone={() => setIntroDone(true)} />
      <div className="wr-home-sections" data-reveal-group>
      <Hero introDone={introDone || exiting} />
      </div>
      <PageLine />
      <ServicesGrid />
      <PageLine />
      <CTABanner />
    </>
  );
}
