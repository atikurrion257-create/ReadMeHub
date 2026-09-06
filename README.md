# ReadMeHub — The Decision Platform

**Research smarter. Compare better. Choose with confidence.**

ReadMeHub is a decision platform for products and software: verified pricing, honest comparisons (including who each product is *wrong* for), research-based reviews with dated evidence, and deals that are either verified or explicitly not claimed.

This repository is the **complete build**: strategy, content model, WordPress implementation kit (Hello Elementor child theme + Elementor templates + ACF), and a full static preview for design/content QA.

## Repository map

| Path | What it is |
|---|---|
| `strategy/` | Audit, keyword & intent matrix, competitor-gap strategy, GEO framework, IA + ACF data model, design system, linking/schema architecture, launch roadmap |
| `content/` | **Canonical content model** (single source of truth) + `data/evidence-ledger.csv` (every factual claim, sourced & dated) |
| `wordpress/` | Production implementation: Hello Elementor child theme, ACF field groups (code-registered), Elementor kit + templates (importable JSON), WXR content import, `INSTALL.md` runbook |
| `tools/` | Build pipeline: preview renderer, WXR generator, Elementor template generator, QA gate |
| `preview/` | Rendered static preview of the full site (29 pages) — serves for visual QA |
| `index.html` | Preview entry (homepage) — deployed preview entry point |
| `legacy/designarena-export/` | The original single-file export (preserved for the audit; **must not be published** — it contained fabricated structured data, documented in `strategy/01-phase0-audit.md`) |

## Principles enforced in the build

1. **Nothing fabricated.** No ratings without a real methodology (the schema builder structurally refuses), no unverified prices in tables (verification flags), no invented coupon codes (statuses: Verified / Official / Unverified / None), no fake urgency.
2. **Decision-first pages.** Verdict box → best for / not ideal for → key takeaways → verified pricing → analysis → pros/cons → alternatives → FAQ → sources. Answer engines can extract the answer in the first screen; humans get depth below.
3. **The mandated stack.** WordPress + Hello Elementor child + Elementor + ACF + one CSS file + one small JS file.
4. **Dates everywhere.** Every money page shows "Last verified"; the deals hub degrades stale badges automatically.

## Quick start

- **Review the design/content:** open `index.html` (or serve `preview/` with any static server). QA gate: `python3 tools/qa_checks.py`.
- **Deploy to WordPress:** follow `wordpress/INSTALL.md` (60–90 min, Elementor Free + ACF Free + Hello Elementor).
- **Regenerate everything after editing content:** `python3 tools/render_preview.py && python3 tools/build_wxr.py && python3 tools/build_elementor_templates.py`.

## Launch cluster (live in this repo)

Password Managers vertical: pillar (`/best/password-managers/`), 4 reviews (1Password, Bitwarden, NordPass, Proton Pass), 1 comparison (1Password vs Bitwarden), alternatives, families use case, 2 guides, category hub, 4 brand hubs, verified-status deals hub, and the trust spine (About, How We Evaluate, Editorial Policy, Affiliate Disclosure, Contact, Privacy, Terms).

## Status

- Build date: 2026-09-06. All prices verified against official vendor pages on that date (see `content/data/evidence-ledger.csv`).
- Honest gaps (owned): no hands-on testing program yet (reviews labeled research-based); numeric scores intentionally withheld until a real methodology exists; newsletter needs an ESP connected on the host; verticals 2–4 are roadmap only.
