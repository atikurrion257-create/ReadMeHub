# ReadMeHub — WordPress Installation & Launch Runbook

This kit deploys ReadMeHub as **WordPress + Hello Elementor (child theme) + Elementor + ACF**, with zero page-builder addon packs. Time estimate: **60–90 minutes**.

## 1. Requirements

| Component | Version | Notes |
|---|---|---|
| WordPress | 6.4+ | Any host with PHP 8.1+ / MySQL 8 or MariaDB |
| Hello Elementor | current | **Parent theme — required** |
| hello-elementor-child | 1.0.0 | `wordpress/themes/hello-elementor-child/` — zip and upload |
| Elementor | 3.x **Free** | No Pro required; no addon packs |
| Advanced Custom Fields | 6.x Free | Field groups are code-registered by the child theme |
| SEO plugin (recommended) | Yoast or RankMath | Indexables, sitemap, robots; the theme outputs schema independently and safely alongside |
| Caching | LiteSpeed Cache / WP Rocket / server-level | See §6 |

## 2. Install (ordered)

1. **Install & activate** Hello Elementor, then upload `hello-elementor-child` (Appearance → Themes → Add New → Upload). Activate the **child**.
2. **Install & activate** Elementor and ACF. On activation, the child theme registers all RMH content types (Reviews, Comparisons, Alternatives, Guides, Deals, Coupons, Products, Brands, Use Cases) and all ACF field groups (visible per post type).
3. **Settings → Permalinks**: set "Post name". Save twice (flushes the `/go/`, `/deals/` rewrites).
4. **Import the design kit**: Elementor → Tools → Import/Export Kit → Import → `wordpress/elementor-kit/readmehub-kit.json`. This installs the global colors/fonts (do not hardcode colors in widgets).
5. **Import templates**: Elementor → Templates → Saved Templates → Import → each file in `wordpress/elementor-templates/`:
   - `rmh-homepage.json`, `rmh-header.json`, `rmh-footer.json`, `rmh-single-review.json`, `rmh-single-comparison.json`, `rmh-archive-reviews.json`.
6. **Theme Builder assignments** (Elementor → Theme Builder):
   - Header template → **All site**; Footer template → **All site**.
   - Single Review template → Post Type: `rmh_review`.
   - Single Comparison template → Post Type: `rmh_comparison`.
   - Archive template → Post Type Archives: `rmh_review` (duplicate for `rmh_comparison` if desired).
7. **Import content**: Tools → Import → WordPress → `wordpress/content/readmehub-launch.xml` (map the author to your admin user; check "download & import file attachments" off — no attachments).
8. **Settings → Reading**: Front page = **Home** (imported placeholder). The homepage template renders it (next step).
9. **Homepage**: Pages → Home → Edit with Elementor → folder icon → My Templates → insert **"ReadMeHub — Homepage"**. Update once. All dynamic sections are shortcodes bound to ACF/queries (no manual duplication).
10. **Settings**: ReadMeHub (admin menu) → add curated **featured decisions** and **homepage picks** (relationship/repeater fields — pre-set to sensible launch defaults if left empty), and **only** add verified social profile URLs (they feed schema `sameAs`; empty until real).
11. **Menus**: Appearance → Menus → create "Primary" using the RMH sections (Reviews, Comparisons, Best Picks `/best/password-managers/`, Deals, Guides, Categories) → assign to Primary location. The header falls back to the default nav until a menu is assigned.

## 3. Post-import data verification (mandatory)

1. **Reviews** → confirm every plan row's *verified* flag, `Last verified` dates, and `Testing status = research_only`.
2. **Deals** → confirm statuses and `Last checked` dates. The template auto-degrades "Verified" badges past 30 days.
3. **Brand links**: reviews reference brands by `post_object`. If import reassigned IDs (rare), re-pick the brand on each review (Reviews → Edit → Brand field).
4. Visit each launch URL from the IA doc; confirm single H1, breadcrumbs, verdict box, tables render (the preview in `/preview` is the reference rendering).

## 4. Newsletter

The homepage newsletter form posts to the front page. Connect an ESP:
- Simplest: install the ESP's official plugin (Mailchimp/Brevo/ConvertKit) and replace the form HTML widget with the ESP block, keeping the `.rm-newsletter` wrapper classes for styling. The copy and fine-print stay as-is (they are honest).

## 5. Affiliate infrastructure

- Destinations live in **Brand → Affiliate URL** (ACF). Links render via `[rmh_affiliate brand="1password"]` → `/go/{brand}/` redirect (`nofollow sponsored`).
- Set Brand → Affiliate program status to **Active** only after signing up; the disclosure copy appears automatically above content on money pages.
- **Never** add a deal/coupon without: official source URL + check date. The ACF validation and QA notices enforce this.

## 6. Performance checklist (Phase 20 targets: LCP < 2.0s, CLS < 0.05, INP < 200ms)

- Enable caching plugin page cache + Gzip/Brotli; enable CSS/JS minify only (do **not** combine Elementor's CSS with the theme CSS).
- Enable Cloudflare/Apache `Cache-Control` for `assets/css|js|img`.
- The child theme already: system fonts (no webfont requests), no Google Fonts (Elementor filter), no emoji script, no jQuery Migrate, lazy-loaded images.
- If a brand webfont is adopted later: self-host, preload the single weight used for headings, `font-display: swap` + size-adjusted fallback.
- Run PageSpeed Insights mobile on `/`, `/reviews/1password/`, `/deals/`; record scores in the QA log.

## 7. SEO launch checklist

- SEO plugin: verify sitemap includes all RMH types (they're public post types; default on), robots.txt OK, and set the Organization name/logo.
- Search Console: verify property, submit sitemap.
- Confirm: unique titles (pattern from content model), canonicals, breadcrumb schema (child theme), Article schema (child theme), FAQ schema only where FAQ content exists (child theme reads the same ACF data the page renders).
- Redirections: none needed at launch (new domain) — add purchase-path redirects later via the SEO plugin.

## 8. Known limitations (honest)

- Elementor Free does not include Theme Builder **in very old versions**; with current free Elementor, Theme Builder header/footer require Elementor Pro OR use the provided header/footer as *sections* inserted via a hooks plugin. If Pro is not available: install the free "Header Footer & Blocks" style plugin is NOT allowed (addon-policy); instead, copy the header/footer HTML widgets into Hello Elementor's `header.php` override in the child theme (documented snippet in `includes/` — 15 minutes, still zero addons). Default assumption in this kit: Elementor Pro **or** the child-theme header override.
- Post-object IDs may shift on import (see §3.3).
- The static preview in `/preview` mirrors this build; pixel-parity is high but Elementor's own container CSS adds minor spacing differences — tune via the kit, not inline styles.
