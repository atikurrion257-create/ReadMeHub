# Phases 17–19 — ReadMeHub Design System (Elementor globals + custom CSS)

Design language: **premium editorial research platform** — information-dense but scannable, calm surfaces, one warm accent used *only* for decision actions, badges that mean something. Anti-targets: coupon-spam visual noise, Elementor-demo look, Amazon-style card grids, decorative gradients.

## A. Design tokens (implemented as CSS custom properties in `assets/css/readmehub.css` and mirrored into the Elementor kit)

```
--rmh-ink:        #14213D   (headings — deep navy, trustworthy)
--rmh-ink-soft:   #3D4C66   (body on light)
--rmh-muted:      #5E6B81   (metadata)
--rmh-line:       #E3E8F0   (borders)
--rmh-paper:      #FFFFFF
--rmh-canvas:     #F5F7FB   (page background)
--rmh-surface:    #FBFCFE   (card background)
--rmh-brand:      #1D4FD8   (links, active states — "decision blue")
--rmh-brand-deep: #163B9E
--rmh-cta:        #E8590C   (primary decision action ONLY)
--rmh-cta-hover:  #C74A08
--rmh-verified:   #0E7A4A   (verified badge green)
--rmh-warn:       #B45309   (unverified/expired amber)
--rmh-flag:       #B42318   (corrections/notices red, used sparingly)
```

Rationale: navy/ink carries authority (retained direction from the legacy export), blue carries interaction clarity, orange is reserved exclusively for primary decision CTAs so color = meaning. Verified-green is a *trust instrument*, not decoration.

## B. Typography (performance-first, no webfonts at launch)

- Stack: `ui-sans-serif, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` (system UI fonts = zero render-blocking, native quality).
- Type scale (desktop → mobile): Display 44/40 clamp→34, H1 40→30, H2 28→24, H3 21→19, body 17→16, small 14, overline 12 uppercase +0.08em tracking.
- Weights: 700/800 headings with -0.015em tracking; 400/560 body; 600 UI labels.
- Long-form measure: 68ch max; line-height 1.65.

## C. Spacing & layout

- Section rhythm: 64px desktop / 44px mobile. Container: 1200px max, 24px gutters.
- Cards: 14px radius, 1px `--rmh-line` border, shadow only on hover or on *elevated* verdict/surface components (`0 10px 30px rgba(20,33,61,.07)`).
- Grids: cards 3-col ≥1024, 2-col ≥640, 1-col below; comparison tables sticky first column on mobile; plan tables max 3 plan columns visible.

## D. Component inventory (all shipped in CSS + as Elementor structures/shortcodes)

Header (sticky, search, intent mega-panel) · Hero + search · Decision Finder (2-step, no fake personalization — routes to real filtered views) · Featured decision cards · Use-case picks grid · Comparison card (verdict A/B split) · Review card (verdict-first, no fake stars) · Updated-item row (freshness strip with real dates) · Category card · Intent rail · Deal card (status badges: **Verified / Official / Unverified / Expired** — distinct colors, always dated) · Coupon card (code copy interaction only when a code exists) · Price table (verified-price pattern: price + billing term + last-verified) · Pros/cons split panel · Verdict box (answer architecture) · Choose-if panel (A/B) · Methodology strip · Trust card row · Author/edition card · Newsletter band · FAQ accordion (native `<details>`, zero JS) · Breadcrumbs · Footer (5-zone).

**Badges are semantic, never decorative:** `Verified · <date>` (green), `Official source` (blue outline), `Unverified` (amber), `Expired` (gray). If there's no verified offer, the card says so — that honesty *is* the design feature.

## E. Accessibility & interaction baseline

WCAG 2.2 AA targets: all text ≥4.5:1 (tokens above pass on assigned surfaces), focus-visible rings (2px `--rmh-brand`, offset 2), tap targets ≥44px, `<details>`/`<button>` semantics for all interactive components, tables with `<th scope>`, captions, skip-link, `prefers-reduced-motion` respected (the only animation is 150ms ease-out on hover/focus transforms).

## F. Elementor-specific rules

- Global colors/fonts from the kit JSON only; no per-widget hardcoded colors.
- Containers (flex) with class-based styling (`rmh-card`, `rmh-verdict`, …) — avoid nested-section bloat; DOM budget ≤ ~1,500 nodes on the homepage.
- No sliders, no video heroes, no parallax. One subtle hero graphic (SVG, inline).
- Motion budget: hover lifts + focus rings only.

## G. Mobile-first behavior (Phase 19)

Header collapses to a single row: logo + search icon + menu button; intent panel becomes a full-screen sheet with the same 5 intents. Decision Finder stacks vertically with sticky "show results". Deal/coupon cards prioritize status badge + expiration above CTA. Comparison tables get horizontal scroll affordance (fade + "swipe" hint) with sticky label column. Newsletter band becomes a single-column stack with full-width input + button (44px+).
