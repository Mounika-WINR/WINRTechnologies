# Industries — 6 Pages → 1 Single Page (Saved Plan, Not Started)

Status: SET ASIDE — for later discussion. No code changed for this.

## Goal (per team lead suggestion)
Summarize all 6 Industries pages into ONE page under "Industries" link, but keep different card-UI models per industry section.

## Current State (6 pages inventory)
1. Technology & IT → `src/pages/services/TechnologyIT.jsx` → `TechnologyIT()`
   - Hero: logo + eyebrow + title + desc + 4 stats (50% / 95% / 18d / 85%) — NO buttons
   - Challenges We Solve (AccordionGallery, 6 cards) / How We Deliver (HoverRevealCards, 4 steps) / Roles We Staff (pills) / Quote card
2. Telecommunications → `src/pages/industries/IndustryPages.jsx` → `TELECOM_DATA`
3. Banking & Financial Services → `BANKING_DATA`
4. Healthcare & Life Sciences → `HEALTHCARE_DATA`
5. Manufacturing → `MANUFACTURING_DATA`
6. Professional Services → `PROFESSIONAL_DATA`
   - 2-6 share `IndustryPage({data})` factory: Hero (logo + eyebrow + title + tagline + desc + stats, NO buttons) → Challenges (6) → How We Deliver (4) → Roles (pills) → Testimonial. Uses `wr-tech-it-container` compaction CSS.
   - Routes in `src/App.jsx` PAGES: `/industries`, `/industries/technology-it`, `/industries/telecommunications`, `/industries/banking-financial-services`, `/industries/healthcare-life-sciences`, `/industries/manufacturing`, `/industries/professional-services`
   - Nav in `src/components/layout/Navbar.jsx` — Industries dropdown points to the 6 routes.

## Card-UI Models to preserve / mix on single page
- A. Hero stats (4 mini cards) — `.wr-hero-stats`
- B. Challenges We Solve (AccordionGallery, 6 expanding cards) — `.wr-accordion-gallery`
- C. How We Deliver (HoverRevealCards, 4 cards, number+title → hover reveal) — `.wr-hover-reveal-grid` (+ `.cols-3` variant)
- D. Roles We Staff (pills) — `.wr-roles-pills`
- E. Quote/testimonial card — `.wr-quote-card`
- F. Services-style cards (Build grid / ServiceCards / Quality grid) — only if we want variety per industry

## Combination Design Options (to discuss later)
- Option A — Tabbed single page: top sub-nav pills/tabs (Tech / Telecom / Banking / Healthcare / Manufacturing / Professional). One section visible at a time, URL hash `#/industries#telecom` etc. Pros: short page, keeps 6 contents 1:1. Cons: tab JS + deep-link handling.
- Option B — Stacked long page with sticky sub-nav: all 6 stacked vertically, each with own anchor id + mini hero + its own card-UI model varied per industry (e.g., Tech=Accordion, Telecom=HoverReveal, Banking=pills-focus...). Pros: SEO, no routing change, easy. Cons: long page.
- Option C — Summary + detail anchors: top summary grid (6 clickable summary cards) → click scrolls to that industry's detail block below. Best of A+B, matches "summarizing all 6 pages" wording.

Recommendation to discuss: Option C (summary grid + stacked details, each detail keeps its own card-UI model so page doesn't look repetitive).

## Implementation Steps (when approved)
1. Create `src/pages/industries/IndustriesOverview.jsx` — imports all 6 DATA objects + TechnologyIT content, renders summary grid + 6 `<IndustryPage data>` (or refactored `<IndustrySection>`) stacked with ids.
2. Keep `IndustryPages.jsx` factory untouched — reuse `IndustryPage` as section component (remove outer container duplication, keep `wr-tech-it-container` once at top).
3. Update `src/App.jsx`: `/industries` → `<IndustriesOverview/>`; keep old 6 routes as aliases OR redirect to `#/industries#<id>` for backward compat.
4. Update `Navbar.jsx` Industries dropdown: main link → `#/industries`, sub-links → `#/industries#telecom` anchors (or keep dropdown but point to anchors).
5. CSS: add `.wr-industries-overview` — summary grid, sticky sub-nav, section dividers (reuse `.wr-page-line`), ensure `wr-full-hero` compact once at top + smaller per-industry headers to avoid 6 big heroes.
6. Test: build + check anchor scroll, mobile (tabs/stack collapse), no duplicate ids.
7. Optional: deprecate separate pages after approval (remove routes or keep hidden).

## Open Questions for design discussion
- One shared hero at top + 6 compact sections, or 6 full heroes stacked?
- Same card-UI per section (consistent) or different model per industry (variety)?
- Tabs vs long-scroll?
- Keep old URLs working?

## Files to touch (later)
- NEW: `src/pages/industries/IndustriesOverview.jsx`
- EDIT: `src/App.jsx`, `src/components/layout/Navbar.jsx`, `src/styles/index.css`
- REUSE: `src/pages/industries/IndustryPages.jsx` (DATA + factory), `src/pages/services/TechnologyIT.jsx` (Tech content)

Saved: 2026-09-25. Ready to resume on request.
