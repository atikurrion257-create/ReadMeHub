# Phases 31–32 + 43 — Launch Roadmap, Prioritization & Post-Launch Gap Audit

## A. Prioritization scoring framework (0–5 each; ship threshold ≥18/30)

`Search demand · Commercial/affiliate value · SERP weakness (opportunity) · Differentiation possible · Verification cost (inverse) · Update burden (inverse)`

## B. Launch tiers

**Tier 1 (launch day — shipped in this repo, content + preview + WXR):**
1. `/best/password-managers/` — pillar (highest demand × affiliate value; SERP = interchangeable listicles)
2. `/reviews/1password/`, `/reviews/bitwarden/`, `/reviews/nordpass/`, `/reviews/proton-pass/`
3. `/compare/1password-vs-bitwarden/` (flagship; highest comparison demand in cluster)
4. `/categories/password-managers/` hub + `/categories/` index
5. `/deals/` hub (verified statuses; honesty as positioning)
6. Trust spine: About, How We Evaluate, Editorial Policy, Affiliate Disclosure, Contact, Privacy, Terms
7. Homepage (decision platform, all 20 sections per Phase 7)

**Tier 2 (weeks 1–4):** `/alternatives/bitwarden/`, `/use-cases/password-manager-for-families/`, `/guides/free-vs-paid-password-managers/`, `/guides/password-manager-vs-browser-autofill/`, brand hubs ×4 — *shipped at launch in this repo as well* (they were cheap to produce well and complete the cluster graph); "weeks 1–4" applies to expansion beyond.

**Tier 3 (weeks 2–8):** `/compare/bitwarden-vs-nordpass/`, `/compare/proton-pass-vs-bitwarden/`, `/alternatives/1password/`, `/reviews/dashlane/`, `/reviews/keeper/`, `/reviews/lastpass/` (LastPass = churn-intent magnet; requires careful security-history handling with sources).

**Tier 4 (months 2–3):** deals/coupons depth per brand (`/deals/nordpass/`, `/deals/1password/`) — only as verification workflow matures; small-business password manager use case.

**Tier 5 (months 3–6):** vertical #2 = **Web Hosting** (largest affiliate market; template reuse maximal; needs fresh price verification workflow), then VPN, then AI tools. Each vertical enters only after its own Phase 1–4 sprint (keywords, SERP, gaps, verified pricing).

## C. Update & verification cadence (built into ACF + QA)

- Money pages: price re-verification ≤ 45 days (`rmh_last_verified` drives an admin "stale" notice and a front-end "Last verified" stamp).
- Deals: `rmh_last_checked` ≤ 30 days or the badge auto-degrades to "Unverified" in the template logic — the site cannot silently show stale verified badges.
- Quarterly: internal-link graph audit (`tools/qa_checks.py` orphan + anchor checks), cannibalization review in Search Console.

## D. Post-implementation competitor gap audit (Phase 43 checklist — re-run quarterly)

| Dimension | Gap check against G2/Capterra/Wirecutter-class players |
|---|---|
| Content depth | Pillar must answer what/why/who/how much/limitations/alternatives — QA'd by template completeness fields |
| Intent coverage | best/review/vs/alternatives/pricing/deal/free/use-case — track which intents exist per cluster |
| Comparison UX | verdict-first, sticky-column tables, choose-if panels |
| Review UX | verdict box, pros/cons, who-should-avoid, verified pricing |
| Deals/coupon UX | status badges, dates, no fake urgency |
| Trust | no fabricated ratings, named methodology, corrections policy |
| GEO | answer blocks, extractable tables, entity clarity |
| Mobile | tap targets, table behavior, stacked verdicts |
| Performance | single CSS, system fonts, no addons, CWV budgets (LCP <2.0s on hosted build, CLS <0.05, INP <200ms) |
| Accessibility | AA contrast, focus rings, semantics (automated checks in QA script) |

Known remaining gaps after this build (honest list): no hands-on testing program yet (reviews are research-based and labeled as such); no numeric editorial scores (by design, until a real methodology exists); newsletter is wired in UI but needs an ESP connected on the host; verticals 2–4 are roadmap only. Each gap has an owner-ready next step in the roadmap.
