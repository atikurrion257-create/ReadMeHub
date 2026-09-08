# TeamRion Elementor Kit — 4.2.x Architecture, Import/Export & Schema Audit

**Audit scope:** `elementor-export/`, `teamrion-elementor-template-kit.zip`, `build-elementor-export.js`, `ELEMENTOR-DEPLOYMENT-GUIDE.md`
**Reference implementation checked:** Elementor 4.4.x source (`includes/template-library/sources/local.php`, `includes/template-library/sources/base.php`, `core/base/document.php`, `app/modules/import-export/processes/export.php`, `app/modules/import-export/processes/import.php`, `app/modules/import-export/runners/import/templates.php`, `app/modules/import-export/runners/import/site-settings.php`).

> **Remediation status (2026-09-08):** the P0 import/package, self-containment, manifest, site-settings and document-type issues identified below have been fixed in `build-elementor-export.js` and regenerated into the kit. The P1/P2 "native widget rebuild" items remain a larger redesign and are listed as **Open**.

---

## Executive Verdict

| Area | Verdict | Severity |
| :-- | :-- | :-- |
| Kit ZIP import (`Elementor → Tools → Import/Export Kit`) | **Fixed** — correct `manifest.json` v2.0 + `site-settings.json` + `templates/<id>.json` | Resolved |
| Template `settings` vs `page_settings` for Kit importer | **Fixed** — both keys emitted | Resolved |
| WordPress visual fidelity / Tailwind dependency | **Fixed** — Tailwind utilities compiled into `teamrion-custom-code.css`, no CDN runtime | Resolved |
| Theme Builder document types | **Fixed** — Header/Footer remain `header`/`footer`; service & case-study now `single` | Resolved |
| Site settings import | **Fixed** — `site-settings.json` is at Kit root and referenced by manifest | Resolved |
| "Native Elementor templates" claim | **Open** — templates are still single HTML widgets, not native widget trees | Critical (redesign) |
| Interactive lead-gen/quiz/calculator | **Open** — static markup only; JS not shipped | High (redesign) |
| Individual `.json` import (`Templates → Saved Templates`) | **Fixed** — now includes `page_settings` and valid 8-char hex IDs | Resolved |

---

## 1. The ZIP is not an Elementor Kit (Critical) — FIXED

> **Fix implemented:** `build-elementor-export.js` now produces the official Kit layout `manifest.json` + `site-settings.json` + `templates/<id>.json`, with a v2.0 manifest and `doc_type` in each template entry. Standalone `.json` files remain available for `Templates → Saved Templates` import.

The official Elementor Website Kit layout is:

```
manifest.json
site-settings.json
templates/<template-id>.json
```

Elementor's importer reads:

- `manifest.json` via `Utils::read_json_file( $extracted_directory_path . 'manifest' )` (`import.php:612`)
- `site-settings.json` via `Utils::read_json_file( $extracted_directory_path . 'site-settings' )` (`import.php:653`)
- template files via `$data['extracted_directory_path'] . 'templates/' . $id` (`runners/import/templates.php:29`)

The shipped ZIP has **none of that**. Actual archive layout:

```
manifest.json
teamrion-about-page.json
teamrion-custom-code.css
teamrion-faq-page.json
teamrion-footer-template.json
teamrion-growth-diagnostic-page.json
teamrion-header-template.json
teamrion-homepage.json
teamrion-pricing-page.json
teamrion-single-case-study-template.json
teamrion-single-service-template.json
teamrion-site-settings.json
```

Failures caused by this layout:

1. There is no `templates/` directory, so the Templates runner finds zero files.
2. Site settings are named `teamrion-site-settings.json`, not `site-settings.json`, so the Site-Settings runner reads an empty `[]`.
3. `manifest.json` does not match the Kit manifest schema.

### Manifest incompatibility

Official Kit export writes a top-level manifest with a numeric-keyed `templates` map where each entry is an object, produced by `Document::get_export_summary()`:

```json
{
  "version": "2.0",
  "elementor_version": "4.2.4",
  "templates": {
    "64821": { "title": "TeamRion Header", "doc_type": "header", "thumbnail": "" }
  },
  "site-settings": [ ... ]
}
```

Shipped manifest:

```json
{
  "name": "TeamRion Growth Engine Kit",
  "version": "1.0.0",
  "elementor_version": "3.20.0",
  "templates": [
    { "title": "...", "type": "page", "file": "teamrion-homepage.json" }
  ]
}
```

Importer consequences (`runners/import/templates.php:29`, `:48`):

- `foreach ( $templates as $id => $template_settings )` treats `$id` as `0, 1, 2…`, and reads `templates/0`, `templates/1`, etc.
- `$template_settings['doc_type']` is missing, so `documents->create()` would receive an empty document type.
- Site Settings expects `$data['site_settings']['settings']`; the kit never knows about `teamrion-site-settings.json`.

**Fix:** regenerate the ZIP using a real structured manifest + `templates/` + `site-settings.json`, and set `version: "2.0"`.

---

## 2. There are no native Elementor elements (Critical)

I recursively walked every exported template. Every template is:

```
1 × Container
└── 1 × HTML widget (widgetType: "html")
    └── an entire page encoded as one giant HTML string
```

| Template | Document type | Containers | Native widgets | HTML widgets |
| :-- | --: | --: | --: | --: |
| homepage | page | 1 | 0 | 1 |
| header | header | 1 | 0 | 1 |
| footer | footer | 1 | 0 | 1 |
| pricing | page | 1 | 0 | 1 |
| about | page | 1 | 0 | 1 |
| faq | page | 1 | 0 | 1 |
| growth-diagnostic | page | 1 | 0 | 1 |
| single-service | page | 1 | 0 | 1 |
| single-case-study | page | 1 | 0 | 1 |

**Total: 9 template files / 9 HTML widgets / 0 Heading, Button, Image, Text-Editor, Icon, Form, Icon-List, or Container widgets.**

The artifact therefore does **not** satisfy the "complete 34 native Elementor templates" description. It is a static-site HTML snapshot exported into a single HTML widget.

**Architectural impact:**
- No page editing in Elementor controls — every heading, button, padding, color, link is a raw string inside one HTML control.
- No dynamic tags, no Repeaters, no Form, no native responsive controls.
- Global/Theme Builder extensibility is essentially nil.

**Fix:** rebuild the kit with real Container → Inner-Container → Heading/Text/Button/Icon-List/Image/Form widgets. For a 34-template claim, that also means generating 34 distinct template documents.

---

## 3. WordPress visual fidelity depends on Tailwind (Critical) — FIXED

> **Fix implemented:** the exporter now compiles all utility classes used by the templates via Tailwind 3.4 into `elementor-export/teamrion-custom-code.css`, and every template embeds that compiled CSS in its own `<style>` block. `cdn.tailwindcss.com` is no longer referenced.

`index.html` loads Tailwind from the CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

The exported HTML relies on non-compiled utility classes such as:

```
flex, grid, items-center, justify-between, max-w-7xl, w-full,
py-20, px-4, text-xs, text-xl, font-bold, font-mono, rounded-xl,
bg-[#e0e5ec], bg-[#f0f2f5], text-[#2d3436], border-[#d1d9e6],
md:grid-cols-4, sm:px-6, lg:px-8, gap-6, shadow-recessed, ...
```

`elementor-export/teamrion-custom-code.css` (and `src/styles/theme.css`) define only branding/component classes (`.shadow-card`, `.bolted-card`, `.btn-physical-primary`, `.screw-head`, etc.). It contains **no** Tailwind utility definitions. I verified no `.flex`, `.items-center`, `.max-w-7xl`, `.text-xs`, `.bg-[#…]`, etc., definitions exist.

**Result:** when imported into WordPress, no Tailwind CSS is loaded, and the layout collapses (no flex/grid, arbitrary colors, spacing, or responsive breakpoints).

**Fix options (preferred order):**
1. Rebuild as native Elementor containers and widgets — no Tailwind dependency at all.
2. If the HTML-widget approach must remain, compile the full page CSS into a production bundle at build time and enqueue it with `wp_enqueue_style`/Elementor Custom Code. Do **not** rely on `cdn.tailwindcss.com` in production.

---

## 4. Theme Builder document types are wrong (High) — FIXED

> **Fix implemented:** `teamrion-single-service-template.json` and `teamrion-single-case-study-template.json` now use `type: "single"` / `doc_type: "single"` (Pro Theme Builder singular), while Header/Footer remain `header` / `footer`. Each also carries the correct `content_wrapper_html_tag` page setting.

- Header and Footer templates correctly use `type: "header"` / `type: "footer"`, but these require **Elementor Pro** (Theme Builder).
- "Single Service" and "Single Case Study" are typed as `type: "page"`.

That means they import as ordinary standalone pages, not as Theme Builder Single templates. They will never apply automatically to services/case-study CPTs.

For a real Theme Builder single template, the document type should be a singular template (`single`) and its HTML must be driven by **dynamic tags** (Post Title, Featured Image, Post Content, ACF fields, etc.).

**Fix:** change `doc_type`/`type` for these two to the Pro singular document type and replace hard-coded content with dynamic-tag-driven widgets/containers.

---

## 5. Single templates are static, not dynamic (High)

`teamrion-single-service-template.json` is a snapshot of one service:

- Length ~23 KB of static HTML.
- Contains the static GEO/AI service content with `href="#/ai-search-audit"`.
- Uses no Elementor dynamic tags.

`teamrion-single-case-study-template.json` is the same problem — a hard-coded "SaaS growth pipeline" case study.

**Impact:** every service/case study would render the same copy. This is not a reusable Theme Builder single template.

**Fix:** model the service and case-study templates as genuine single templates using:
- Dynamic Heading for post title
- Dynamic Image for featured image
- Post Content / ACF fields for body
- Dynamic buttons/links for CTA

---

## 6. Interactive functionality is not exported (High)

The source site is an SPA (`routes.js`, `app.js`, `core.js`, `services.js`, `leadgen.js`, `proof.js`, `industries.js`, `content.js`, `compare.js`, `legal.js`) with interactive components.

The build script only embeds the **rendered HTML string** in each `HTML` widget; JavaScript is never included.

| Feature | Exported HTML | JS in WordPress |
| :-- | :-- | :-- |
| Growth Console channel switch, AI citation meter, CRT scanlines | Static markup | ❌ |
| ROI Calculator | `<input>` fields, no logic | ❌ |
| Growth Diagnostic quiz | `<button>`/`<input>`/`<form>` markup, no logic | ❌ |
| Pricing scope switcher | Static buttons | ❌ |
| Mobile navigation | Static header | ❌ |
| Case-study/service functionality | Static links | ❌ |

**Impact:** the "Growth Diagnostic Quiz", ROI calculator, lead-gen, and interactive proof components are inert in WordPress.

**Fix:** extract interactive logic into front-end JS that is registered/enqueued only on the relevant pages (e.g., `growth-diagnostic.js`, `roi-calculator.js`), and wire form submission to a WP handler/CRM endpoint instead of the SPA router.

---

## 7. Header/Footer links and assets assume the static site (High)

The exported header contains a static nav:

```
href="/", "/services", "/pricing", "/case-studies", "/about", "/growth-diagnostic"
```

These are static-site route slugs. In WordPress they 404 unless matching pages exist, and they are not using `home_url`/Elementor dynamic URL tags.

Similarly, exported pages contain `href="#/contact"`, `href="#/ai-search-audit"`, etc., which do nothing in WordPress.

The CSS/JS asset references inside HTML output (`src/styles/theme.css`, `src/scripts/...`) would also be empty paths in WordPress unless the WP site actually hosts them at those URLs.

**Fix:** map all internal links to real WordPress URL slugs (or Elementor dynamic `Post URL`/`Internal URL` tags), import/upload branding assets as WP media, and build a mobile menu widget for Theme Builder.

---

## 8. Element `id` values are not Elementor-shaped (Minor/Medium) — FIXED

> **Fix implemented:** element and widget IDs are now 8-char hex strings (`e.g. a1b2c3d4`), matching Elementor's `generate_random_string()` family of IDs.

Elementor IDs are conventionally hex strings (e.g. `6af611eb`); the shipper uses `tr_i4k751n`, `tr_widget_ua1kj69`, etc. Elementor 4.x does not strictly validate a regex on import in the code paths I inspected, so this likely imports, but it is a schema deviation and can confuse editor state/history.

**Fix:** generate `7–8` char hex IDs (e.g., `Utils::generate_random_string()` output form) and only use them once per document.

---

## 9. Site Settings file (partially valid, but not wired into the kit) — FIXED

> **Fix implemented:** the Kit now contains `site-settings.json` (as well as `teamrion-site-settings.json`) and the manifest references `site-settings`, so the official Site-Settings runner picks it up. `settings` (Kit import) and `page_settings` (standalone import) are both emitted in every template.

`teamrion-site-settings.json` is close to valid Kit settings:

```json
{
  "settings": {
    "system_colors": [ ... 8 colors with `_id` ... ],
    "system_typography": [ ... 3 typography entries ... ]
  }
}
```

`system_colors` and `system_typography` are correct Kit controls. Issues:

- It is not named `site-settings.json`, so the official importer never reads it.
- The Kit manifest doesn't include the `site-settings` entry, so the importer won't know to import it.
- It omits the rest of the Kit settings normally carried by an export (e.g., `custom_colors` / `custom_typography`, `default_generic_fonts`, `space_between_widgets`, page/layout settings).

**Fix:** rename to `site-settings.json`, add `"site-settings": [...]` to the manifest, and decide whether system or custom tokens should be used for client-install variables.

---

## 10. The manifest version field is wrong — FIXED

> **Fix implemented:** manifest `version` is now `"2.0"` (Elementor Kit `FORMAT_VERSION`) and `elementor_version` is `"4.2.4"`.

- Shipped: `"version": "1.0.0"` (a product version, not a Kit format version).
- Official Kit export uses `Module::FORMAT_VERSION` (`app/modules/import-export/module.php:27`), currently `"2.0"`.
- `elementor_version` should reflect the creating environment (`4.2.4` per the target), not `"3.20.0"`.

---

## Recommended remediation order

1. **P0 — Real Kit package.** ✅ Fixed in this branch.
2. **P0 — Native rebuild.** ⬜ Open — convert the single HTML-widget snapshots into native Elementor Containers and widgets (Heading, Text, Button, Image, Icon-List, Form, etc.). This is the only path to a genuinely editable 34-template kit.
3. **P0 — Remove Tailwind runtime dependency.** ✅ Fixed — utilities compiled and embedded per template.
4. **P1 — Theme Builder correctness.** ✅ Type fix done; ⬜ static snapshots remain — make Single Service and Single Case Study dynamic with dynamic tags.
5. **P1 — Wire interactions.** ⬜ Open — enqueue per-page JS for the diagnostic, calculator, console, form handles, and mobile menu; point forms at WP/CRM endpoints.
6. **P2 — Cleanup.** ✅ Element IDs, manifest metadata, `settings`/`page_settings` fixed; ⬜ internal links still point to static-site slugs and should be mapped to real WordPress URLs.

---

## Evidence files

- `build-elementor-export.js` — source of the single-HTML-widget export (lines in `createElementorTemplate`).
- `elementor-export/manifest.json` — non-Kit manifest.
- `elementor-export/teamrion-{homepage,header,footer,pricing,about,faq,growth-diagnostic,single-service,single-case-study}-*.json` — 9 documents, each 1 HTML widget.
- `index.html` (`tailwindcdn.com`, SPA script graph).
- `src/styles/theme.css` / `teamrion-custom-code.css` — component CSS only, no Tailwind utilities.
