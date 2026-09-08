# Phases 15–16, 22, 28–29 — Internal Linking, Schema, SEO & Entity Architecture

## A. Internal linking graph (deliberate, not automatic)

Hub-and-spoke with intent cross-links. Rules:

1. Every money page links: **parent category hub** (breadcrumb + inline), **2 sibling pages** of a *different* intent type (review↔comparison↔alternatives), **1 use case**, **1 guide**, and the **deals hub** where deal intent exists.
2. Every guide links: parent category, the pillar, and ≤3 contextual commercial pages (never a link farm).
3. Category hub links: pillar, all reviews, all comparisons, alternatives, use case, deals hub, guides — the hub is the graph's center for its segment.
4. Anchor text = the target's primary intent phrase ("1Password vs Bitwarden comparison" — never "click here", never naked URLs).
5. Budget: ≤120 internal links on hubs (sectioned), ≤25 on articles. No orphan pages (QA check in `tools/qa_checks.py` verifies every launch page receives ≥1 internal link).

Implementation: ACF `relationship` fields power "Related" modules dynamically; the child theme additionally auto-renders breadcrumb + "Part of the Password Managers hub" contextual links so the graph survives editorial drift.

## B. Schema architecture (JSON-LD, child theme `includes/schema.php`)

Global `@graph` on every page: `Organization` (name, url, logo, **no unverified sameAs**) + `WebSite` (with `potentialAction` SearchAction) + `BreadcrumbList` (visible breadcrumbs mirrored) + `WebPage`.

Per type, **only what is visible on the page**:
- Reviews/Guides → `Article` (headline, datePublished, dateModified, author `Person` = real editor entity "ReadMeHub Editorial Team" with honest description, publisher = Organization). `Review` + `itemReviewed` only when the review displays a verdict and *no* `reviewRating` until genuine scoring exists (Phase 16 rule). When ratings launch, `AggregateRating` only with real counts.
- Comparison → `Article` + `about` both entities, `ItemList` of compared items (visible order).
- Pillar/Best-X → `ItemList` (visible ranking order) + `Article`.
- Product/brand pricing tables → **no `Offer` schema** unless an exact verified price with currency + URL is on-page (Bitwarden/1Password qualify; NordPass range does not → no Offer markup for ranges; honesty enforced in code: the schema builder reads the same verified-price fields and skips unverified rows).
- FAQ → `FAQPage` only on pages whose FAQ block is genuinely on-page (renderer adds markup from the same data source, so it can never diverge).
- Deals → `Offer` only for `verified` deals with a real URL; `Expires` respected.

**Prohibited (learned from the legacy export):** fabricated `aggregateRating`, invented `reviewCount`, offers without verified prices, social `sameAs` without verified profiles.

## C. On-page SEO enforcement (child theme + QA script)

- Unique `<title>` pattern: `{Primary Keyword} — ReadMeHub` (≤60 chars, QA-checked).
- Meta description: from `rmh_short_verdict` (unique, ≤155, QA-checked for presence).
- Exactly one `<h1>`; heading ladder h2→h3 (QA-checked by `tools/qa_checks.py`).
- Canonical self-referencing on all pages (Yoast/RankMath optional — the child theme outputs minimal meta natively so the kit works with or without an SEO plugin; runbook recommends leaving indexables to one plugin).
- `robots.txt` + XML sitemap: produced by the SEO plugin on the live host (documented); sandbox preview ships a static `robots.txt` disallowing nothing + `sitemap.xml` for preview completeness.
- Image rules: dimensions set, `loading="lazy"` below fold, SVG preferred for brand marks; no hotlinked stock as "screenshots" (legacy sin).

## D. Search experience (Phase 28)

Launch: native WordPress search with template that **groups results by content type** (Reviews / Comparisons / Guides / Deals / Brands) — implemented via one template + `post_type` bucketing; preview implements the same grouping client-side over the content index. Growth: SearchWP or similar (documented, optional).

## E. Entity architecture (knowledge graph)

```
ReadMeHub (Organization)
   └── publishes → Editorial pages (Review/Comparison/…)
Segment (Password Managers)
   ├── hub → /categories/password-managers/
   ├── pillar → /best/password-managers/
   ├── contains → Brands: 1Password, Bitwarden, NordPass, Proton
   │        └── each brand → products → review(s) → comparisons → alternatives → deals → coupon states
   └── use cases → families …
```

Every entity page states its identity explicitly (name, parent company, category, official site) and links its first-degree relations, so engines resolve the graph consistently. Cross-vertical entities (Nord: NordVPN↔NordPass bundle context) get a one-line "same parent company" disclosure — honest and entity-rich.

## F. Analytics/affiliate infrastructure (documented, not fabricated)

Runbook covers: GA4 or privacy-friendly analytics choice, affiliate link management pattern (cloaking via `/go/{brand}/` redirects implemented in the child theme with `nofollow sponsored`, target URLs stored in ACF so links stay auditable), disclosure copy auto-prepended above the first outbound affiliate link.
