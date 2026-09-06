# ReadMeHub — Executive Build Summary

Date: 2026-09-06 · Branch: `arena/01a074bc-readmehub`

## What ReadMeHub is

**ReadMeHub is a decision platform.** It researches products and software, verifies pricing, compares options honestly (including who should *not* buy), and organizes everything by what the user is trying to accomplish — not just by category. It competes conceptually with G2/Capterra (software discovery), NerdWallet/Forbes Advisor (decision guidance), and Wirecutter/TechRadar (buying advice) while exploiting their documented weaknesses: vendor-influenced review scores, undated pricing, affiliate-listicle sameness, and weak "which one is right for me" guidance.

## Non-negotiable principles enforced by the build

1. **Nothing fabricated.** Every price, date, deal, and claim traces to a source in `content/data/evidence-ledger.csv`. Ratings without a real methodology are never displayed — qualitative verdicts only, until genuine testing exists.
2. **The mandated stack:** WordPress + Hello Elementor (child theme) + Elementor + ACF + one lightweight CSS file + one small JS file. No page-builder addon packs.
3. **Decisions over lists.** Every commercial page answers: what, who it's for, who should avoid it, what it costs (verified), what are the limitations, and what are the alternatives.
4. **Affiliate UX is contextual, not aggressive.** "Check current pricing at 1Password" — never fake urgency, never invented coupon codes.

## Launch vertical (researched, verified, deliberately narrow)

**Password managers.** Chosen because: evergreen commercial demand, multiple public affiliate programs (1Password, Dashlane, NordPass, Keeper, LastPass), prices verifiable on official pages, and SERP dominated by interchangeable affiliate listicles we can beat on decision structure and price transparency.

Launch cluster (~25 pages, Tier 1–3): pillar "Best Password Managers", 4 reviews (1Password, Bitwarden, NordPass, Proton Pass), flagship comparison (1Password vs Bitwarden), alternatives (Bitwarden), use case (families), 2 supporting guides, category hub, brand hubs (4), deals hub (honest statuses), 7 trust pages. Roadmap for hosting / VPN / AI-tools verticals follows the same recipe (see `09-launch-roadmap.md`).

## Key verified facts already baked into content (verified 2026-09-06)

| Fact | Source class |
|---|---|
| Bitwarden: Free (unlimited passwords/devices); Premium $1.65/mo billed $19.80/yr; Families $3.99/mo (6 users, $47.88/yr); Teams $4/user/mo; Enterprise $6/user/mo | Official pricing page |
| 1Password: Individual $3.99/mo (regular, billed annually); $2.99 first-year promo for new customers; Families $5.99/mo regular / $4.49 first-year promo, up to 5 invited members; 14-day trial; no free tier | Official pricing pages |
| Proton Pass Free: unlimited logins/devices, 10 hide-my-email aliases, passkeys | Official pricing page (paid-tier prices render via JS → not published; link out instead) |
| NordPass: free = 1 device; paid pricing varies by term/promotion (~$1.3–2/mo range across terms) | Multiple corroborating 2026 sources; published as a range with a "verify at checkout" note, not an exact number |
| 1Password affiliate program exists (third-party listings: ~$2/signup + 25% first payment, managed via affiliate networks); NordPass via Impact (~30%/sale); Dashlane, Keeper, LastPass have public programs; **no public Bitwarden affiliate program found** | Affiliate-network listings (documented, not claimed as signed agreements) |
| G2/Capterra face persistent, citable trust criticism (review authenticity, vendor influence, asymmetric moderation) | Independent sentiment analyses + public discussions |

## Delivered in this repository

| Layer | Path |
|---|---|
| Strategy: audit, keywords/intent, competitor gaps, GEO, IA, ACF model, design system, linking+schema, roadmap | `strategy/` |
| Canonical content model (single source of truth for every page) | `content/` |
| WordPress implementation: Hello Elementor child theme (ACF groups, schema, breadcrumbs, cards, performance), Elementor kit + templates (generated JSON), WXR import, install runbook | `wordpress/` |
| Build pipeline (Python): WXR generator, Elementor template generator, static preview renderer | `tools/` |
| Reviewable preview of the full site (homepage + all launch pages), rendered from the same content model and CSS | `index.html`, `preview/` |
| Evidence ledger backing every factual claim | `content/data/evidence-ledger.csv` |

## Environment limitation (honest)

This sandbox has no PHP/database and no outbound network, so WordPress cannot be *executed* here. The WordPress implementation is complete and deployment-ready; the single remaining step is running the install/import on a PHP host per `wordpress/INSTALL.md`. The preview proves the design, content, and UX; the kit proves the WordPress architecture.
