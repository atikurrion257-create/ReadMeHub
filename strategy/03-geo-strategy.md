# Phase 3 — GEO (Generative Engine Optimization) & Regional Strategy

Two distinct concerns, both handled deliberately: **GEO** (being understood and cited by answer engines) and **regional relevance** (US/CA/UK/AU without doorway spam).

## A. GEO: making every important page machine-extractable

Answer engines (Google AI Overviews / AI Mode, ChatGPT-style search, Perplexity) favor pages whose core answer can be extracted cleanly. Every commercial page ships a fixed "answer architecture" **above** the deep analysis:

1. **Verdict box** — direct answer in the first 120 words: what's recommended, for whom, starting price (verified), one-line why.
2. **Key facts** — bulleted, entity-explicit (full product names + brands, not "it").
3. **Comparison table** — semantic HTML `<table>` with headers (not CSS-grid divs), price + billing term + last-verified columns.
4. **Choose-X-if / Choose-Y-if** — condition-structured recommendations (easy for LLMs to quote).
5. **Who should avoid** — negative-space guidance; rare in the SERP, high citation value.
6. **FAQ** — only questions with genuine demand; each answer is self-contained in 40–60 words.
7. **Methodology + sources + "Last updated"** — every money page; dates in visible text, not just schema.

**Entity discipline:** entities are written consistently and fully on first mention per page ("1Password (by AgileBits, now part of 1Password Business)…"), and each page links the brand hub ↔ reviews ↔ comparisons ↔ category, giving engines a coherent knowledge graph (Phase 29 mapping lives in `08-internal-linking-and-schema.md`).

**Anti-GEO mistakes explicitly avoided:** no hidden "AI summary" text duplicating content; no key-takeaway blocks stuffed with keywords; schema never exceeds visible content.

## B. Regional framework (US → CA → UK → AU)

**Principle:** one canonical page per topic; regional differences appear *inside* the page only where they are real. No `/uk/`, `/us/` twins.

| Dimension | Treatment for the launch cluster |
|---|---|
| Currency | Prices shown in USD (vendor default) with an in-page note: "Vendors typically bill in your local currency; check checkout for CAD/GBP/AUD." No invented conversions. |
| Pricing differences | Verified where real (e.g., regional promotional pricing exists for Nord Security/Proton — noted as "regional promotions vary; the official checkout shows your local price"). |
| Taxes | One line where relevant: US sales tax added at checkout varies by state; UK/AU prices typically include VAT/GST when billed locally. Only stated where verifiable as common practice; otherwise omitted. |
| Availability | Password managers in the launch set are globally available (verified on vendor pages); no availability-specific pages needed. A future VPN vertical would trigger genuine geo pages (server presence, jurisdiction — real differences). |
| Data residency / jurisdiction | Included as a decision factor where it is genuinely material (Proton = Switzerland; Bitwarden = US with EU region for business; self-hosting option). This is meaningful geo content, not doorway content. |
| Compliance mentions | Only where documentable (e.g., Bitwarden SOC 2, Proton ISO 27001 claims as stated by vendors, with "as reported by vendor" framing until independently confirmed). |

**Geo QA gate (Phase 41):** a regional claim ships only with (1) an official-vendor source or (2) multiple corroborating sources, and always with a verification date. The evidence ledger carries a `geo` column for this.

## C. Answer-engine-ready page patterns

- **Pillar:** opens with "Best password managers at a glance" table + one-paragraph direct answer.
- **Review:** opens with verdict box (verdict, best for, not ideal for, starting price, last verified).
- **Comparison:** opens with "1Password vs Bitwarden — the short answer" + choose-if lists.
- **Deals hub:** opens with verification policy sentence + status table (Verified / Unverified-official / None found).

Each pattern is enforced in templates (Elementor structures + preview renderer), so it cannot regress as new pages are added.
