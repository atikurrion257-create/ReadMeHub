# Phases 1–2 — Keyword Research & Search Intent Matrix

Research date: 2026-09-06. Markets by priority: **US → CA → UK → AU**, architecture globally scalable (single `/` URLs; geo differences handled in-page, not by doorway pages).

## Method

1. Identify the commercial cluster (password managers) via affiliate-market viability + verifiable pricing + SERP composition.
2. Enumerate keyword classes: `best-X`, `X-review`, `X-vs-Y`, `X-alternatives`, `X-pricing`, `X-coupon/deal/discount`, `free-X`, use-case (`X-for-families/small-business`), problem-aware (`is-X-safe`, `X-vs-browser`), question keywords (People-Also-Ask patterns), brand + category entities.
3. Classify by intent and map **one target page per intent** to prevent cannibalization.
4. Volume figures are treated as directional (drawn from public SEO sources and SERP composition), never published on-site; on-site pages never cite traffic numbers.

## SERP observations (what actually ranks, 2026)

- "best password manager" SERP: editorial listicles (Wirecutter-style), software blogs, and vendor-comparison content. Near-universal weaknesses: undated/unverified pricing, affiliate-rank correlation, no "who should avoid" guidance, feature tables without decision guidance.
- Comparisons (`X vs Y`): blend of vendor pages and affiliate posts; most bury the verdict below 1,500 words. Opportunity: **verdict-first** pages with verified pricing.
- Alternatives (`X alternatives`): dominated by list posts that barely mention why users leave. Opportunity: churn-reason-led structure.
- Coupon/deal queries: coupon-site spam with invented codes. Opportunity: honest verification statuses (rare in this SERP).

## Launch-cluster intent matrix (canonical; machine-readable copy at `content/data/intent-matrix.csv`)

| Keyword (cluster) | Primary intent | Funnel | SERP type | Target page | Parent | Affiliate | Deal/Coupon |
|---|---|---|---|---|---|---|---|
| best password manager | Commercial investigation | Decision | Listicle + reviews | `/best/password-managers/` (pillar) | Category: Password Managers | High | Medium |
| best free password manager | Commercial (cost-constrained) | Decision | Listicle | Section → guide "Free vs Paid" | Pillar | Medium | Low |
| best password manager for families | Commercial | Decision | Listicles, thin | `/use-cases/password-manager-for-families/` | Pillar | High | Low |
| password manager for small business | Commercial | Decision | Vendor-heavy | Tier 4 (roadmap) | Pillar | High | Low |
| 1Password review | Commercial investigation | Decision | Review posts | `/reviews/1password/` | Brand: 1Password | High | Medium |
| Bitwarden review | Commercial | Decision | Review posts | `/reviews/bitwarden/` | Brand: Bitwarden | Low (no public program) | Low |
| NordPass review | Commercial | Decision | Affiliate reviews | `/reviews/nordpass/` | Brand: NordPass | High | High |
| Proton Pass review | Commercial | Decision | Sparse/affiliate | `/reviews/proton-pass/` | Brand: Proton | Medium | Low |
| is 1Password worth it | Commercial (validation) | Decision | Forum + posts | H2 inside `/reviews/1password/` | — | High | Low |
| 1Password vs Bitwarden | Comparison | Decision | Comparisons | `/compare/1password-vs-bitwarden/` | Pillar | High | Low |
| Bitwarden vs NordPass | Comparison | Decision | Comparisons | Tier 4 (roadmap, linked from pillar + reviews) | Pillar | Medium | Low |
| 1Password alternatives | Alternatives | Decision | Listicles | `/alternatives/1password/` (roadmap T4) | Brand: 1Password | Medium | Low |
| Bitwarden alternatives | Alternatives | Decision | Listicles | `/alternatives/bitwarden/` | Brand: Bitwarden | High | Low |
| 1Password pricing / cost | Pricing (navigational-commercial) | Decision | Vendor + snippets | "Pricing" section in review + brand page (never a standalone thin page) | Brand | High | Medium |
| 1Password coupon / discount / deal | Deal | Transactional | Coupon sites | `/deals/` hub with verified statuses only | Deals | High | High |
| NordPass deal | Deal | Transactional | Coupon sites | Deals hub (verified statuses) | Deals | High | High |
| free vs paid password manager | Informational (problem-solving) | Research | Blog posts | `/guides/free-vs-paid-password-managers/` | Pillar | Medium | Low |
| password manager vs browser autofill | Informational (problem-aware) | Research | Sparse, shallow | `/guides/password-manager-vs-browser-autofill/` | Category | Low | Low |
| are password managers safe | Informational (trust) | Research | E-E-A-T heavy | FAQ block in pillar + guide cross-links | Category | Low | Low |
| what is a password manager | Informational | Research | Definitions | Intro of pillar + glossary (roadmap) | Category | Low | Low |
| password manager | Category head | Discovery | Mixed | `/categories/password-managers/` hub | Home | Medium | Medium |
| LastPass alternatives | Alternatives (churn) | Decision | Listicles | Tier 5 (roadmap) — high churn intent, trust-sensitive | Category | High | Low |
| Keeper vs 1Password, Dashlane vs 1Password | Comparison | Decision | Comparisons | Tier 4–5 roadmap | Pillar | High | Low |
| password manager for couples / seniors | Use case long-tail | Decision | Very thin | Tier 5 roadmap (only if differentiation possible) | Use case: families | Medium | Low |

## Explicitly rejected (anti-spam rules)

- `best-password-manager-usa / -canada / -uk / -australia` doorway variants — no meaningful regional product difference; geo handled in-page (currency note + availability line).
- `1password-free-trial` standalone page (thin; trial info belongs in the review/brand page).
- Mass `X vs Y` pages for pairs without genuine search demand or differentiated analysis.
- Any "Notion AI Enterprise Workspace"-style invented product pages from the legacy export.

## Cannibalization guards

One primary keyword → one URL. Reviews own `{brand} review / pricing / worth it / coupon intent`; the pillar owns `best-X`; guides own informational; the deals hub owns deal intent; category hub owns the head term via a curated decision center (not a thin list). Internal anchors always match the target page's primary intent.

## Next-vertical roadmap keyword seeds (Phase 31 scoring applied; see roadmap doc)

Hosting (`best web hosting`, `siteground vs bluehost`, `hosting for wordpress`…), VPNs, website builders, AI tools, project management — each enters production only after the same verify-priced, affiliate-confirmed, SERP-gap analysis. Templates and ACF fields are vertical-agnostic already.
