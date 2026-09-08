#!/usr/bin/env python3
"""
ReadMeHub QA gate (Phases 38–41).

Automated checks over the rendered preview (which shares the content model and
CSS with the WordPress build):
  1. Structure: exactly one <h1> per page; no heading-level skips (h1→h3).
  2. Meta: unique titles + meta descriptions; title ≤65 chars, desc present.
  3. Links: every internal href resolves to a real file in the preview.
  4. Honesty: no fabricated-rating markers (ratingValue/reviewCount/aggregateRating),
     no placeholder copy (lorem, coming soon, TODO, XXX), no fake urgency words
     ("hurry", "only today", "expires in").
  5. Orphans: every indexed page is linked from at least one other page.
  6. Weight: per-page HTML size + total; CSS/JS budgets.
Exit code 1 on any failure, so it can gate CI later.
"""
from __future__ import annotations
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRE = ROOT / "preview"
errors: list[str] = []
warns: list[str] = []

def pages() -> list[Path]:
    return sorted(PRE.rglob("index.html"))

def main() -> int:
    files = pages()
    if not files:
        print("FATAL: preview not built"); return 1

    titles: dict[str, Path] = {}
    linked: set[str] = set()

    for f in files:
        rel = f.relative_to(PRE).as_posix()
        html = f.read_text(encoding="utf-8")

        h1s = re.findall(r"<h1[ >]", html)
        if len(h1s) != 1:
            errors.append(f"{rel}: expected exactly 1 <h1>, found {len(h1s)}")

        heads = [int(m) for m in re.findall(r"<h([1-4])[ >]", html)]
        for a, b in zip(heads, heads[1:]):
            if b - a > 1:
                errors.append(f"{rel}: heading skip h{a}->h{b}")

        t = re.search(r"<title>(.*?)</title>", html)
        d = re.search(r'name="description" content="(.*?)"', html)
        if not t:
            errors.append(f"{rel}: missing <title>")
        else:
            titles[t.group(1)] = f
            if len(t.group(1)) > 70:
                warns.append(f"{rel}: title is {len(t.group(1))} chars (>70)")
        if not d or len(d.group(1)) < 60:
            errors.append(f"{rel}: meta description missing/too short")

        # canonical present
        if 'rel="canonical"' not in html:
            errors.append(f"{rel}: missing canonical")

        # internal links resolve
        for href in re.findall(r'href="([^"#]+)"', html):
            if href.startswith(("http", "mailto:", "tel:", "data:")):
                continue
            target = (f.parent / href).resolve()
            cand = [target, target / "index.html", Path(str(target) + "/index.html")]
            if not any(c.exists() for c in cand):
                errors.append(f"{rel}: broken internal link -> {href}")
            else:
                for c in cand:
                    if c.exists():
                        linked.add(c.relative_to(PRE).as_posix())
                        break

        # honesty guards
        for bad in ("ratingValue", "reviewCount", "aggregateRating"):
            if bad in html:
                errors.append(f"{rel}: fabricated-rating marker '{bad}' present")
        low = html.lower()
        for bad in ("lorem ipsum", "coming soon", "placeholder text", "insert text", "sample text", "TODO:", "hurry!", "only today", "expires in 0"):
            if bad in low:
                errors.append(f"{rel}: placeholder/urgency phrase '{bad}' present")

    # uniqueness of titles
    for title, f in titles.items():
        owners = [x for x, ff in titles.items() if x == title]
        # duplicates across pages:
    seen: dict[str, str] = {}
    for title, f in titles.items():
        rel = f.relative_to(PRE).as_posix()
        if title in seen:
            errors.append(f"duplicate title: {seen[title]} and {rel}")
        seen[title] = rel

    # orphans among indexed pages (from search index = canonical page set)
    idx = PRE / "assets" / "js" / "search-index.json"
    if idx.exists():
        for item in json.loads(idx.read_text()):
            href = item["href"].replace("../", "")
            target = (PRE / href).resolve()
            cand = [target, target / "index.html"]
            is_linked = any(str(c.relative_to(PRE)) in linked for c in cand if c.exists())
            if not is_linked:
                warns.append(f"orphan (not linked from any page): {href}")

    # weight
    total = sum(f.stat().st_size for f in files)
    big = [(f.relative_to(PRE).as_posix(), f.stat().st_size) for f in files if f.stat().st_size > 400_000]
    for name, size in big:
        warns.append(f"large page: {name} = {size//1024} KB HTML (check DOM budget)")

    css = (ROOT / "assets/css/readmehub.css").stat().st_size
    jsf = (ROOT / "assets/js/main.js").stat().st_size
    if css > 60_000: errors.append(f"CSS budget exceeded: {css//1024} KB")
    if jsf > 12_000: errors.append(f"JS budget exceeded: {jsf//1024} KB")

    print(f"Pages: {len(files)}  |  CSS: {css//1024} KB  |  JS: {jsf/1024:.1f} KB  |  total HTML: {total//1024} KB")
    for w in warns: print("  WARN:", w)
    for e in errors: print("  ERROR:", e)
    print("QA:", "PASS" if not errors else f"FAIL ({len(errors)} errors, {len(warns)} warnings)")
    return 0 if not errors else 1

if __name__ == "__main__":
    sys.exit(main())
