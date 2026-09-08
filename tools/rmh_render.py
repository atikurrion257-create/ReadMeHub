#!/usr/bin/env python3
"""
ReadMeHub shared renderer.

Single source of truth for HTML output:
  - tools/render_preview.py  -> static preview site (index.html + preview/*)
  - tools/build_wxr.py       -> WordPress WXR import (bodies use the same HTML)

Design system CSS: assets/css/readmehub.css (mirrored into the child theme).
Content sources:   content/*.json
Honesty rules:     no fabricated ratings/prices/dates; verification statuses
                   rendered exactly as stated in the content model.
"""
from __future__ import annotations
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
C = ROOT / "content"

def load(name: str):
    return json.loads((C / name).read_text(encoding="utf-8"))

def esc(s) -> str:
    return html.escape(str(s if s is not None else ""), quote=True)

def md(text: str) -> str:
    """Tiny inline formatter: **bold** and `code` only. No surprises."""
    text = esc(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    return text

def paras(items) -> str:
    if isinstance(items, str):
        items = [items]
    return "".join(f"<p>{md(p)}</p>" for p in items)

# ---------------------------------------------------------------------------
# Site chrome
# ---------------------------------------------------------------------------

def base_href(depth: int) -> str:
    return "./" * depth if depth else "./"

def page_head(title: str, description: str, depth: int, canonical_path: str, schema: dict | None = None) -> str:
    rel = "../" * depth
    ld = ""
    if schema:
        ld = f'\n  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>'
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <link rel="canonical" href="https://readmehub.com/{canonical_path.lstrip('/')}">
  <meta property="og:site_name" content="ReadMeHub">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:type" content="website">
  <link rel="icon" href="{rel}assets/img/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="{rel}assets/css/readmehub.css">
{ld}
</head>"""

NAV_ITEM = '<a href="{href}" data-nav>{label}</a>'

def chrome_header(site: dict, depth: int, active: str = "") -> str:
    rel = "../" * depth
    nav = ""
    for item in site["nav"]["primary"]:
        href = rel + item["href"]
        cur = ' aria-current="page"' if active and active in item["href"] else ""
        nav += f'<a href="{href}"{cur}>{esc(item["label"])}</a>'
    mega_main = ""
    for item in site["nav"]["primary"]:
        mega_main += f'<a href="{rel}{item["href"]}"><b>{esc(item["label"])}</b><span>{esc(item["desc"])}</span></a>'
    mega_intents = ""
    for item in site["nav"]["intents"]:
        mega_intents += f'<a href="{rel}{item["href"]}"><b>{esc(item["label"])}</b><span>{esc(item["desc"])}</span></a>'
    return f"""
<a class="rm-skip" href="#main">Skip to content</a>
<header class="rm-header">
  <div class="rm-container rm-header__bar">
    <a class="rm-logo" href="{rel}index.html" aria-label="ReadMeHub home">
      <span class="rm-logo__mark" aria-hidden="true">R<i>.</i></span>
      <span class="rm-logo__word">ReadMe<i>Hub</i></span>
    </a>
    <button class="rm-menu-btn" data-menu-btn aria-expanded="false" aria-controls="rm-mega" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
    <nav class="rm-nav" aria-label="Primary">{nav}</nav>
    <button class="rm-menu-btn" data-search-btn aria-label="Open search" style="margin-left:0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    </button>
  </div>
  <div class="rm-mega" id="rm-mega" data-mega>
    <div class="rm-container rm-mega__grid">
      <div><p class="rm-mega__label">Explore by section</p><div class="rm-mega__links">{mega_main}</div></div>
      <div><p class="rm-mega__label">Explore by intent</p><div class="rm-mega__links" style="grid-template-columns:1fr">{mega_intents}</div></div>
    </div>
  </div>
  <div class="rm-searchbar" data-searchbar>
    <div class="rm-container">
      <form role="search" onsubmit="return false">
        <input type="search" data-search-input placeholder="Search reviews, comparisons, brands, deals…" aria-label="Search ReadMeHub">
        <button class="rm-btn rm-btn--sm rm-btn--brand" type="submit">Search</button>
      </form>
    </div>
  </div>
  <div class="rm-searchbar" data-searchbar-results style="padding:0">
    <div class="rm-searchresults" data-search-results></div>
  </div>
</header>"""

def chrome_footer(site: dict, depth: int) -> str:
    rel = "../" * depth
    cols = ""
    for col in site["footer"]["cols"]:
        links = "".join(f'<li><a href="{rel}{l["href"]}">{esc(l["label"])}</a></li>' for l in col["links"])
        cols += f'<div><p class="rm-footer__title">{esc(col["title"])}</p><ul>{links}</ul></div>'
    year = "2026"
    return f"""
<footer class="rm-footer">
  <div class="rm-container">
    <div class="rm-footer__grid">
      <div class="rm-footer__brand">
        <a class="rm-logo" href="{rel}index.html"><span class="rm-logo__mark" aria-hidden="true">R<i>.</i></span><span class="rm-logo__word" style="color:#fff">ReadMe<i>Hub</i></span></a>
        <p>{esc(site["footer"]["blurb"])}</p>
      </div>
      {cols}
    </div>
    <div class="rm-footer__legal">
      <span>{esc(site["footer"]["copyright"])}</span>
      <span>{esc(site["footer"]["social_note"])}</span>
    </div>
  </div>
</footer>
<script>window.RMH_INDEX = window.RMH_INDEX || [];</script>
<script src="{rel}assets/js/main.js"></script>"""

# ---------------------------------------------------------------------------
# Reusable components
# ---------------------------------------------------------------------------

def badge(status: str, checked: str | None = None) -> str:
    labels = {
        "verified": ("rm-badge--verified", "Verified"),
        "official": ("rm-badge--official", "Official"),
        "unverified": ("rm-badge--unverified", "Unverified"),
        "expired": ("rm-badge--expired", "Expired"),
        "none": ("rm-badge--none", "No offer found"),
        "live": ("rm-badge--live", "Live"),
        "research": ("rm-badge--research", "In research"),
    }
    cls, label = labels.get(status, ("rm-badge--unverified", status))
    if status == "verified" and checked:
        label += f" · checked {checked}"
    return f'<span class="rm-badge {cls}">{esc(label)}</span>'

def verdict_box(label: str, text: str) -> str:
    return f'<div class="rm-verdict"><div class="rm-verdict__label">{esc(label)}</div><p>{md(text)}</p></div>'

def fit_lists(best_for, not_for) -> str:
    def col(rows, cls, title):
        lis = "".join(
            f'<li><b>{esc(r["audience"])}</b><span>{esc(r["reason"])}</span></li>' for r in rows
        )
        return f'<div class="rm-fit__col {cls}"><div class="rm-fit__head">{title}</div><ul class="rm-fit__list">{lis}</ul></div>'
    return (f'<div class="rm-fit">{col(best_for, "rm-fit__col--yes", "Best for")}'
            f'{col(not_for, "rm-fit__col--no", "Not ideal for")}</div>')

def table(caption: str, columns: list, rows: list, cell_render=None) -> str:
    head = "".join(f'<th scope="col">{esc(c)}</th>' for c in columns)
    body = ""
    for row in rows:
        body += "<tr>"
        for i, cell in enumerate(row):
            # cell_render overrides per-call; default escapes. Callers that pass
            # pre-escaped/trusted HTML use lambda i, c: c.
            val = cell_render(i, cell) if cell_render else md(str(cell))
            cls = ' class="rm-price"' if i == 1 else ""
            body += f"<td{cls}>{val}</td>"
        body += "</tr>"
    return (f'<div class="rm-tablewrap"><div class="rm-tablewrap__hint">Swipe to see all columns →</div>'
            f'<table class="rm-table"><caption>{esc(caption)}</caption><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table></div>')

RAW = lambda i, c: c  # trusted cell renderer: caller has escaped content

def price_stamp(verified: str) -> str:
    return f' <span class="rm-badge rm-badge--verified">Verified {esc(verified)}</span>'

def pros_cons(pros, cons) -> str:
    def lis(items, icon):
        return "".join(f'<li>{md(x)}</li>' for x in items)
    return (f'<div class="rm-proscons">'
            f'<div class="rm-proscons__col rm-proscons__col--pros"><div class="rm-proscons__head">Pros</div><ul class="rm-proscons__list">{lis(pros, "+")}</ul></div>'
            f'<div class="rm-proscons__col rm-proscons__col--cons"><div class="rm-proscons__head">Cons</div><ul class="rm-proscons__list">{lis(cons, "–")}</ul></div>'
            f'</div>')

def faq_block(faqs) -> str:
    items = "".join(
        f'<details><summary>{esc(f["q"])}</summary><div class="rm-faq__a">{md(f["a"])}</div></details>'
        for f in faqs
    )
    return f'<div class="rm-faq" data-faq>{items}</div>'

def sources_block(sources) -> str:
    lis = "".join(f'<li><a href="{esc(s["url"])}" rel="noopener nofollow" target="_blank">{esc(s["label"])}</a></li>' for s in sources)
    return (f'<div class="rm-sources"><h2>Sources</h2><ol>{lis}</ol>'
            f'<p class="rm-meta">Primary sources are official vendor pages. Third-party sources corroborate facts we could not verify at the source — see each page’s verification date.</p></div>')

def article_foot(review_like: dict | None = None) -> str:
    parts = []
    if review_like:
        if review_like.get("testing_status") == "research_only":
            parts.append("<span><b>Methodology:</b> research-based review — verified pricing, documented features, labeled evidence. No hands-on lab testing was performed.</span>")
        parts.append(f"<span><b>Affiliate status:</b> {esc(review_like.get('affiliate_note','Plain official links.'))}</span>")
    return f'<div class="rm-articlefoot">{"".join(parts)}</div>'

def author_card() -> str:
    return ('<div class="rm-author"><div class="rm-author__avatar" aria-hidden="true">RH</div>'
            '<div><b>ReadMeHub Editorial Team</b><span>Pages are researched, verified, and owned by the editorial team — '
            'every money page carries a verification date, and corrections are published.</span></div></div>')

def breadcrumbs(items: list, rel: str) -> str:
    out = '<nav class="rm-breadcrumbs" aria-label="Breadcrumb"><ol style="list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;">'
    for i, (label, href) in enumerate(items):
        last = i == len(items) - 1
        if last or not href:
            out += f'<li><span aria-current="page">{esc(label)}</span></li>'
        else:
            out += f'<li><a href="{rel}{href}">{esc(label)}</a> <span aria-hidden="true">/</span></li>'
    return out + "</ol></nav>"

def card(title: str, cat: str, body: str, href: str, foot_meta: str = "") -> str:
    foot = f'<span class="rm-meta">{esc(foot_meta)}</span>' if foot_meta else "<span></span>"
    return (f'<a class="rm-card" href="{href}"><div class="rm-card__cat">{esc(cat)}</div>'
            f'<div class="rm-card__title">{esc(title)}</div><div class="rm-card__body">{esc(body)}</div>'
            f'<div class="rm-card__foot">{foot}<span class="rm-card__cta">Read →</span></div></a>')

def section_head(overline: str, title: str, sub: str = "") -> str:
    sub_html = f"<p>{esc(sub)}</p>" if sub else ""
    return (f'<div class="rm-section-head"><span class="rm-overline">{esc(overline)}</span>'
            f'<h2>{esc(title)}</h2>{sub_html}</div>')

def disclosure_box() -> str:
    return ('<p class="rm-disclosure"><strong>Affiliate disclosure:</strong> this page contains some outbound links '
            'that may earn ReadMeHub a commission if you subscribe — at no extra cost to you. Links are disclosed where used, '
            'commissions never determine verdicts, and pages without affiliate programs use plain links. '
            'See our <a href="AFFILIATE_PATH">Affiliate Disclosure</a>.</p>')
