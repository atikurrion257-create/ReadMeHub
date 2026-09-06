# Phases 5–6 — Information Architecture & ACF Data Model

## A. Site information architecture

URL architecture (WordPress permalinks; short, intent-bearing, no dates):

```
/                                        Home (decision platform)
/categories/                             Category index
/categories/password-managers/           Category hub (launch)
/best/password-managers/                 Pillar: Best Password Managers
/reviews/{slug}/                         Reviews (1password, bitwarden, nordpass, proton-pass)
/compare/{a-vs-b}/                       Comparisons (1password-vs-bitwarden)
/alternatives/{slug}/                    Alternatives (bitwarden-alternatives)
/use-cases/{slug}/                       Use cases (password-manager-for-families)
/guides/{slug}/                          Guides (free-vs-paid-password-managers, password-manager-vs-browser-autofill)
/brands/{slug}/                          Brand hubs (1password, bitwarden, nordpass, proton)
/deals/                                  Deals hub (verified statuses only)
/about/  /how-we-evaluate/  /editorial-policy/  /affiliate-disclosure/
/contact/  /privacy/  /terms/
```

Reserved growth slugs (no thin pages now, URLs guaranteed collision-free): `/best/web-hosting/`, `/compare/nordpass-vs-proton-pass/`, `/guides/glossary/`.

**Global navigation (header):** Reviews · Comparisons · Best Picks · Deals · Guides · Categories (desktop shows top-level; Categories opens the intent mega-panel — see below). **Footer:** Explore (all sections) / Company / Legal + newsletter.

**Intent navigation (the differentiator, homepage Section 10 + header mega-panel):** "I want to…" rail: *Choose new software · Compare two options · Find an alternative · Spend less (deals) · Learn before buying*. Every rail item routes to a real filtered view — no fake personalization.

**Content types (WordPress):** `rmh_review`, `rmh_comparison`, `rmh_alternative`, `rmh_deal`, `rmh_coupon`, `rmh_product`, `rmh_brand`, `rmh_usecase`, `rmh_guide`, plus `page` and `category` hubs implemented as pages assigned a "hub" template. Pillars live in `rmh_guide` with `pillar` flag, or as pages — decision: pillars are `rmh_guide` with `is_pillar` field so they inherit guide templates + appear in hub "Best picks" loops automatically.

**Taxonomies:** `rmh_segment` (Password Managers, Web Hosting, VPN, AI Tools…) shared by all RMH types; `rmh_intent` (best-x, review, comparison, alternatives, pricing, deal, informational) powering intent archives; standard `post_tag` avoided to prevent tag-thin pages.

## B. ACF field architecture (code-registered, versioned, no JSON sync drift)

Field groups are registered in PHP inside the child theme (`wordpress/themes/hello-elementor-child/includes/acf-field-groups.php`) via `acf_add_local_field_group()` — the portable, deployment-safe method (works without ACF's JSON directory sync, survives CI, and exposes every field to Elementor's dynamic tags).

Common group `ReadMeHub — Core` (applied to all RMH types):
`rmh_short_verdict` (textarea, 180) · `rmh_best_for` (repeater: audience + reason) · `rmh_not_ideal_for` (repeater) · `rmh_last_verified` (date_picker, required on money types) · `rmh_last_updated` (auto) · `rmh_official_url` (URL) · `rmh_affiliate_url` (URL + `rmh_affiliate_status`: none/pending/active — honest states) · `rmh_sources` (repeater: label + URL + type) · `rmh_methodology_note` (textarea, prefilled honesty template) · `rmh_show_rating` (true/false, default **false**) + `rmh_rating` (number, conditionally required, with documentation notice) · `rmh_disclosure_override` (wysiwyg).

| Content type | Dedicated fields (high level — full definitions in the PHP) |
|---|---|
| **Review** | `rmh_brand` (post_object → rmh_brand) · `rmh_product` · plans repeater (`plan_name, plan_price, plan_billing, plan_price_verified` bool, `plan_highlights`, `plan_order`) · pros/cons repeaters · features analysis repeater (`feature, assessment, score_note`) · `rmh_testing_status` select: `research_only` (default) / `hands_on` + `rmh_testing_evidence` (required if hands_on) · related comparisons/alternatives (relationship) · FAQ repeater |
| **Comparison** | `rmh_side_a` / `rmh_side_b` (post_object → review or brand) · `rmh_verdict_a_for` / `rmh_verdict_b_for` · choose-if repeaters (A/B) · matrix repeater (`dimension, a_value, b_value, a_edge` bool, `b_edge` bool, `interpretation`) · `rmh_tiebreaker` (textarea) · pricing context repeater |
| **Alternative** | `rmh_subject` (what users are replacing) · churn reasons repeater (`reason, evidence_note`) · alternatives repeater (`alternative_post, best_for_reason, budget_pick` bool…) |
| **Deal** | `rmh_deal_brand` · `rmh_deal_type` (promo/first-year/bundle/trial/coupon) · `rmh_offer_text` · `rmh_terms` · `rmh_valid_from/to` · `rmh_verification_status` (verified/unverified/expired — **required, drives badge**) · `rmh_last_checked` (date) · `rmh_deal_url` (official) · `rmh_coupon_code` (text, empty = no code; UI enforces "codes only from official sources") · `rmh_region` (multi: US/CA/UK/AU/Global) · `rmh_currency` |
| **Coupon** | Subset of Deal with `rmh_coupon_code` required + source URL required |
| **Product** | Name/brand/type · price range (min/max + billing + verified) · availability · key specs repeater · use cases · related review |
| **Brand** | Official site · founding year (verified) · products relationship · strengths/weaknesses · jurisdiction · audit-history note · affiliate program status (`public_program`/`none_found`/`unverified`) |
| **Use case** | Audience · problem · requirements checklist · recommended solutions repeater (ranked, with reasons) · budget guidance |
| **Guide** | `rmh_is_pillar` · reading level · related commercial pages relationship (drives internal linking module) · decision-framework repeater (situation → recommendation) |

**Validation rules enforced in PHP:** money pages require `rmh_last_verified`; `hands_on` testing requires evidence; active deals require `rmh_last_checked` within 45 days (admin notice, not a hard block, to avoid data loss); `rmh_show_rating` true requires methodology note ≥ 200 chars. This makes fabrication *structurally harder*.

## C. Elementor ↔ ACF binding

- Layouts are **Elementor** (containers/sections) with dynamic tags bound to ACF fields for repeated data; loops use Elementor Loop Grid over the RMH content types where the free version supports it, and the child theme's purpose-built shortcodes (e.g., `[rmh_price_table]`, `[rmh_verdict_box]`, `[rmh_deal_card]`) render the deeply structured components (comparison matrices, verified-price tables, status badges) — the established Elementor+ACF pattern that keeps the free Elementor tier sufficient with **no addon packs**.
- Global kit (colors/fonts) ships as `wordpress/elementor-kit/readmehub-kit.json`; page templates ship as importable JSON under `wordpress/elementor-templates/` (generated by `tools/build_elementor_templates.py` for validity).
