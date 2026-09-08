#!/usr/bin/env python3
"""
Generate importable Elementor files (Phase 17/35/37):

  wordpress/elementor-kit/readmehub-kit.json      — Site Kit: global colors + fonts
  wordpress/elementor-templates/*.json            — importable templates:
      rmh-homepage.json           (page)      decision-platform homepage
      rmh-header.json             (section)   Theme Builder header
      rmh-footer.json             (section)   Theme Builder footer
      rmh-single-review.json      (single)    Theme Builder single template
      rmh-single-comparison.json  (single)    Theme Builder single template
      rmh-archive-reviews.json    (archive)   Theme Builder archive template

Design rules honored: kit globals only (no per-widget hardcoding), shortcode
widgets for ACF-structured components, HTML widgets only for static editorial
blocks. No addon-pack widgets are used — Elementor Free sufficient.
"""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_KIT = ROOT / "wordpress/elementor-kit"
OUT_TPL = ROOT / "wordpress/elementor-templates"
site = json.loads((ROOT / "content/site.json").read_text(encoding="utf-8"))

_id = iter(lambda: None, None)  # placeholder to appease linters; real ids below
import itertools
_counter = itertools.count(1000)
def uid() -> str:
    return f"rmh{next(_counter):08x}"

def widget(wtype: str, settings: dict) -> dict:
    return {"id": uid(), "elType": "widget", "widgetType": wtype, "settings": settings, "elements": []}

def html_widget(html: str) -> dict:
    return widget("html", {"html": html})

def shortcode_widget(sc: str) -> dict:
    return widget("shortcode", {"shortcode": sc})

def column(size: int, elements: list, extra: dict | None = None) -> dict:
    s = {"_column_size": size, "_inline_size": None}
    if extra:
        s.update(extra)
    return {"id": uid(), "elType": "column", "settings": s, "elements": elements, "isInner": False}

def section(elements: list, settings: dict | None = None, inner: bool = False) -> dict:
    st = {"gap": "extended", "structure": "20" if len(elements) == 2 else "10"}
    if settings:
        st.update(settings)
    return {"id": uid(), "elType": "section", "settings": st, "elements": elements, "isInner": inner}

def container(elements: list, settings: dict | None = None) -> dict:
    st = {"content_width": "boxed", "flex_direction": "column"}
    if settings:
        st.update(settings)
    return {"id": uid(), "elType": "container", "settings": st, "elements": elements, "isInner": False}

def heading(title: str, size: str = "h2", align: str = "left") -> dict:
    return widget("heading", {"title": title, "header_size": size, "align": align})

def text(html: str) -> dict:
    return widget("text-editor", {"editor": f"<p>{html}</p>"})

def button(label: str, link: str, style: str = "rm-btn rm-btn--cta") -> dict:
    return widget("button", {"text": label, "link": {"url": link}, "align": "left", "_css_classes": style})

# ---------------------------------------------------------------- kit
kit = {
    "version": "0.4",
    "title": "ReadMeHub Design System Kit",
    "type": "kit",
    "content": [],
    "site_settings": {
        "template": "hello-elementor",
        "system_colors": [
            {"_id": "primary", "title": "Brand / Decision Blue", "color": "#1D4FD8"},
            {"_id": "secondary", "title": "Ink (headings)", "color": "#14213D"},
            {"_id": "text", "title": "Body text", "color": "#3D4C66"},
            {"_id": "accent", "title": "Decision CTA (use sparingly)", "color": "#E8590C"},
        ],
        "custom_colors": [
            {"_id": "rmh_canvas", "title": "Canvas", "color": "#F5F7FB"},
            {"_id": "rmh_surface", "title": "Surface", "color": "#FBFCFE"},
            {"_id": "rmh_line", "title": "Line", "color": "#E3E8F0"},
            {"_id": "rmh_muted", "title": "Muted text", "color": "#5E6B81"},
            {"_id": "rmh_verified", "title": "Verified green", "color": "#0E7A4A"},
            {"_id": "rmh_warn", "title": "Unverified amber", "color": "#B45309"},
            {"_id": "rmh_flag", "title": "Notice red", "color": "#B42318"},
        ],
        "system_typography": [
            {"_id": "primary", "title": "Headings", "typography_font_family": "System stack (see child theme)", "typography_font_weight": "800"},
            {"_id": "secondary", "title": "Sub-headings", "typography_font_weight": "700"},
            {"_id": "text", "title": "Body", "typography_font_family": "System stack (see child theme)", "typography_font_weight": "400"},
            {"_id": "accent", "title": "Buttons/labels", "typography_font_weight": "700"},
        ],
        "description": "Import via Elementor > Tools > Import/Export Kit. Global colors/fonts only; body typography and components ship in the child theme stylesheet (assets/css/readmehub.css) to avoid duplication.",
    },
}

# ---------------------------------------------------------------- homepage
nav_items = " · ".join(item["label"] for item in site["nav"]["primary"])
hero = site["hero"]
finder = site["decision_finder"]
trust_strip = "".join(f"<span>✔ {item}</span>" for item in hero["trust_strip"])
updated_rows = "".join(
    f'<div class="rm-update"><span class="rm-update__date">{u["date"]}</span><span class="rm-update__what">{u["what"]}</span>'
    f'<span class="rm-update__type"><span class="rm-badge rm-badge--official">{u["type"]}</span></span></div>'
    for u in site["updated_section"]["items"])
cats = "".join(
    f'<a class="rm-catcard{" rm-catcard--research" if c.get("status") != "live" else ""}" href="/{c.get("href", "categories/")}">'
    f'<span class="rm-catcard__name">{c["name"]}</span><span class="rm-catcard__desc">{c.get("desc","In research — launches after price verification.")}</span></a>'
    for c in site["categories_section"]["items"])
intents = "".join(
    f'<div class="rm-intentbox"><h3>{i["label"]}</h3><ul>' +
    "".join(f'<li><a href="/{x["href"]}">{x["t"]} →</a></li>' for x in i["items"]) + "</ul></div>"
    for i in site["intent_section"]["intents"])
values = "".join(f'<div class="rm-value"><h3>{p["title"]}</h3><p>{p["body"]}</p></div>' for p in site["pricing_section"]["points"])
steps = "".join(f'<div class="rm-step"><div class="rm-step__n">{s["n"]}</div><h3>{s["title"]}</h3><p>{s["body"]}</p></div>' for s in site["evidence_section"]["steps"])
criteria = "".join(f'<div class="rm-criterion"><h3>{c["name"]}</h3><p>{c["desc"]}</p></div>' for c in site["methodology_section"]["criteria"])
trusts = "".join(f'<a class="rm-trustcard" href="/{t["href"]}"><h3>{t["title"]}</h3><p>{t["desc"]}</p></a>' for t in site["trust_section"]["items"])
guides_cards = "".join(f'<a class="rm-card" href="/{g["href"]}"><div class="rm-card__cat">Guide</div><div class="rm-card__title">{g["title"]}</div><div class="rm-card__body">{g["desc"]}</div></a>' for g in site["guides_section"]["items"])
nl = site["newsletter"]
faq_items = "".join(f'<details><summary>{f["q"]}</summary><div class="rm-faq__a">{f["a"]}</div></details>' for f in site["faq_section"]["faqs"])

homepage_content = [
    section([column(60, [
        widget("heading", {"title": hero["eyebrow"], "header_size": "h6", "_css_classes": "rm-overline"}),
        widget("heading", {"title": hero["h1"], "header_size": "h1"}),
        text(hero["sub"]),
        widget("form" if False else "html", {"html":
            '<form class="rm-hero__search" role="search" action="/"><input type="search" name="s" placeholder="'
            + hero["search_placeholder"] + '" aria-label="Search ReadMeHub"><button class="rm-btn rm-btn--cta" type="submit">Search</button></form>'}),
        widget("html", {"html": f'<div class="rm-hero__examples"><span>Popular:</span> ' + "".join(f'<a href="/?s={e.replace(" ", "+")}">{e}</a>' for e in hero["search_examples"]) + "</div>"}),
        widget("button", {"text": hero["primary_cta"]["label"], "link": {"url": hero["primary_cta"]["href"]}, "_css_classes": "rm-btn rm-btn--cta"}),
        widget("button", {"text": hero["secondary_cta"]["label"], "link": {"url": "/" + hero["secondary_cta"]["href"]}, "_css_classes": "rm-btn rm-btn--ghost"}),
    ], {"_column_size": 60}),
    column(40, [html_widget(
        '<aside class="rm-hero__panel"><p class="rm-hero__panel__title">Today’s picks — verified 2026-09-06</p>'
        + '<div class="rm-verdict-mini">'
        + "".join(f'<div class="rm-verdict-mini__row"><span class="rm-verdict-mini__tag">{p["label"].split()[0]}</span><div><b>{p["value"]}</b><span>{p["why"]}</span></div></div>' for p in site["use_case_picks"]["picks"][:4])
        + '</div><p class="rm-meta" style="margin:14px 0 0">Prices verified at official vendor pages. <a href="/best/password-managers/">See the full research →</a></p></aside>'
    )], {"_column_size": 40})]),
    section([column(100, [html_widget(f'<div class="rm-truststrip">{trust_strip}</div>')])]),
    section([column(100, [html_widget(
        '<div class="rm-finder" data-finder><span class="rm-overline">Decision finder</span><h2>' + finder["title"] + '</h2>'
        '<p class="rm-finder__sub">' + finder["sub"] + '</p>'
        '<div class="rm-finder__step"><div class="rm-finder__label" data-finder-step2-label>' + finder["step1_label"] + '</div><div class="rm-chiprow">'
        + "".join((f'<a class="rm-chip" href="/{c["href"]}">{c["label"]}</a>' if c.get("status") == "live" else f'<span class="rm-chip rm-chip--research" aria-disabled="true">{c["label"]} <span class="rm-chip__hint">in research</span></span>') for c in finder["step1"])
        + '</div></div><div class="rm-finder__step" data-finder-step2 hidden><div class="rm-finder__label">'
        + finder["step2_label"] + '</div><div class="rm-chiprow">'
        + "".join(f'<a class="rm-chip" href="/{c["href"]}">{c["label"]} <span class="rm-chip__hint">→</span></a>' for c in finder["step2"])
        + '</div></div><p class="rm-finder__note">Nothing here is fake personalization — every route leads to real research with verified prices.</p></div>'
    )])], {"background_background": "classic", "background_color": "#14213D", "css_classes": "rm-finder-section"}),  # finder styling handled by child CSS
    section([column(100, [heading(site["featured_decisions"]["title"], "h2"), text(site["featured_decisions"]["sub"]), shortcode_widget('[rmh_featured_cards]')])]),
    section([column(100, [heading(site["use_case_picks"]["title"], "h2"), text(site["use_case_picks"]["sub"]), shortcode_widget('[rmh_picks_grid]'), widget("text-editor", {"editor": f"<p class='rm-picks-footnote'>{site['use_case_picks']['footnote']}</p>"})])]),
    section([column(100, [heading(site["comparisons_section"]["title"], "h2"), text(site["comparisons_section"]["sub"]), shortcode_widget('[rmh_compcards]')])]),
    section([column(100, [heading(site["reviews_section"]["title"], "h2"), text(site["reviews_section"]["sub"]), shortcode_widget('[rmh_cards type="rmh_review" limit="4"]'), widget("button", {"text": "All reviews", "link": {"url": "/reviews/"}, "_css_classes": "rm-btn rm-btn--ghost"})])]),
    section([column(100, [heading(site["updated_section"]["title"], "h2"), text(site["updated_section"]["sub"]), html_widget(f'<div class="rm-updates">{updated_rows}</div>')])]),
    section([column(100, [heading(site["categories_section"]["title"], "h2"), text(site["categories_section"]["sub"]), html_widget(f'<div class="rm-grid rm-grid--3">{cats}</div>')])]),
    section([column(100, [heading(site["intent_section"]["title"], "h2"), text(site["intent_section"]["sub"]), html_widget(f'<div class="rm-intentgrid">{intents}</div>')])]),
    section([column(100, [heading(site["deals_section"]["title"], "h2"), text(site["deals_section"]["sub"]), shortcode_widget('[rmh_deal_cards limit="4"]'), widget("button", {"text": "How deal verification works", "link": {"url": "/deals/"}, "_css_classes": "rm-btn rm-btn--ghost"})])]),
    section([column(100, [heading(site["pricing_section"]["title"], "h2"), text(site["pricing_section"]["sub"]), html_widget(f'<div class="rm-valuegrid">{values}</div>'), widget("button", {"text": site["pricing_section"]["cta"]["label"], "link": {"url": "/" + site["pricing_section"]["cta"]["href"]}, "_css_classes": "rm-btn rm-btn--brand"})])]),
    section([column(100, [heading(site["evidence_section"]["title"], "h2"), text(site["evidence_section"]["sub"]), html_widget(f'<div class="rm-steps">{steps}</div>'), heading(site["methodology_section"]["title"], "h2"), text(site["methodology_section"]["sub"]), html_widget(f'<div class="rm-criteria">{criteria}</div>'), widget("text-editor", {"editor": f"<p class='rm-disclosure'>{site['methodology_section']['disclosure']}</p>"}), widget("button", {"text": "Read the full methodology", "link": {"url": "/how-we-evaluate/"}, "_css_classes": "rm-btn rm-btn--ghost"})])]),
    section([column(100, [heading(site["trust_section"]["title"], "h2"), text(site["trust_section"]["sub"]), html_widget(f'<div class="rm-trustgrid">{trusts}</div>')])]),
    section([column(100, [heading(site["guides_section"]["title"], "h2"), text(site["guides_section"]["sub"]), html_widget(f'<div class="rm-grid rm-grid--3">{guides_cards}</div>')])]),
    section([column(100, [heading(site["faq_section"]["title"], "h2"), text(site["faq_section"]["sub"]), html_widget(f'<div class="rm-faq" data-faq>{faq_items}</div>')])]),
    section([column(100, [html_widget(
        '<div class="rm-newsletter"><div><h2>' + nl["title"] + '</h2><p>' + nl["sub"] + '</p><ul>'
        + "".join(f"<li>{b}</li>" for b in nl["bullets"]) + '</ul></div><div class="rm-newsletter__right">'
        '<form class="rm-newsletter__form" action="/" method="post"><input type="email" name="rmh_newsletter_email" placeholder="'
        + nl["placeholder"] + '" required aria-label="Email address"><button class="rm-btn rm-btn--cta" type="submit">' + nl["button"] + '</button></form>'
        '<p class="rm-fineprint">' + nl["fineprint"] + '</p></div></div>'
    )])]),
    section([column(100, [heading(site["final_cta"]["title"], "h2", "center"), text(site["final_cta"]["sub"]), widget("button", {"text": site["final_cta"]["primary"]["label"], "link": {"url": "#decision-finder"}, "_css_classes": "rm-btn rm-btn--cta"}), widget("button", {"text": site["final_cta"]["secondary"]["label"], "link": {"url": "/how-we-evaluate/"}, "_css_classes": "rm-btn rm-btn--ghost"})], {"content_position": "center"})], {"css_classes": "rm-finalcta"}),
]

homepage = {"version": "0.4", "title": "ReadMeHub — Homepage", "type": "page", "content": homepage_content,
            "page_settings": {"hide_title": "yes"}}

# Dynamic homepage loops ([rmh_featured_cards], [rmh_picks_grid], [rmh_compcards])
# are provided by the child theme (includes/shortcodes-home.php) so the
# homepage stays dynamic from ACF/queries — see INSTALL.md.

# ---------------------------------------------------------------- header/footer
header_tpl = {"version": "0.4", "title": "ReadMeHub — Header", "type": "section", "content": [
    section([
        column(20, [html_widget('<a class="rm-logo" href="/"><span class="rm-logo__mark">R<i>.</i></span><span class="rm-logo__word">ReadMe<i>Hub</i></span></a>')]),
        column(55, [shortcode_widget('[rmh_nav_menu]')]),
        column(25, [html_widget('<form class="rm-header__search" role="search" action="/"><input type="search" name="s" placeholder="Search…"><button type="submit" aria-label="Search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button></form><button class="rm-search-btn" data-search-btn aria-label="Open search">⌕</button><button class="rm-menu-btn" data-menu-btn aria-label="Open menu">☰</button><div class="rm-searchbar" data-searchbar><form role="search" action="/"><input type="search" name="s" data-search-input placeholder="Search reviews, comparisons, brands, deals…"><button class="rm-btn rm-btn--sm rm-btn--brand">Search</button></form></div><div class="rm-searchbar" data-searchbar-results style="padding:0"><div class="rm-searchresults" data-search-results></div></div>')]),
    ], {"css_classes": "rm-header__bar-wrap", "sticky": "yes"}),
]}
header_tpl["content"][0]["settings"]["css_classes"] = "rm-header"
header_tpl["content"][0]["settings"]["structure"] = "30"

footer_links = "".join(
    f'<div><p class="rm-footer__title">{col["title"]}</p><ul>'
    + "".join(f'<li><a href="/{l["href"]}">{l["label"]}</a></li>' for l in col["links"]) + "</ul></div>"
    for col in site["footer"]["cols"])
footer_tpl = {"version": "0.4", "title": "ReadMeHub — Footer", "type": "section", "content": [
    section([column(100, [html_widget(
        '<footer class="rm-footer"><div class="rm-container"><div class="rm-footer__grid">'
        '<div class="rm-footer__brand"><a class="rm-logo" href="/"><span class="rm-logo__mark">R<i>.</i></span>'
        '<span class="rm-logo__word" style="color:#fff">ReadMe<i>Hub</i></span></a><p>' + site["footer"]["blurb"] + '</p></div>'
        + footer_links +
        '</div><div class="rm-footer__legal"><span>' + site["footer"]["copyright"] + '</span><span>' + site["footer"]["social_note"] + '</span></div></div></footer>'
        '<script>window.RMH_INDEX = window.RMH_INDEX || [];</script><script src="SEO_NOTE_see_install"></script>'
    )])])]}
# remove the placeholder script tag — WP version loads readmehub.js via wp_enqueue_script
footer_tpl["content"][0]["elements"][0]["elements"][0]["settings"]["html"] = footer_tpl["content"][0]["elements"][0]["elements"][0]["settings"]["html"].replace('<script src="SEO_NOTE_see_install"></script>', '')

# ---------------------------------------------------------------- single templates
single_review = {"version": "0.4", "title": "ReadMeHub — Single Review", "type": "single", "content": [
    section([column(100, [
        shortcode_widget('[rmh_breadcrumbs]'),
        html_widget('<div class="rm-article__meta">[rmh_verification_stamp]<span class="rm-meta">Updated [rmh_meta key="rmh_last_updated"]</span></div>'),
        widget("post-title", {"header_size": "h1"}),
        shortcode_widget('[rmh_disclosure]'),
        shortcode_widget('[rmh_verdict_box]'),
        shortcode_widget('[rmh_fit_lists]'),
        shortcode_widget('[rmh_takeaways]'),
        widget("post-content", {}),
        shortcode_widget('[rmh_price_table]'),
        shortcode_widget('[rmh_pros_cons]'),
        shortcode_widget('[rmh_faq]'),
        html_widget('<div class="rm-author"><div class="rm-author__avatar">RH</div><div><b>ReadMeHub Editorial Team</b><span>Research-based, verified, and dated. Corrections are published.</span></div></div>'),
        shortcode_widget('[rmh_related type="auto" limit="3"]'),
    ])], {"css_classes": "rm-single-review"}),
]}

single_comparison = {"version": "0.4", "title": "ReadMeHub — Single Comparison", "type": "single", "content": [
    section([column(100, [
        shortcode_widget('[rmh_breadcrumbs]'),
        html_widget('<div class="rm-article__meta">[rmh_verification_stamp]</div>'),
        widget("post-title", {"header_size": "h1"}),
        shortcode_widget('[rmh_disclosure]'),
        shortcode_widget('[rmh_verdict_box]'),
        shortcode_widget('[rmh_choose_if]'),
        shortcode_widget('[rmh_matrix_table]'),
        widget("post-content", {}),
        shortcode_widget('[rmh_tiebreaker]'),
        shortcode_widget('[rmh_faq]'),
        shortcode_widget('[rmh_related type="auto" limit="3"]'),
    ])], {"css_classes": "rm-single-comparison"}),
]}

archive_reviews = {"version": "0.4", "title": "ReadMeHub — Reviews Archive", "type": "archive", "content": [
    section([column(100, [widget("archive-title", {"header_size": "h1"}), shortcode_widget('[rmh_cards type="rmh_review" limit="12"]')])]),
]}

def write_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"  ✓ {path.relative_to(ROOT)}")

if __name__ == "__main__":
    print("Generating Elementor files…")
    write_json(OUT_KIT / "readmehub-kit.json", kit)
    write_json(OUT_TPL / "rmh-homepage.json", homepage)
    write_json(OUT_TPL / "rmh-header.json", header_tpl)
    write_json(OUT_TPL / "rmh-footer.json", footer_tpl)
    write_json(OUT_TPL / "rmh-single-review.json", single_review)
    write_json(OUT_TPL / "rmh-single-comparison.json", single_comparison)
    write_json(OUT_TPL / "rmh-archive-reviews.json", archive_reviews)
    print("Done.")
