# Phase 42 — Visual Critique & UX Audit (executed)

Audited objectively on the rendered preview (29 pages), 2026-09-06. Method: automated metrics (DOM counts, contrast math, link graph, heading ladder) + designer review of the component system. Every finding below either **[FIXED]** in this build or **[OPEN]** with an owner-ready action.

## Verdict against the Phase 42 questions

| Question | Answer | Evidence |
|---|---|---|
| Does it look premium? | **Yes** — restrained editorial system: ink navy, one CTA color, semantic badges, no decorative gradients/sliders. | Design tokens; 17 sections, zero decorative widgets |
| Does it look trustworthy? | **Yes** — verified badges with dates on every money page, methodology strip, disclosure placement, honest "no offer found" states. | QA honesty checks pass |
| Understandable within seconds? | **Yes** — hero states what it is + whom it serves; Decision Finder and intent rail visible in the first two screens. | Homepage structure |
| Too much whitespace / empty? | **No** — 50 information components on the homepage; USEFULNESS > EMPTY WHITESPACE honored (per brief). | DOM audit |
| Overloaded? | **No** — one idea per section, consistent rhythm (64/44px), max ~3 card columns. | Section inventory |
| Cards repetitive? | **Controlled** — 8 distinct card archetypes with different internal structures (pick vs verdict vs status), not one clone. | CSS component inventory |
| CTAs excessive? | **No** — homepage: 4 primary CTAs across 17 sections; articles: 1; deals page: 5 (appropriate there). Contextual link CTAs ("Check current pricing…") per Phase 26. | Button census |
| Hierarchy obvious? | **Yes** — heading ladder enforced; QA gate fails on any skip. | qa_checks.py |
| Mobile native? | **Yes by construction** — single-row header, sheet-style intent panel, sticky first-column tables with swipe hints, 44px+ targets, stacked verdicts. Verified via CSS/breakpoint review. **[OPEN]** real-device pass on the hosted build (sandbox has no browser). |
| Comparison tables readable? | **Yes** — verdict-first, "what it means" column, sticky labels on mobile, ✓ markers only where earned. | Comparison template |
| Deals distinguishable? | **Yes** — 4 semantic badge states + auto-degradation of stale verifications. | Deals hub |
| Better organized than typical affiliate sites? | **Yes** — intent navigation + decision finder + dated freshness strip are the differentiators from W3/W4 gap strategy. | Competitor-gap strategy |

## Issues found and fixed during the audit (this is why QA gates matter)

1. **[FIXED] WCAG AA failure:** white on CTA orange (#E8590C) = 3.58:1 → token changed to #C74A08 (4.76:1), hover #A63E06 (6.34:1). Full token pair matrix now passes (11/11 measured pairs ≥4.5:1).
2. **[FIXED] Heading-ladder skips** (h1→h3, h2→h4) from nav-panel/footer/panel headings — re-leveled; QA gate now enforces "no skips" site-wide.
3. **[FIXED] Pillar URL mismatch** (`/best/best-password-managers/` vs links) → canonical `/best/password-managers/`; stale duplicate output eliminated by clean builds.
4. **[FIXED] Search results panel unreachable from the hero input** (parent overlay stayed hidden) → JS opens the results container from any entry point; Escape closes; inputs stay in sync.
5. **[FIXED] Orphaned pages** (pillar, alternatives, 4 brand hubs) → category hub gained a Brand-hubs group; review cross-links now point at the real alternatives page; QA orphan check added to the gate.
6. **[FIXED] Title-tag lengths** (>70 chars on 5 money pages) → dedicated `title_tag` overrides; H1s keep their fuller editorial wording.

## Remaining honest risks **[OPEN]**

- **No real-browser screenshot/device testing in this sandbox** (no PHP and no browser runtime). Mitigation: preview served and QA-verified at DOM/CSS level; the hosted WordPress build must get a Lighthouse + real-device pass before announcing (checklist in `wordpress/INSTALL.md` §6).
- **Elementor Free vs Theme Builder:** header/footer assignments documented with the zero-addon fallback (child-theme header override snippet path) in INSTALL.md §8.
- **System-font rendering** varies by platform (by design — performance first). If the brand later wants a display face, self-host one weight only.

## Automated gate (repeatable)

`python3 tools/qa_checks.py` → structure, meta, link graph, honesty markers, orphans, weight budgets. **Current status: PASS (29 pages, 0 errors, 0 warnings).**
