#!/usr/bin/env python3
"""
Build the WordPress WXR import file (Phase 35 content import).

Reads content/*.json -> wordpress/content/readmehub-launch.xml (WXR 1.2).

Includes:
  - trust/legal pages (about, how-we-evaluate, editorial-policy, …)
  - deals hub page (slug deals-index, rewritten to /deals/ by the child theme)
  - categories index page + front-page placeholder (home)
  - rmh_brand x4, rmh_review x4, rmh_comparison x1, rmh_guide x3 (incl. pillar),
    rmh_alternative x1, rmh_usecase x1, rmh_deal x4
  - ACF postmeta (serialized PHP repeaters) for the full structured model
  - rmh_segment terms on every money page

Bodies are extracted from the SAME renderer used for the preview (single
source of truth), with relative links rewritten to site-absolute and the H1 /
breadcrumb / meta line removed (WordPress templates own those).

Usage: python3 tools/build_wxr.py
"""
from __future__ import annotations
import json
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

sys.path.insert(0, str(Path(__file__).parent))
from rmh_render import load
import render_preview as rp

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "wordpress/content/readmehub-launch.xml"
DATE = "2026-09-06 09:00:00"

# ---------------------------------------------------------------------------
# PHP serialization (for ACF repeaters stored in postmeta)
# ---------------------------------------------------------------------------

def php_serialize(value) -> str:
    if isinstance(value, bool):
        return "b:1;" if value else "b:0;"
    if isinstance(value, int):
        return f"i:{value};"
    if isinstance(value, float):
        return f"d:{value};"
    if isinstance(value, str):
        raw = value.encode("utf-8")
        return f's:{len(raw)}:"{value}";'
    if isinstance(value, list):
        return "a:" + str(len(value)) + ":{" + "".join(
            php_serialize(i) + php_serialize(v) for i, v in enumerate(value)) + "}"
    if isinstance(value, dict):
        keys = list(value.keys())
        return "a:" + str(len(keys)) + ":{" + "".join(
            php_serialize(str(k)) + php_serialize(v) for k, v in value.items()) + "}"
    if value is None:
        return "N;"
    raise TypeError(type(value))

# ---------------------------------------------------------------------------
# Body extraction from the shared renderer
# ---------------------------------------------------------------------------

def site_url_fix(body: str) -> str:
    """Rewrite relative hrefs to site-absolute paths (WP-safe)."""
    def fix(m):
        href = m.group(1)
        if href.startswith(("http", "mailto:", "tel:", "#", "/")):
            return m.group(0)
        return 'href="/' + href
    return re.sub(r'href="([^"]+)"', fix, body)

def extract_body(full_page_html: str) -> str:
    m = re.search(r"<main id=\"main\">(.*)</main>", full_page_html, re.S)
    if not m:
        raise RuntimeError("no <main> found")
    body = m.group(1)
    body = re.sub(r'<nav class="rm-breadcrumbs".*?</nav>', "", body, flags=re.S)
    body = re.sub(r'<div class="rm-article__meta">.*?</div>', "", body, flags=re.S)
    body = re.sub(r"<h1>.*?</h1>", "", body, count=1, flags=re.S)
    body = site_url_fix(body)
    return body.strip()

# ---------------------------------------------------------------------------
# WXR helpers
# ---------------------------------------------------------------------------

def cdata(s: str) -> str:
    return "<![CDATA[" + s.replace("]]>", "]]]]><![CDATA[>") + "]]>"

def postmeta(key: str, value: str) -> str:
    return f"\t\t<wp:postmeta>\n\t\t\t<wp:meta_key>{escape(key)}</wp:meta_key>\n\t\t\t<wp:meta_value>{cdata(value)}</wp:meta_value>\n\t\t</wp:postmeta>"

def acf_meta(mapping: dict) -> str:
    out = []
    for key, value in mapping.items():
        if value is None or value == "" or value == []:
            continue
        serialized = php_serialize(value) if isinstance(value, (list, dict, bool)) else str(value)
        out.append(postmeta(key, serialized))
    return "\n".join(out)

def item(title, slug, ptype, content, excerpt="", meta="", terms=None, menu_order=0):
    terms_xml = ""
    terms = terms or []
    for tax, dom, name in terms:
        terms_xml += (f"\t\t<category domain=\"{tax}\" nicename=\"{escape(dom)}\">{cdata(name)}</category>")
    return f"""	<item>
		<title>{cdata(title)}</title>
		<link>https://readmehub.com/{escape(slug)}/</link>
		<pubDate>Mon, 06 Sep 2026 09:00:00 +0000</pubDate>
		<dc:creator>{cdata("readmehub")}</dc:creator>
		<guid isPermaLink="false">https://readmehub.com/?post_type={ptype}&amp;p={escape(slug)}</guid>
		<description></description>
		<content:encoded>{cdata(content)}</content:encoded>
		<excerpt:encoded>{cdata(excerpt)}</excerpt:encoded>
		<wp:post_id></wp:post_id>
		<wp:post_date>{cdata(DATE)}</wp:post_date>
		<wp:post_date_gmt>{cdata(DATE)}</wp:post_date_gmt>
		<wp:comment_status>{cdata("closed")}</wp:comment_status>
		<wp:ping_status>{cdata("closed")}</wp:ping_status>
		<wp:post_name>{cdata(slug)}</wp:post_name>
		<wp:status>{cdata("publish")}</wp:status>
		<wp:post_parent>0</wp:post_parent>
		<wp:menu_order>{menu_order}</wp:menu_order>
		<wp:post_type>{cdata(ptype)}</wp:post_type>
		<wp:post_password></wp:post_password>
		<wp:is_sticky>0</wp:is_sticky>
{terms_xml}
{meta}
	</item>"""

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

def build() -> None:
    site = load("site.json")
    reviews = load("reviews.json")
    comparisons = load("comparisons.json")
    editorial = load("editorial.json")
    brands = load("brands.json")
    hubs = load("hubs.json")
    trust = load("trust.json")

    rp.build()  # renders preview AND fills the renderer's globals (SITE etc.)
    items = []
    segment = ("rmh_segment", "password-managers", "Password Managers")

    # ---- brands first (post_object targets) ----
    for b in brands["brands"]:
        full = rp.render_brand(b, 0)
        meta = acf_meta({
            "rmh_brand_parent": b["parent"],
            "rmh_brand_jurisdiction": b["jurisdiction"],
            "rmh_brand_summary": b["summary"],
            "rmh_brand_pricing": b["pricing_summary"],
            "rmh_brand_strengths": [{"text": x} for x in b["strengths"]],
            "rmh_brand_weaknesses": [{"text": x} for x in b["weaknesses"]],
            "rmh_affiliate_status": {"public_program_reported": "pending", "none_found": "none", "unverified": "none"}.get(b["affiliate_status"], "none"),
            "rmh_official_url": b["official_url"],
        })
        items.append(item(b["name"], b["slug"], "rmh_brand", extract_body(full),
                          excerpt=b["summary"][:150], meta=meta, terms=[segment]))

    # ---- reviews ----
    for r in reviews["reviews"]:
        full = rp.render_review(r, reviews["category"], 0)
        meta = acf_meta({
            "rmh_short_verdict": r["short_verdict"],
            "rmh_best_for": r["best_for"],
            "rmh_not_ideal_for": r["not_ideal_for"],
            "rmh_key_takeaways": [{"text": t} for t in r["key_takeaways"]],
            "rmh_plans": [{"plan_name": p["plan"], "plan_price": p["price"], "plan_billing": p["term"],
                           "plan_highlights": p["notes"], "plan_price_verified": "verified" in str(p.get("verified", "")).lower() or p["price"].startswith("$")}
                          for p in r["pricing"]["rows"]],
            "rmh_features": [{"feature": f["feature"], "assessment": f["assessment"]} for f in r["features"]],
            "rmh_pros": [{"text": x} for x in r["pros"]],
            "rmh_cons": [{"text": x} for x in r["cons"]],
            "rmh_faq": [{"q": f["q"], "a": f["a"]} for f in r["faq"]],
            "rmh_sources": [{"label": s["label"], "url": s["url"]} for s in r["sources"]],
            "rmh_last_verified": r["verified"],
            "rmh_testing_status": "research_only",
            "rmh_affiliate_status": {"public_program_reported": "pending", "none_found": "none", "unverified": "none"}.get(r["affiliate_status"], "none"),
            "rmh_official_url": r["official_url"],
            "rmh_product_name": r["brand"].split(" (")[0],
        })
        items.append(item(r["title"], r["slug"], "rmh_review", extract_body(full),
                          excerpt=r["short_verdict"], meta=meta, terms=[segment]))

    # ---- comparisons ----
    for cp in comparisons["comparisons"]:
        full = rp.render_comparison(cp, 0)
        meta = acf_meta({
            "rmh_short_verdict": cp["quick_verdict"],
            "rmh_verdict_a_for": cp["best_for_a"],
            "rmh_verdict_b_for": cp["best_for_b"],
            "rmh_choose_a": [{"text": x} for x in cp["choose_a_if"]],
            "rmh_choose_b": [{"text": x} for x in cp["choose_b_if"]],
            "rmh_matrix": [{"dimension": m["dimension"], "a_value": m["a"], "b_value": m["b"],
                            "winner": m["winner"], "interpretation": m["interpretation"]} for m in cp["matrix"]],
            "rmh_tiebreaker": cp["tiebreaker"],
            "rmh_faq": [{"q": f["q"], "a": f["a"]} for f in cp["faqs"]],
            "rmh_last_verified": cp["verified"],
            "rmh_testing_status": "research_only",
        })
        items.append(item(cp["title"], cp["slug"], "rmh_comparison", extract_body(full),
                          excerpt=cp["quick_verdict"], meta=meta, terms=[segment]))

    # ---- guides (pillar first) ----
    pillar = editorial["pillar"]
    full = rp.render_guide(pillar, 0, pillar=True)
    meta = acf_meta({
        "rmh_short_verdict": pillar["answer"],
        "rmh_direct_answer": pillar["answer"],
        "rmh_is_pillar": True,
        "rmh_framework": [{"situation": f["situation"], "pick": f["pick"], "why": f["why"]} for f in pillar["decision_framework"]],
        "rmh_faq": [{"q": f["q"], "a": f["a"]} for f in pillar["faqs"]],
        "rmh_last_verified": pillar["verified"],
    })
    items.append(item(pillar["title"], "password-managers", "rmh_guide", extract_body(full),
                      excerpt=pillar["answer"], meta=meta, terms=[segment]))

    for g in editorial["guides"]:
        full = rp.render_guide(g, 0)
        meta = acf_meta({
            "rmh_short_verdict": g["answer"],
            "rmh_direct_answer": g["answer"],
            "rmh_faq": [{"q": f["q"], "a": f["a"]} for f in g.get("faqs", [])],
            "rmh_last_verified": g["verified"],
        })
        items.append(item(g["title"], g["slug"], "rmh_guide", extract_body(full),
                          excerpt=g["answer"], meta=meta, terms=[segment]))

    # ---- alternatives ----
    for alt in editorial["alternatives"]:
        full = rp.render_alternative(alt, 0)
        meta = acf_meta({
            "rmh_short_verdict": alt["answer"],
            "rmh_direct_answer": alt["answer"],
            "rmh_churn_reasons": [{"reason": x["reason"], "evidence": x["detail"]} for x in alt["where_it_may_not_fit"]],
            "rmh_faq": [{"q": f["q"], "a": f["a"]} for f in alt["faqs"]],
            "rmh_last_verified": alt["verified"],
        })
        items.append(item(alt["title"], alt["slug"], "rmh_alternative", extract_body(full),
                          excerpt=alt["answer"], meta=meta, terms=[segment]))

    # ---- use cases ----
    for uc in editorial["usecases"]:
        full = rp.render_usecase(uc, 0)
        meta = acf_meta({
            "rmh_short_verdict": uc["comparison_note"],
            "rmh_uc_audience": uc["audience"],
            "rmh_uc_problem": uc["problem"],
            "rmh_uc_requirements": [{"text": x} for x in uc["requirements"]],
            "rmh_uc_recommendations": [{"rank": x["rank"], "pick": x["pick"], "price_context": x["price_context"], "why": x["why"]} for x in uc["recommendations"]],
            "rmh_uc_budget": uc["budget_guidance"],
            "rmh_faq": [{"q": f["q"], "a": f["a"]} for f in uc["faqs"]],
            "rmh_last_verified": uc.get("verified", "2026-09-06"),
        })
        items.append(item(uc["title"], uc["slug"], "rmh_usecase", extract_body(full),
                          excerpt=uc["problem"], meta=meta, terms=[segment]))

    # ---- deals (verified statuses travel with the data) ----
    for d in hubs["deals_hub"]["deals"]:
        status_map = {"verified": "verified", "official": "official", "unverified": "unverified", "none": "none"}
        title = f"{d['brand']} — {d['type']}"
        slug = d["brand"].lower().replace(" ", "-") + "-" + d["type"].lower().replace(" ", "-")
        meta = acf_meta({
            "rmh_offer_text": d["offer"],
            "rmh_deal_type": d["type"].lower().replace(" ", "-"),
            "rmh_verification_status": status_map.get(d["status"], "unverified"),
            "rmh_last_checked": d["checked"],
            "rmh_deal_source_url": d["source_url"],
            "rmh_deal_url": d["destination"],
            "rmh_terms": d["terms"],
            "rmh_region": [r.lower() if r != "US" else "us" for r in d["regions"]],
            "rmh_last_verified": d["checked"],
        })
        body = (f"<p><strong>Offer:</strong> {d['offer']}</p>"
                f"<p><strong>Terms:</strong> {d['terms']}</p>"
                f"<p><strong>Regions:</strong> {', '.join(d['regions'])}</p>"
                f"<p><strong>Official source:</strong> <a href=\"{d['source_url']}\" rel=\"nofollow noopener\" target=\"_blank\">vendor page</a> — checked {d['checked']}.</p>"
                f"<p><em>Status: {d['status']}. See the <a href=\"/deals/\">deals hub</a> for our verification policy.</em></p>")
        items.append(item(title, slug, "rmh_deal", body, excerpt=d["offer"][:140], meta=meta, terms=[segment]))

    # ---- trust/legal pages ----
    for p in trust["pages"]:
        full = rp.render_trust_page(p, site, 0)
        body = extract_body(full)
        items.append(item(p["title"], p["slug"], "page", body, excerpt=p["meta_description"][:150]))

    # ---- deals hub page (slug deals-index -> /deals/ via theme rewrite) ----
    full = rp.render_deals(hubs, 0)
    items.append(item("Deals & Coupons — verified or nothing", "deals-index", "page", extract_body(full),
                      excerpt=hubs["deals_hub"]["meta_description"][:150],
                      meta=postmeta("_wp_page_template", "elementor_header_footer")))

    # ---- categories index page ----
    full = rp.render_category_index(hubs, 0)
    items.append(item("All Categories", "categories", "page", extract_body(full),
                      excerpt=hubs["category_index"]["meta_description"][:150]))

    # ---- front page placeholder (Elementor homepage template assigns via Theme Builder) ----
    items.append(item("Home", "home", "page", "<p>Front page: rendered by the ReadMeHub Homepage Elementor template (Theme Builder location: Front Page). See INSTALL.md.</p>"))

    # ---- category hub page (password managers) ----
    full = rp.render_pm_hub(hubs, reviews, 0)
    items.append(item("Password Managers — the decision hub", "password-managers-hub", "page", extract_body(full),
                      excerpt=hubs["password_managers_hub"]["meta_description"][:150]))

    wxr = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
	xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
	<title>ReadMeHub</title>
	<link>https://readmehub.com</link>
	<description>{escape(site["brand"]["description"])}</description>
	<pubDate>Mon, 06 Sep 2026 09:00:00 +0000</pubDate>
	<language>en-US</language>
	<wp:wxr_version>1.2</wp:wxr_version>
	<wp:base_site_url>https://readmehub.com</wp:base_site_url>
	<wp:base_blog_url>https://readmehub.com</wp:base_blog_url>
	<wp:author><wp:author_id>1</wp:author_id><wp:author_login>{cdata("readmehub")}</wp:author_login><wp:author_email>{cdata("editorial@readmehub.com")}</wp:author_email><wp:author_display_name>{cdata("ReadMeHub Editorial Team")}</wp:author_display_name><wp:author_first_name>{cdata("")}</wp:author_first_name><wp:author_last_name>{cdata("")}</wp:author_last_name></wp:author>
{chr(10).join(items)}
</channel>
</rss>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(wxr, encoding="utf-8")
    print(f"WXR written: {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB, {len(items)} items)")

if __name__ == "__main__":
    build()
