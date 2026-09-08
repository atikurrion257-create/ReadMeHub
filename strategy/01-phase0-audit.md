# Phase 0 — Audit of the Existing ReadMeHub Asset

Audit date: **2026-09-06**. Auditor: ReadMeHub build team.

## What actually exists in this repository

The repository is **not** a WordPress installation. It contains exactly two tracked files:

| Item | Finding |
|---|---|
| `README.md` | One line: `# ReadMeHub`. No documentation. |
| `index.html` | A single-file static homepage export (≈114 KB, 1,853 lines) labelled "Export from DesignArena (website)" in git history. |

The export is preserved, unmodified, at [`legacy/designarena-export/index.html`](../legacy/designarena-export/index.html). Nothing was deleted; the file was moved with `git mv` so history remains intact.

## Detailed findings on the legacy `index.html`

### Technology findings

| # | Finding | Severity | Disposition |
|---|---|---|---|
| L1 | Single static HTML file, not WordPress. Violates the non-negotiable stack (WordPress + Hello Elementor + Elementor + ACF). | Blocker | Replace with the WordPress implementation kit in this repo + documented deployment path. |
| L2 | Tailwind CSS loaded via `cdn.tailwindcss.com` — a dev-only runtime compiler (~110 KB gzipped JS, render-blocking, console warning against production use). | High | Forbidden in the new build. Design system moves to one lightweight, hand-written CSS file shipped by the Hello Elementor child theme. |
| L3 | Lucide icons loaded from `unpkg.com/lucide@latest` — unpinned third-party runtime dependency. | High | Removed. Icons become inline SVG (zero requests) or an icon font is not used at all. |
| L4 | Google Fonts loaded render-blocking from `fonts.googleapis.com`. | Medium | Replaced by a performance-first system font stack (see design system). Self-hosted font files are an optional, documented enhancement. |
| L5 | All internal links are `#` anchors (no real pages exist). Footer/nav links to Privacy, Terms, reviews, deals are dead. | High | Real page set built in this project (preview + WordPress WXR content). |
| L6 | Single-page site: no sitemap, no robots.txt, no canonical strategy, no permalink architecture, no menus, no media library, no plugins, no SEO configuration, no analytics, no newsletter infrastructure, no affiliate infrastructure. | Blocker | Full architecture delivered in this project; hosting-level items documented in the install runbook. |

### Honesty / compliance findings (the important ones)

| # | Finding | Severity |
|---|---|---|
| F1 | **Fabricated review schema.** JSON-LD declares `ratingValue: "4.9"`, `reviewCount: "1840"` for a "Notion AI Enterprise Workspace" product. No such review, testing, or rating exists anywhere in the repo. Publishing this is a policy violation (Google structured-data spam risk) and an editorial-integrity violation. | Blocker |
| F2 | **Fabricated pricing/offer schema.** `Offer` with `price: "10.00"` for the same non-existent product. | Blocker |
| F3 | **Fabricated social proof.** Schema claims `sameAs` Twitter/LinkedIn company profiles for ReadMeHub that were not verified to exist. | High |
| F4 | **Unverifiable editorial claims** in visible copy (e.g., "ratings reflect genuine testing metrics" while no methodology, tester, or test exists). | Blocker |
| F5 | Hotlinked Unsplash imagery as "product screenshots" — not legitimate product imagery, no alt-text strategy. | Medium |

**Disposition:** all fabricated data is removed. The new build implements a strict evidence ledger: every price, rating, claim, and date is sourced (official vendor pages or multiple corroborating sources), stored in `content/data/evidence-ledger.csv`, and rendered with a visible "Last verified" date. Where a fact could not be verified, the page says so explicitly.

## What is worth keeping from the legacy export

- **Brand name and positioning territory:** "ReadMeHub — research before you buy" decision-platform framing, B2B SaaS / AI / hosting editorial focus.
- **Palette direction:** deep navy + a single warm accent. Refined (not copied) in the new design system: navy `#0F2A4A`-family becomes the ReadMeHub "ink" scale; orange is demoted from decorative to CTA-only.
- **Component inventory as a wishlist:** hero with search, category cards, review cards, comparison table, FAQ, disclosure strip — all rebuilt to a higher standard with honest data.

## Environment audit (this sandbox)

| Capability | Status | Consequence |
|---|---|---|
| PHP runtime | **Not installed** | WordPress cannot execute here. |
| MySQL / MariaDB / SQLite CLI | **Not installed** | No database layer available. |
| wp-cli | **Not installed** | — |
| Outbound network from the sandbox shell (curl to wordpress.org, github.com) | **Blocked** | WordPress core, Hello Elementor, Elementor, and ACF cannot be downloaded into the sandbox. |
| Node.js 22 / Python 3.11 | Available | Used for build tooling (content pipeline, WXR generator, template generator, static preview renderer). |

**Documented limitation (per the execution rule):** a *live* WordPress+Elementor+ACF site cannot run inside this sandbox because PHP and a database cannot be installed and vendor packages cannot be downloaded. Nothing about this changes the delivered implementation: this repository ships the complete, production-ready WordPress implementation — Hello Elementor **child theme**, ACF **field groups registered in PHP**, importable **Elementor** templates/kit, **WXR content** with ACF postmeta, schema, performance and QA tooling — plus a faithful **static preview** rendered from the exact same content model and CSS so the design and content can be reviewed in this environment. The one manual step remaining is running the WordPress installer on a PHP host (see `wordpress/INSTALL.md`).

## Audit conclusions

1. Nothing in the legacy export is production-usable; the salvageable assets are brand direction and component intent.
2. The legacy export must never be published: it contains fabricated structured data (F1–F3).
3. The project proceeds with: strategy layer → content model → WordPress kit → preview → QA, all in this repository.
