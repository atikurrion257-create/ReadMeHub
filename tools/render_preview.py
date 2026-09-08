#!/usr/bin/env python3
"""
Render the ReadMeHub static preview (visual QA + stakeholder review).

Reads content/*.json -> writes index.html + preview/** (mirroring the WordPress
URL architecture) + copies the design-system assets. This preview renders the
EXACT same content model and CSS that the WordPress build ships, so design QA
here transfers to production.

Usage: python3 tools/render_preview.py [--serve PORT]
"""
from __future__ import annotations
import json
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from rmh_render import (C, ROOT, esc, md, paras, page_head, chrome_header, chrome_footer,
                        badge, verdict_box, fit_lists, table, price_stamp, pros_cons,
                        faq_block, sources_block, article_foot, author_card, breadcrumbs,
                        card, section_head, disclosure_box, load, RAW)

OUT = ROOT / "preview"
SEARCH_INDEX: list[dict] = []
SITE: dict = {}

def index_page(title: str, sub: str, href: str, ptype: str, keywords: str = ""):
    SEARCH_INDEX.append({"title": title, "sub": sub, "href": href, "type": ptype, "keywords": keywords})

def w(path: Path, html: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    print(f"  ✓ {path.relative_to(ROOT)}")

def rel(depth: int) -> str:
    return "../" * depth

def org_schema() -> dict:
    return {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "Organization", "@id": "https://readmehub.com/#organization", "name": "ReadMeHub",
             "url": "https://readmehub.com/",
             "logo": {"@type": "ImageObject", "url": "https://readmehub.com/assets/img/logo.svg"}},
            {"@type": "WebSite", "@id": "https://readmehub.com/#website", "url": "https://readmehub.com/",
             "name": "ReadMeHub", "publisher": {"@id": "https://readmehub.com/#organization"},
             "potentialAction": {"@type": "SearchAction",
                                 "target": {"@type": "EntryPoint", "urlTemplate": "https://readmehub.com/?s={search_term_string}"},
                                 "query-input": "required name=search_term_string"}},
        ],
    }

def article_schema(title: str, path: str, ptype: str) -> dict:
    # Preview schema is a deliberate subset: Org + WebSite + Article with real
    # dates and the editorial-team author. Breadcrumb/review/offer schema is
    # emitted by the child theme in production, mirroring visible content.
    return {
        "@context": "https://schema.org",
        "@graph": org_schema()["@graph"] + [
            {"@type": "Article", "@id": f"https://readmehub.com/{path}#article", "headline": title,
             "datePublished": "2026-09-06", "dateModified": "2026-09-06",
             "author": {"@type": "Organization", "name": "ReadMeHub Editorial Team", "url": "https://readmehub.com/about/"},
             "publisher": {"@id": "https://readmehub.com/#organization"},
             "mainEntityOfPage": f"https://readmehub.com/{path}"},
        ],
    }

# ---------------------------------------------------------------------------
# HOMEPAGE — all 20 sections (Phase 7)
# ---------------------------------------------------------------------------

def render_home(site: dict) -> str:
    hero = site["hero"]
    trust = "".join(f'<span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>{esc(t)}</span>' for t in hero["trust_strip"])
    examples = "".join(f'<a href="#decision-finder" data-search-example>{esc(e)}</a>' for e in hero["search_examples"])

    mini_rows = "".join(
        f'<div class="rm-verdict-mini__row"><span class="rm-verdict-mini__tag">{esc(p["label"].split()[0])}</span>'
        f'<div><b>{esc(p["value"])}</b><span>{esc(p["why"])}</span></div></div>'
        for p in site["use_case_picks"]["picks"][:4])

    # S3 Decision finder
    df = site["decision_finder"]
    chips1 = ""
    for item in df["step1"]:
        if item.get("status") == "live":
            chips1 += f'<button type="button" class="rm-chip" data-finder-choice>{esc(item["label"])}</button>'
        else:
            chips1 += (f'<button type="button" class="rm-chip rm-chip--research" aria-disabled="true" tabindex="-1">{esc(item["label"])} '
                       f'<span class="rm-chip__hint">in research</span></button>')
    chips2 = "".join(
        f'<a class="rm-chip" href="{esc(item["href"])}">{esc(item["label"])}<span class="rm-chip__hint">→</span></a>'
        for item in df["step2"])

    # S4 Featured decisions
    featured = "".join(card(item["title"], item["category"], item["context"], item["href"]) for item in site["featured_decisions"]["items"])

    # S5 use case picks
    picks = "".join(
        f'<a class="rm-pick" href="{esc(p["href"])}"><span class="rm-pick__label">{esc(p["label"])}</span>'
        f'<span class="rm-pick__value">{esc(p["value"])}</span><span class="rm-pick__why">{esc(p["why"])}</span>'
        f'<span class="rm-pick__go">See the research →</span></a>'
        for p in site["use_case_picks"]["picks"])

    # S6 comparisons
    comp_cards = ""
    for cse in site["comparisons_section"]["items"]:
        comp_cards += f"""
        <div class="rm-compcard">
          <div class="rm-compcard__head">
            <div class="rm-compcard__side"><b>{esc(cse["a"])}</b></div>
            <div class="rm-compcard__vs" aria-hidden="true">VS</div>
            <div class="rm-compcard__side"><b>{esc(cse["b"])}</b></div>
          </div>
          <div class="rm-compcard__body">
            <div class="rm-compcard__cell"><h3>Choose {esc(cse["a"])} if</h4><p>{esc(cse["best_for_a"])}</p></div>
            <div class="rm-compcard__cell"><h3>Choose {esc(cse["b"])} if</h4><p>{esc(cse["best_for_b"])}</p></div>
          </div>
          <div class="rm-compcard__key"><p><strong>The key difference:</strong> {esc(cse["key_difference"])}</p></div>
          <div class="rm-compcard__key" style="padding-top:0;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
            <strong style="color:var(--rmh-ink)">{esc(cse["verdict"])}</strong>
            <a class="rm-btn rm-btn--sm rm-btn--brand" href="{esc(cse["href"])}">Read the verdict</a>
          </div>
        </div>"""

    # S7 latest reviews
    review_cards = "".join(card(r["product"] + " review", r["category"], r["verdict"], r["href"], "Updated " + r["updated"]) for r in site["reviews_section"]["items"])

    # S8 recently updated
    updates = "".join(
        f'<a class="rm-update" href="{esc(u["href"])}"><span class="rm-update__date">{esc(u["date"])}</span>'
        f'<span class="rm-update__what">{esc(u["what"])}</span><span class="rm-update__type">'
        f'<span class="rm-badge rm-badge--official">{esc(u["type"])}</span></span></a>'
        for u in site["updated_section"]["items"])

    # S9 categories
    cat_icons = {"Password Managers": "🔐", "Web Hosting": "🌐", "VPN": "🛡️", "AI Tools": "✨", "Productivity": "⚡", "Website Builders": "🧱"}
    cats = ""
    for citem in site["categories_section"]["items"]:
        live = citem.get("status") == "live"
        href = citem["href"] if live else "categories/"
        cls = "" if live else " rm-catcard--research"
        body = citem.get("desc", "Keyword and SERP research staged — launches only after the same price-verification workflow as our first category.")
        badge_html = badge("live" if live else "research")
        cats += (f'<a class="rm-catcard{cls}" href="{esc(href)}"><span class="rm-catcard__icon" aria-hidden="true">{cat_icons.get(citem["name"], "▸")}</span>'
                 f'<span class="rm-catcard__name">{esc(citem["name"])}</span><span class="rm-catcard__desc">{esc(body)}</span>'
                 f'<span style="margin-top:6px">{badge_html}</span></a>')

    # S10 intent
    intents = ""
    for intent in site["intent_section"]["intents"]:
        lis = "".join(f'<li><a href="{esc(i["href"])}">{esc(i["t"])}<span aria-hidden="true">→</span></a></li>' for i in intent["items"])
        intents += f'<div class="rm-intentbox"><h3>{esc(intent["label"])}</h3><ul>{lis}</ul></div>'

    # S11 deals
    deals = "".join(
        f'<article class="rm-deal"><div class="rm-deal__top"><span class="rm-deal__brand">{esc(d["brand"])}</span>{badge(d["status"], d.get("checked"))}</div>'
        f'<div class="rm-deal__offer">{esc(d["offer"])}</div>'
        f'<div class="rm-deal__foot"><span class="rm-meta">{esc(d.get("qualifier", d.get("type", "")))}</span>'
        f'<a class="rm-btn rm-btn--sm rm-btn--brand" href="{esc(d["href"])}">See offer status</a></div></article>'
        for d in site["deals_section"]["items"])

    # S12 pricing points
    values = "".join(f'<div class="rm-value"><h3>{esc(p["title"])}</h3><p>{esc(p["body"])}</p></div>' for p in site["pricing_section"]["points"])

    # S13 methodology steps
    steps = "".join(f'<div class="rm-step"><div class="rm-step__n">{esc(s["n"])}</div><h3>{esc(s["title"])}</h3><p>{esc(s["body"])}</p></div>'
                    for s in site["evidence_section"]["steps"])

    # S14 criteria
    criteria = "".join(f'<div class="rm-criterion"><h3>{esc(c["name"])}</h3><p>{esc(c["desc"])}</p></div>' for c in site["methodology_section"]["criteria"])

    # S15 trust cards
    trusts = "".join(f'<a class="rm-trustcard" href="{esc(t["href"])}"><h3>{esc(t["title"])}</h3><p>{esc(t["desc"])}</p></a>' for t in site["trust_section"]["items"])

    # S16 guides
    guides = "".join(card(g["title"], "Guide", g["desc"], g["href"]) for g in site["guides_section"]["items"])

    # S17 FAQ
    faqs = faq_block(site["faq_section"]["faqs"])

    # S18 newsletter
    nl = site["newsletter"]
    bullets = "".join(f"<li>{esc(b)}</li>" for b in nl["bullets"])

    return f"""{page_head(site["meta"]["title"], site["meta"]["description"], 0, "", org_schema())}
<body>
{chrome_header(site, 0, active="")}
<main id="main">

  <!-- S2 HERO -->
  <section class="rm-hero">
    <div class="rm-container">
      <div class="rm-hero__grid">
        <div>
          <span class="rm-overline rm-hero__eyebrow">{esc(hero["eyebrow"])}</span>
          <h1>{esc(hero["h1"])}</h1>
          <p class="rm-hero__sub">{esc(hero["sub"])}</p>
          <form class="rm-hero__search" role="search" onsubmit="return false">
            <input type="search" data-search-input placeholder="{esc(hero["search_placeholder"])}" aria-label="Search ReadMeHub">
            <button class="rm-btn rm-btn--cta" type="submit">Search</button>
          </form>
          <div class="rm-hero__examples"><span>Popular:</span> {examples}</div>
          <div class="rm-hero__ctas" style="margin-top:22px">
            <a class="rm-btn rm-btn--cta" href="{esc(hero["primary_cta"]["href"])}">{esc(hero["primary_cta"]["label"])}</a>
            <a class="rm-btn rm-btn--ghost" href="{esc(hero["secondary_cta"]["href"])}">{esc(hero["secondary_cta"]["label"])}</a>
          </div>
        </div>
        <aside class="rm-hero__panel" aria-label="Today's verified picks">
          <p class="rm-hero__panel__title">Today’s picks — verified 2026-09-06</p>
          <div class="rm-verdict-mini">{mini_rows}</div>
          <p class="rm-meta" style="margin:14px 0 0">Prices verified at official vendor pages. <a href="best/password-managers/">See the full research →</a></p>
        </aside>
      </div>
      <div class="rm-truststrip">{trust}</div>
    </div>
  </section>

  <!-- S3 DECISION FINDER -->
  <section class="rm-section rm-section--tight" id="decision-finder">
    <div class="rm-container">
      <div class="rm-finder" data-finder>
        <span class="rm-overline">Decision finder</span>
        <h2>{esc(df["title"])}</h2>
        <p class="rm-finder__sub">{esc(df["sub"])}</p>
        <div class="rm-finder__step">
          <div class="rm-finder__label" data-finder-step2-label>{esc(df["step1_label"])}</div>
          <div class="rm-chiprow">{chips1}</div>
        </div>
        <div class="rm-finder__step" data-finder-step2 hidden>
          <div class="rm-finder__label">{esc(df["step2_label"])}</div>
          <div class="rm-chiprow">{chips2}</div>
        </div>
        <p class="rm-finder__note">Nothing here is a quiz with fake personalization — every route leads to real research with verified prices. Categories marked “in research” publish only after their prices are verified.</p>
      </div>
    </div>
  </section>

  <!-- S4 FEATURED DECISIONS -->
  <section class="rm-section">
    <div class="rm-container">
      {section_head("Editor's selection", site["featured_decisions"]["title"], site["featured_decisions"]["sub"])}
      <div class="rm-grid rm-grid--4">{featured}</div>
    </div>
  </section>

  <!-- S5 BEST PICKS BY USE CASE -->
  <section class="rm-section rm-section--tint">
    <div class="rm-container">
      {section_head("Decision shortcuts", site["use_case_picks"]["title"], site["use_case_picks"]["sub"])}
      <div class="rm-grid rm-grid--3">{picks}</div>
      <p class="rm-picks-footnote">{esc(site["use_case_picks"]["footnote"])}</p>
    </div>
  </section>

  <!-- S6 POPULAR COMPARISONS -->
  <section class="rm-section">
    <div class="rm-container">
      {section_head("Head-to-head", site["comparisons_section"]["title"], site["comparisons_section"]["sub"])}
      {comp_cards}
    </div>
  </section>

  <!-- S7 LATEST REVIEWS -->
  <section class="rm-section rm-section--tint">
    <div class="rm-container">
      {section_head("Reviews", site["reviews_section"]["title"], site["reviews_section"]["sub"])}
      <div class="rm-grid rm-grid--4">{review_cards}</div>
      <div class="rm-section-more"><a class="rm-btn rm-btn--ghost" href="reviews/">All reviews</a></div>
    </div>
  </section>

  <!-- S8 RECENTLY UPDATED -->
  <section class="rm-section">
    <div class="rm-container">
      {section_head("Freshness, dated", site["updated_section"]["title"], site["updated_section"]["sub"])}
      <div class="rm-updates">{updates}</div>
    </div>
  </section>

  <!-- S9 EXPLORE CATEGORIES -->
  <section class="rm-section rm-section--tint">
    <div class="rm-container">
      {section_head("Categories", site["categories_section"]["title"], site["categories_section"]["sub"])}
      <div class="rm-grid rm-grid--3">{cats}</div>
    </div>
  </section>

  <!-- S10 EXPLORE BY INTENT -->
  <section class="rm-section">
    <div class="rm-container">
      {section_head("By intent", site["intent_section"]["title"], site["intent_section"]["sub"])}
      <div class="rm-intentgrid">{intents}</div>
    </div>
  </section>

  <!-- S11 DEALS & COUPONS -->
  <section class="rm-section rm-section--tint">
    <div class="rm-container">
      {section_head("Deals", site["deals_section"]["title"], site["deals_section"]["sub"])}
      <div class="rm-grid rm-grid--2">{deals}</div>
      <div class="rm-section-more"><a class="rm-btn rm-btn--ghost" href="deals/">How deal verification works</a></div>
    </div>
  </section>

  <!-- S12 PRICE & VALUE DISCOVERY -->
  <section class="rm-section">
    <div class="rm-container">
      {section_head("Pricing, honestly", site["pricing_section"]["title"], site["pricing_section"]["sub"])}
      <div class="rm-valuegrid">{values}</div>
      <div class="rm-section-more"><a class="rm-btn rm-btn--brand" href="{esc(site["pricing_section"]["cta"]["href"])}">{esc(site["pricing_section"]["cta"]["label"])}</a></div>
    </div>
  </section>

  <!-- S13 RESEARCH & EVIDENCE + S14 HOW WE EVALUATE -->
  <section class="rm-section rm-section--tint">
    <div class="rm-container">
      {section_head("Methodology", site["evidence_section"]["title"], site["evidence_section"]["sub"])}
      <div class="rm-steps">{steps}</div>
      <h2 style="margin-top:56px">{esc(site["methodology_section"]["title"])}</h2>
      <p style="max-width:70ch;color:var(--rmh-muted)">{esc(site["methodology_section"]["sub"])}</p>
      <div class="rm-criteria" style="margin-top:24px">{criteria}</div>
      <p class="rm-disclosure" style="margin-top:24px">{esc(site["methodology_section"]["disclosure"])}</p>
      <div class="rm-section-more"><a class="rm-btn rm-btn--ghost" href="how-we-evaluate/">Read the full methodology</a></div>
    </div>
  </section>

  <!-- S15 EDITORIAL TRUST -->
  <section class="rm-section">
    <div class="rm-container">
      {section_head("Trust, engineered", site["trust_section"]["title"], site["trust_section"]["sub"])}
      <div class="rm-trustgrid">{trusts}</div>
    </div>
  </section>

  <!-- S16 GUIDES -->
  <section class="rm-section rm-section--tint">
    <div class="rm-container">
      {section_head("Learning hub", site["guides_section"]["title"], site["guides_section"]["sub"])}
      <div class="rm-grid rm-grid--3">{guides}</div>
      <div class="rm-section-more"><a class="rm-btn rm-btn--ghost" href="guides/">All guides</a></div>
    </div>
  </section>

  <!-- S17 FAQ -->
  <section class="rm-section">
    <div class="rm-container" style="max-width:860px">
      {section_head("FAQ", site["faq_section"]["title"], site["faq_section"]["sub"])}
      {faqs}
    </div>
  </section>

  <!-- S18 NEWSLETTER -->
  <section class="rm-section rm-section--tight">
    <div class="rm-container">
      <div class="rm-newsletter">
        <div>
          <h2>{esc(nl["title"])}</h2>
          <p>{esc(nl["sub"])}</p>
          <ul>{bullets}</ul>
        </div>
        <div class="rm-newsletter__right">
          <form class="rm-newsletter__form" onsubmit="return false">
            <input type="email" placeholder="{esc(nl["placeholder"])}" aria-label="Email address" required>
            <button class="rm-btn rm-btn--cta" type="submit">{esc(nl["button"])}</button>
          </form>
          <p class="rm-fineprint">{esc(nl["fineprint"])} <em>{esc(nl["demo_note"])}</em></p>
        </div>
      </div>
    </div>
  </section>

  <!-- S19 FINAL CTA -->
  <section class="rm-finalcta">
    <div class="rm-container">
      <h2>{esc(site["final_cta"]["title"])}</h2>
      <p>{esc(site["final_cta"]["sub"])}</p>
      <div class="rm-finalcta__btns">
        <a class="rm-btn rm-btn--cta" href="{esc(site["final_cta"]["primary"]["href"])}">{esc(site["final_cta"]["primary"]["label"])}</a>
        <a class="rm-btn rm-btn--ghost" href="{esc(site["final_cta"]["secondary"]["href"])}">{esc(site["final_cta"]["secondary"]["label"])}</a>
      </div>
    </div>
  </section>

</main>
{chrome_footer(site, 0)}
</body>
</html>"""

# ---------------------------------------------------------------------------
# ARTICLE PAGES
# ---------------------------------------------------------------------------

def wrap_page(title, desc, depth, path, body, active="", schema=None, wide=True, title_tag=None):
    tt = title_tag or title
    return (f"{page_head(tt, desc, depth, path, schema or article_schema(tt, path, 'Article'))}"
            f"<body>{chrome_header(SITE, depth, active)}<main id=\"main\">"
            f"<div class=\"rm-container rm-section--tight rm-section\" style=\"padding-top:28px\">"
            f"<div class=\"rm-article{' rm-article--wide' if wide else ''}\">{body}</div></div></main>"
            f"{chrome_footer(SITE, depth)}</body></html>")

def render_review(r, cat, depth) -> str:
    path = f"reviews/{r['slug']}/"
    index_page(r["title"], r["short_verdict"][:110], rel(depth) + path, "review", r["brand"] + " review pricing")
    body_parts = [
        breadcrumbs([("Home", "index.html"), ("Reviews", "reviews/index.html"), (cat["name"], "categories/password-managers/index.html"), (r["brand"] + " review", "")], rel(depth)),
        f'<div class="rm-article__meta">{badge("verified")}<span class="rm-meta">Updated {esc(r["updated"])} · <strong>Last verified: {esc(r["verified"])}</strong></span></div>',
        f"<h1>{esc(r['title'])}</h1>",
        verdict_box("Executive verdict", r["short_verdict"]),
        fit_lists(r["best_for"], r["not_ideal_for"]),
        "<h2 id=\"takeaways\">Key takeaways</h2><ul>" + "".join(f"<li>{md(t)}</li>" for t in r["key_takeaways"]) + "</ul>",
        '<h2 id="pricing">Pricing &amp; plans — verified</h2>',
        f"<p>{esc(r['pricing']['intro'])}</p>",
        table(f"{r['brand']} plans (verified {r['verified']})", r["pricing"]["columns"],
              [[row["plan"], row["price"] + (f" · {row['promo']}" if row.get("promo") else ""), row["term"], row["notes"]] for row in r["pricing"]["rows"]],
              cell_render=RAW),
        f"<p class='rm-meta'>{esc(r['pricing']['footnote'])}</p>",
        "<h2>Feature-by-feature analysis</h2>",
        "".join(f"<h3>{esc(f['feature'])}</h3><p>{md(f['assessment'])}</p>" for f in r["features"]),
        f"<h2>Ease of use</h2><p>{esc(r['ease_of_use'])}</p>",
        f"<h2>Security</h2><p>{esc(r['security'])}</p>",
        "<h2>Pros &amp; cons</h2>" + pros_cons(r["pros"], r["cons"]),
        "<h2>Alternatives to consider first</h2><ul>" + "".join(
            f"<li><a href=\"{rel(depth)}{a['href']}\"><strong>{esc(a['name'])}</strong></a> — {esc(a['why'])}</li>" for a in r["alternatives"]) + "</ul>",
        "<h2>Use it for</h2><ul>" + "".join(f"<li><a href=\"{rel(depth)}{u['href']}\">{esc(u['t'])}</a></li>" for u in r["use_cases"]) + "</ul>",
        '<h2 id="faq">FAQ</h2>' + faq_block(r["faq"]),
        verdict_box("The bottom line", r["verdict_line"]),
        author_card(),
        article_foot(r),
        sources_block(r["sources"]),
    ]
    return wrap_page(r["title"], r["meta_description"], depth, path, "".join(body_parts), active="reviews", title_tag=r.get("title_tag"))

def render_comparison(cp, depth) -> str:
    path = f"compare/{cp['slug']}/"
    index_page(cp["title"], cp["quick_verdict"][:110], rel(depth) + path, "comparison", f"{cp['a']['name']} vs {cp['b']['name']}")
    pricing_rows = []
    for row in cp["pricing_context"]["rows"]:
        win = row["winner"]
        pricing_rows.append([
            row["dimension"],
            md(row["a"]) + (' <span class="rm-badge rm-badge--verified">✓</span>' if win == "a" else ""),
            md(row["b"]) + (' <span class="rm-badge rm-badge--verified">✓</span>' if win == "b" else ""),
            row["meaning"],
        ])
    matrix_rows = []
    for m in cp["matrix"]:
        matrix_rows.append([
            m["dimension"],
            md(m["a"]),
            md(m["b"]),
            md(m["interpretation"]),
        ])
    choose_a = "".join(f"<li>{md(x)}</li>" for x in cp["choose_a_if"])
    choose_b = "".join(f"<li>{md(x)}</li>" for x in cp["choose_b_if"])
    body_parts = [
        breadcrumbs([("Home", "index.html"), ("Comparisons", "compare/index.html"), (f"{cp['a']['name']} vs {cp['b']['name']}", "")], rel(depth)),
        f'<div class="rm-article__meta">{badge("verified")}<span class="rm-meta">Updated {esc(cp["updated"])} · <strong>Last verified: {esc(cp["verified"])}</strong></span></div>',
        f"<h1>{esc(cp['title'])}</h1>",
        verdict_box("Quick verdict", cp["quick_verdict"]),
        f"""<div class="rm-chooseif">
          <div class="rm-chooseif__col rm-chooseif__col--a"><h2>Best for {esc(cp['a']['name'])}</h3><p>{esc(cp['best_for_a'])}</p></div>
          <div class="rm-chooseif__col rm-chooseif__col--b"><h2>Best for {esc(cp['b']['name'])}</h3><p>{esc(cp['best_for_b'])}</p></div>
        </div>
        <div class="rm-chooseif">
          <div class="rm-chooseif__col rm-chooseif__col--a"><h2>Choose {esc(cp['a']['name'])} if…</h3><ul>{choose_a}</ul></div>
          <div class="rm-chooseif__col rm-chooseif__col--b"><h2>Choose {esc(cp['b']['name'])} if…</h3><ul>{choose_b}</ul></div>
        </div>""",
        "<h2>The key difference</h2>",
        f"<p>{md(cp['key_difference'])}</p>",
        "<h2 id=\"pricing\">Pricing, side by side (verified)</h2>",
        f"<p>{esc(cp['pricing_context']['intro'])}</p> ✓ = better on this row",
        table("Pricing & policy comparison", ["Dimension", cp["a"]["name"], cp["b"]["name"], "What it means"], pricing_rows, cell_render=RAW),
        "<h2>Feature &amp; philosophy matrix</h2>",
        table("Head-to-head matrix", ["Dimension", cp["a"]["name"], cp["b"]["name"], "Interpretation"], matrix_rows, cell_render=RAW),
        "<h2>The tiebreaker</h2>",
        f"<p>{md(cp['tiebreaker'])}</p>",
        f"<h2>Related decisions</h2><ul><li><a href=\"{rel(depth)}reviews/{cp['a']['slug'] if 'slug' in cp['a'] else '1password'}/\">{esc(cp['a']['name'])} review</a></li>"
        f"<li><a href=\"{rel(depth)}reviews/bitwarden/\">{esc(cp['b']['name'])} review</a></li>"
        f"<li><a href=\"{rel(depth)}use-cases/password-manager-for-families/index.html\">Best password manager for families</a></li></ul>",
        '<h2 id="faq">FAQ</h2>' + faq_block(cp["faqs"]),
        author_card(), article_foot({"testing_status": "research_only", "affiliate_note": "Verified prices link to official vendor pages; affiliate statuses per page."}),
        sources_block(cp["sources"]),
    ]
    return wrap_page(cp["title"], cp["meta_description"], depth, path, "".join(body_parts), active="compare", title_tag=cp.get("title_tag"))

def render_guide(g, depth, pillar=False) -> str:
    path = "best/password-managers/" if pillar else ("guides/" + g["slug"] + "/")
    index_page(g["title"], (g.get("answer") or "")[:110], rel(depth) + path, "guide", g["category"] + " guide")
    parts = [
        breadcrumbs([("Home", "index.html"), ("Guides", "guides/index.html"), (g["title"], "")], rel(depth)),
        f'<div class="rm-article__meta">{badge("verified")}<span class="rm-meta">Updated {esc(g["updated"])} · <strong>Last verified: {esc(g["verified"])}</strong></span></div>',
        f"<h1>{esc(g['title'])}</h1>",
        verdict_box("The direct answer", g["answer"]),
    ]
    if pillar:
        aa = g["at_a_glance"]
        parts += ["<h2>At a glance</h2>",
                  table("Password managers at a glance", aa["columns"],
                        [[f"<a href='{rel(depth)}{r['href']}'><strong>{esc(r['name'])}</strong></a>", r["best_for"], r["free"], r["price"], r["oss"], r["verified"]] for r in aa["rows"]], cell_render=RAW),
                  f"<p class='rm-meta'>{esc(aa['footnote'])}</p>",
                  "<h2>The decision framework</h2>",
                  table("Pick by situation", ["If this is you", "Pick", "Why"],
                        [[md(f["situation"]), f"<strong>{esc(f['pick'])}</strong>", md(f["why"])] for f in g["decision_framework"]], cell_render=RAW)]
    for s in g.get("sections", []):
        parts.append(f"<h2>{esc(s['h2'])}</h2>")
        if "body" in s:
            parts.append(f"<p>{md(s['body'])}</p>")
        if "list" in s:
            def _li(i):
                if isinstance(i, dict):
                    lead = i.get("moment") or i.get("pick") or ""
                    body = i.get("detail") or i.get("why") or ""
                    return f"<li><strong>{esc(lead)}</strong> {md(body)}</li>"
                return f"<li>{md(i)}</li>"
            parts.append("<ul>" + "".join(_li(i) for i in s["list"]) + "</ul>")
        if "table" in s:
            t = s["table"]
            rows = [[f"<strong>{esc(r[list(r.keys())[0]])}</strong>"] + [md(str(v)) for k, v in list(r.items())[1:]] for r in t["rows"]]
            parts.append(table(t.get("columns", [""]), t["columns"], rows, cell_render=RAW))
    if pillar:
        pc = g["pricing"]
        parts += ["<h2 id=\"pricing\">Verified price tables</h2>", f"<p>{esc(pc['intro'])}</p>"]
        for t in pc["tables"]:
            rows = []
            for r in t["rows"]:
                vals = list(r.values())
                rows.append([f"<strong>{esc(vals[0])}</strong>"] + [md(str(v)) for v in vals[1:]])
            parts.append(table(t["title"], t["columns"], rows, cell_render=RAW))
        parts += ["<h2>How to read these tables honestly</h2>", f"<p>{md(pc['value_reading'])}</p>",
                  "<h2>Contenders that didn't make the list</h2><ul>" + "".join(f"<li><strong>{esc(x['name'])}</strong> — {esc(x['reason'])}</li>" for x in g["rejected_contenders"]) + "</ul>"]
        note = g["also_ran_note"]
        parts += [f"<h2 id=\"{note['id']}\">{esc(note['title'])}</h2>", f"<p>{esc(note['body'])}</p>"]
    if "cta" in g:
        parts.append(f"<p><a class='rm-btn rm-btn--brand' href='{rel(depth)}{g['cta']['href']}'>{esc(g['cta']['label'])}</a></p>")
    if "how_to_choose" in g:
        parts += ["<h2>How to choose</h2>", f"<p>{md(g['how_to_choose'])}</p>"]
    if g.get("faqs"):
        parts += ['<h2 id="faq">FAQ</h2>', faq_block(g["faqs"])]
    parts += [author_card(), article_foot({"testing_status": "research_only", "affiliate_note": "See page disclosures; verified prices link to official vendor pages."}), sources_block(g["sources"])]
    return wrap_page(g["title"], g["meta_description"], depth, path, "".join(parts), active="best" if pillar else "guides", title_tag=g.get("title_tag"))

def render_alternative(alt, depth) -> str:
    path = f"alternatives/{alt['slug']}/"
    index_page(alt["title"], alt["answer"][:110], rel(depth) + path, "alternative", "bitwarden alternatives")
    by_reason = "".join(
        f"<h3>{esc(x['reason'])} → <strong>{esc(x['pick'])}</strong></h3><p><strong>Verified price:</strong> {esc(x['price'])}. {esc(x['detail'])}</p>"
        for x in alt["alternatives_by_reason"])
    not_fit = ""
    for x in alt["where_it_may_not_fit"]:
        ev = f"<p class='rm-meta'>Evidence: {esc(x['evidence'])}</p>" if x.get("evidence") else ""
        not_fit += f"<h3>{esc(x['reason'])}</h3><p>{esc(x['detail'])}</p>{ev}"
    parts = [
        breadcrumbs([("Home", "index.html"), ("Alternatives", "alternatives/index.html"), (alt["title"], "")], rel(depth)),
        f'<div class="rm-article__meta">{badge("verified")}<span class="rm-meta">Updated {esc(alt["updated"])} · <strong>Last verified: {esc(alt["verified"])}</strong></span></div>',
        f"<h1>{esc(alt['title'])}</h1>",
        verdict_box("The direct answer", alt["answer"]),
        "<h2>What Bitwarden does well (why people choose it)</h2><ul>" + "".join(f"<li>{esc(x)}</li>" for x in alt["what_it_does_well"]) + "</ul>",
        "<h2>Where it may not fit — the actual reasons people switch</h2>",
        not_fit,
        "<h2>The best alternative, by reason</h2>" + by_reason,
        "<h2>How to choose</h2>", f"<p>{md(alt['how_to_choose'])}</p>",
        '<h2 id="faq">FAQ</h2>' + faq_block(alt["faqs"]),
        author_card(), article_foot({"testing_status": "research_only", "affiliate_note": "Plain official links unless disclosed."}),
        sources_block(alt["sources"]),
    ]
    return wrap_page(alt["title"], alt["meta_description"], depth, path, "".join(parts), active="alternatives", title_tag=alt.get("title_tag"))

def render_usecase(uc, depth) -> str:
    path = f"use-cases/{uc['slug']}/"
    index_page(uc["title"], uc["problem"][:110], rel(depth) + path, "usecase", "family password manager")
    recs = "".join(
        f"<div class='rm-pick'><span class='rm-pick__label'>#{x['rank']} · {esc(x['pick'].split(' — ')[0])}</span>"
        f"<span class='rm-pick__value'>{esc(x['pick'].split(' — ')[1] if ' — ' in x['pick'] else '')}</span>"
        f"<span class='rm-pick__why'>{esc(x['price_context'])} — {esc(x['why'])}</span>"
        f"<span class='rm-pick__go'><a href='{rel(depth)}{x['href']}'>Full review →</a></span></div>"
        for x in uc["recommendations"])
    parts = [
        breadcrumbs([("Home", "index.html"), ("Use Cases", "categories/index.html"), (uc["title"], "")], rel(depth)),
        f'<div class="rm-article__meta">{badge("verified")}<span class="rm-meta"><strong>Last verified: {esc(uc.get("updated", "2026-09-06"))}</strong></span></div>',
        f"<h1>{esc(uc['title'])}</h1>",
        f"<p><strong>Who this is for:</strong> {esc(uc['audience'])}</p>",
        f"<p><strong>The problem:</strong> {esc(uc['problem'])}</p>",
        "<h2>What actually matters for families</h2><ul>" + "".join(f"<li>{esc(r)}</li>" for r in uc["requirements"]) + "</ul>",
        "<h2>The recommendations, ranked</h2>",
        f"<div class='rm-grid rm-grid--2'>{recs}</div>",
        "<h2>The decision, compressed</h2>", f"<p>{esc(uc['comparison_note'])}</p>",
        "<h2>Budget guidance</h2>", f"<p>{esc(uc['budget_guidance'])}</p>",
        '<h2 id="faq">FAQ</h2>' + faq_block(uc["faqs"]),
        author_card(), article_foot({"testing_status": "research_only", "affiliate_note": "Verified family-plan prices from official vendor pages."}),
        sources_block(uc["sources"]),
    ]
    return wrap_page(uc["title"], uc["meta_description"], depth, path, "".join(parts), title_tag=uc.get("title_tag"))

def render_brand(b, depth) -> str:
    path = f"brands/{b['slug']}/"
    index_page(b["name"] + " — brand hub", b["summary"][:110], rel(depth) + path, "brand", b["name"] + " pricing")
    rels = "".join(f'<a class="rm-btn rm-btn--sm rm-btn--ghost" href="{rel(depth)}{x["href"]}" style="margin:0 8px 8px 0">{esc(x["label"])}</a>' for x in b["relations"])
    aff = {"public_program_reported": badge("unverified", None).replace("Unverified", "Affiliate program (public, reported)"),
           "none_found": '<span class="rm-badge rm-badge--verified">No affiliate program found — plain links</span>',
           "unverified": '<span class="rm-badge rm-badge--unverified">Affiliate status unverified — plain links</span>'}[b["affiliate_status"]]
    parts = [
        breadcrumbs([("Home", "index.html"), ("Brands", "categories/index.html"), (b["name"], "")], rel(depth)),
        f"<h1>{esc(b['name'])}</h1>",
        f'<p class="rm-meta"><strong>{esc(b["parent"])}</strong> · {esc(b["jurisdiction"])} · <a href="{esc(b["official_url"])}" rel="noopener nofollow" target="_blank">Official site ↗</a> · {aff}</p>',
        f"<p>{esc(b['summary'])}</p>",
        "<h2>Pricing (verified framing)</h2>", f"<p>{esc(b['pricing_summary'])}</p>",
        "<h2>Strengths</h2><ul>" + "".join(f"<li>{esc(x)}</li>" for x in b["strengths"]) + "</ul>",
        "<h2>Weaknesses</h2><ul>" + "".join(f"<li>{esc(x)}</li>" for x in b["weaknesses"]) + "</ul>",
        "<h2>Explore</h2>", f"<p>{rels}</p>",
        f"<p class='rm-meta'>{esc(b['affiliate_note'])}</p>",
        sources_block([{"label": f"{b['name']} — official site", "url": b["official_url"]}]),
    ]
    return wrap_page(f"{b['name']} — ReadMeHub brand hub", b["summary"][:150], depth, path, "".join(parts))

# ---------------------------------------------------------------------------
# HUBS, DEALS, TRUST, INDEXES
# ---------------------------------------------------------------------------

def render_category_index(hubs, depth) -> str:
    path = "categories/"
    cards = ""
    for c in hubs["category_index"]["categories"]:
        live = c.get("status") == "live"
        cls = "" if live else " rm-catcard--research"
        href = rel(depth) + (c["href"] + "index.html" if live else path + "index.html")
        ents = ("Entities: " + ", ".join(c["entities"])) if c.get("entities") else c.get("desc", "In research — launches after price verification.")
        cards += (f'<a class="rm-catcard{cls}" href="{href}"><span class="rm-catcard__icon" aria-hidden="true">▸</span>'
                  f'<span class="rm-catcard__name">{esc(c["name"])}</span><span class="rm-catcard__desc">{esc(ents)}</span>'
                  f'<span style="margin-top:6px">{badge("live" if live else "research")}</span></a>')
    body = breadcrumbs([("Home", "index.html"), ("Categories", "")], rel(depth)) + \
        f"<h1>{esc(hubs['category_index']['title'])}</h1><p>{esc(hubs['category_index']['intro'])}</p><div class='rm-grid rm-grid--3'>{cards}</div>"
    return wrap_page(hubs["category_index"]["title"], hubs["category_index"]["meta_description"], depth, path, body, active="categories")

def render_pm_hub(hubs, reviews, depth) -> str:
    path = "categories/password-managers/"
    hub = hubs["password_managers_hub"]
    picks = "".join(f'<a class="rm-pick" href="{rel(depth)}{p["href"]}index.html"><span class="rm-pick__label">{esc(p["label"])}</span>'
                    f'<span class="rm-pick__value">{esc(p["value"])}</span><span class="rm-pick__why">{esc(p["note"])}</span>'
                    f'<span class="rm-pick__go">See research →</span></a>' for p in hub["best_picks"])
    def group(title, items, base):
        lis = "".join(f'<li><a href="{rel(depth)}{base}{x["href"]}index.html">{esc(x["name"])}</a> — <em>{esc(x.get("verdict", x.get("desc", x.get("title",""))))}</em></li>' for x in items)
        return f"<h2>{esc(title)}</h2><ul>{lis}</ul>"
    body = (
        breadcrumbs([("Home", "index.html"), ("Categories", "categories/index.html"), ("Password Managers", "")], rel(depth)) +
        f'<span class="rm-overline">Category hub</span><h1>{esc(hub["title"])}</h1>' +
        f"<p>{esc(hub['intro'])}</p>" +
        '<h2>Best picks at a glance</h2>' + f'<div class="rm-grid rm-grid--2">{picks}</div>' +
        group("Reviews", hub["reviews"], "") + group("Comparisons", hub["comparisons"], "") + group("Brand hubs", hub.get("brands", []), "") +
        group("Guides & decision frameworks", hub["guides"], "") + group("Use cases", hub["usecases"], "") +
        group("Alternatives", hub["alternatives"], "") +
        f"<h2>Deals</h2><p><a href='{rel(depth)}deals/index.html'>{esc(hub['deals_teaser']['label'])}</a> — {esc(hub['deals_teaser']['desc'])}</p>" +
        '<h2>FAQ</h2>' + faq_block(hub["faq"]) + author_card()
    )
    return wrap_page(hub["title"], hub["meta_description"], depth, path, body, active="categories")

def render_deals(hubs, depth) -> str:
    path = "deals/"
    hub = hubs["deals_hub"]
    deals = "".join(
        f'<article class="rm-deal"><div class="rm-deal__top"><span class="rm-deal__brand">{esc(d["brand"])} <span class="rm-meta">· {esc(d["type"])}</span></span>{badge(d["status"], d.get("checked"))}</div>'
        f'<div class="rm-deal__offer">{esc(d["offer"])}</div>'
        f'<div class="rm-deal__meta"><strong>Terms:</strong> {esc(d["terms"])}<br><strong>Regions:</strong> {esc(", ".join(d["regions"]))} · <strong>Source:</strong> <a href="{esc(d["source_url"])}" rel="noopener nofollow" target="_blank">official page ↗</a></div>'
        f'<div class="rm-deal__foot"><span class="rm-meta">Checked {esc(d["checked"])}</span>'
        f'<a class="rm-btn rm-btn--sm rm-btn--brand" href="{esc(d["destination"])}" rel="noopener nofollow sponsored" target="_blank">View at {esc(d["brand"])}</a></div></article>'
        for d in hub["deals"])
    body = (
        breadcrumbs([("Home", "index.html"), ("Deals", "")], rel(depth)) +
        '<span class="rm-overline">Deals & coupons</span>' +
        f"<h1>{esc(hub['title'])}</h1>" +
        f"<p>{esc(hub['policy'])}</p>" +
        f"<p class='rm-meta'>Last full sweep: <strong>{esc(hub['last_sweep'])}</strong>. Statuses degrade automatically if a re-check is missed — stale 'verified' badges cannot persist.</p>" +
        f"<div class='rm-grid rm-grid--2'>{deals}</div>" +
        f"<h2>Why no coupon codes?</h2><p>{esc(hub['no_codes_statement'])}</p>" +
        f"<p><em>{esc(hub['seasonal_note'])}</em></p>" +
        author_card()
    )
    return wrap_page(hub["title"], hub["meta_description"], depth, path, body, active="deals")

def render_trust_page(p, site, depth) -> str:
    path = p["slug"] + "/"
    index_page(p["title"], p["meta_description"][:110], rel(depth) + path, "page", p["slug"])
    blocks = ""
    for b in p["blocks"]:
        anchor = f' id="{b["id"]}"' if b.get("id") else ""
        blocks += f"<h2{anchor}>{esc(b['h2'])}</h2>"
        if "p" in b:
            blocks += f"<p>{esc(b['p'])}</p>"
        if "list" in b:
            blocks += "<ul>" + "".join(f"<li>{esc(x)}</li>" for x in b["list"]) + "</ul>"
    body = breadcrumbs([("Home", "index.html"), (p["title"], "")], rel(depth)) + f"<h1>{esc(p['title'])}</h1>" + blocks + author_card()
    return wrap_page(p["title"], p["meta_description"], depth, path, body, active=p["slug"])

def render_list_index(title, note, meta, items, depth, path, active) -> str:
    cards = "".join(card(t, c, b, rel(depth) + href, m) for (t, c, b, href, m) in items)
    body = breadcrumbs([("Home", "index.html"), (title, "")], rel(depth)) + \
        f'<span class="rm-overline">Index</span><h1>{esc(title)}</h1><p>{esc(note)}</p><div class="rm-grid rm-grid--3">{cards}</div>'
    return wrap_page(title, meta, depth, path, body, active=active)

# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def build() -> list[dict]:
    global SITE
    site = load("site.json")
    SITE = site
    reviews = load("reviews.json")
    comparisons = load("comparisons.json")
    editorial = load("editorial.json")
    brands = load("brands.json")
    hubs = load("hubs.json")
    trust = load("trust.json")

    print("Rendering ReadMeHub preview…")
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(exist_ok=True)

    # assets
    (OUT / "assets" / "css").mkdir(parents=True, exist_ok=True)
    (OUT / "assets" / "js").mkdir(parents=True, exist_ok=True)
    (OUT / "assets" / "img").mkdir(parents=True, exist_ok=True)
    shutil.copy(ROOT / "assets/css/readmehub.css", OUT / "assets/css/readmehub.css")
    shutil.copy(ROOT / "assets/js/main.js", OUT / "assets/js/main.js")
    (OUT / "assets/img/logo.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#14213d"/>'
        '<text x="32" y="43" font-family="Arial,sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">R</text>'
        '<circle cx="47" cy="40" r="6" fill="#e8590c"/></svg>', encoding="utf-8")

    # robots + sitemap
    (OUT / "robots.txt").write_text("User-agent: *\nAllow: /\nSitemap: https://readmehub.com/sitemap.xml\n", encoding="utf-8")

    # homepage
    w(OUT / "index.html", render_home(site))

    # reviews
    for r in reviews["reviews"]:
        w(OUT / "reviews" / r["slug"] / "index.html", render_review(r, reviews["category"], 2))
    w(OUT / "reviews" / "index.html", render_list_index(
        "All Reviews",
        reviews["reviews"] and "Research-based, verdict-first, verified pricing. No fabricated ratings — qualitative verdicts only.",
        "Every ReadMeHub review: research-based, verdict-first, with prices verified at official sources and dates on every page.",
        [(r["brand"] + " — review", reviews["category"]["name"], r["short_verdict"][:120], f"reviews/{r['slug']}/", "Updated " + r["updated"]) for r in reviews["reviews"]],
        1, "reviews/", "reviews"))

    # comparison
    for cp in comparisons["comparisons"]:
        w(OUT / "compare" / cp["slug"] / "index.html", render_comparison(cp, 2))
    w(OUT / "compare" / "index.html", render_list_index(
        "All Comparisons",
        "Every head-to-head opens with the verdict: choose X if, choose Y if — verified prices on both sides.",
        "Head-to-head software comparisons that open with the verdict — with prices verified at official sources.",
        [(f"{cp['a']['name']} vs {cp['b']['name']}", "Comparison", cp["quick_verdict"][:120], f"compare/{cp['slug']}/", "Updated " + cp["updated"]) for cp in comparisons["comparisons"]],
        1, "compare/", "compare"))

    # guides (incl. pillar)
    pillar = editorial["pillar"]
    w(OUT / "best" / "password-managers" / "index.html", render_guide(pillar, 2, pillar=True))
    for g in editorial["guides"]:
        w(OUT / "guides" / g["slug"] / "index.html", render_guide(g, 2))
    w(OUT / "guides" / "index.html", render_list_index(
        "All Guides",
        "Decision frameworks, explainers, and migration guides — understand before you buy.",
        "Decision frameworks, explainers, and migration guides — the learning hub behind every ReadMeHub recommendation.",
        [(pillar["title"], "Pillar guide", pillar["answer"][:120], "best/password-managers/", "Updated " + pillar["updated"])] +
        [(g["title"], "Guide", g["answer"][:120], f"guides/{g['slug']}/", "Updated " + g["updated"]) for g in editorial["guides"]],
        1, "guides/", "guides"))

    # alternatives
    for alt in editorial["alternatives"]:
        w(OUT / "alternatives" / alt["slug"] / "index.html", render_alternative(alt, 2))
    w(OUT / "alternatives" / "index.html", render_list_index(
        "All Alternatives",
        "Organized by the real reasons people switch — not generic competitor lists.",
        "Alternatives pages organized by the real reasons people switch products.",
        [(alt["title"], "Alternatives", alt["answer"][:120], f"alternatives/{alt['slug']}/", "Updated " + alt["updated"]) for alt in editorial["alternatives"]],
        1, "alternatives/", "alternatives"))

    # use cases
    for uc in editorial["usecases"]:
        w(OUT / "use-cases" / uc["slug"] / "index.html", render_usecase(uc, 2))

    # brands
    for b in brands["brands"]:
        w(OUT / "brands" / b["slug"] / "index.html", render_brand(b, 2))

    # hubs + deals + trust
    w(OUT / "categories" / "index.html", render_category_index(hubs, 1))
    w(OUT / "categories" / "password-managers" / "index.html", render_pm_hub(hubs, reviews, 2))
    w(OUT / "deals" / "index.html", render_deals(hubs, 1))
    for p in trust["pages"]:
        w(OUT / p["slug"] / "index.html", render_trust_page(p, site, 1))

    # search index + sitemap
    pages = list(SEARCH_INDEX)
    (OUT / "assets" / "js" / "search-index.json").write_text(json.dumps(pages, ensure_ascii=False), encoding="utf-8")
    # inject the real index into every page's footer marker (single source: one JSON)
    marker = "<script>window.RMH_INDEX = window.RMH_INDEX || [];</script>"
    injected = "<script>window.RMH_INDEX=" + json.dumps(pages, ensure_ascii=False) + ";</script>"
    for f in OUT.rglob("*.html"):
        t = f.read_text(encoding="utf-8")
        if marker in t:
            f.write_text(t.replace(marker, injected), encoding="utf-8")
    urls = ["", "categories/", "reviews/", "compare/", "guides/", "alternatives/", "deals/"]
    urls += [p["href"] for p in pages if not p["href"].endswith("index.html")]
    urls = sorted(set(u for u in urls))
    sm = "".join(f"<url><loc>https://readmehub.com/{esc(u)}</loc><lastmod>2026-09-06</lastmod></url>" for u in urls)
    (OUT / "sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{sm}</urlset>', encoding="utf-8")

    print(f"Done. {len(pages)} pages indexed.")
    return pages

if __name__ == "__main__":
    build()
    if "--serve" in sys.argv:
        import http.server
        import socketserver
        port = int(sys.argv[sys.argv.index("--serve") + 1]) if len(sys.argv) > sys.argv.index("--serve") + 1 else 8000
        handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("0.0.0.0", port), handler) as httpd:
            print(f"Serving preview at http://0.0.0.0:{port} — Ctrl+C to stop.")
            httpd.serve_forever()
