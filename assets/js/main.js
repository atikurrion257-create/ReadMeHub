/* ReadMeHub — purposeful JS only (~4KB unminified).
   1) Mobile nav & search overlay
   2) Site search: groups results by content type (WP uses the native grouped
      search template; this powers the static preview identically)
   3) Decision Finder: gate step 2 on step 1 choice; no fake personalization —
      every route is a real page.
*/
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Mobile nav ---------- */
  var menuBtn = $("[data-menu-btn]");
  var mega = $("[data-mega]");
  if (menuBtn && mega) {
    menuBtn.addEventListener("click", function () {
      var open = mega.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mega.classList.contains("is-open")) {
        mega.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Site search ---------- */
  var searchBtn = $("[data-search-btn]");
  var searchBar = $("[data-searchbar]");
  var input = $("[data-search-input]");
  var results = $("[data-search-results]");
  var INDEX = window.RMH_INDEX || [];

  function openSearch() {
    if (!searchBar) return;
    searchBar.classList.add("is-open");
    if (input) input.focus();
  }
  function closeSearch() {
    if (!searchBar) return;
    searchBar.classList.remove("is-open");
    if (results) { results.classList.remove("is-open"); results.innerHTML = ""; }
    var wrap = results && results.closest("[data-searchbar-results]");
    if (wrap) wrap.classList.remove("is-open");
    $$("[data-search-input]").forEach(function (i) { i.value = ""; });
  }
  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSearch();
  });

  function groupLabel(t) {
    return { review: "Reviews", comparison: "Comparisons", guide: "Guides", deal: "Deals", brand: "Brands", category: "Categories", usecase: "Use cases", alternative: "Alternatives", page: "ReadMeHub" }[t] || "Pages";
  }
  function renderResults(q) {
    if (!results) return;
    q = q.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove("is-open"); results.innerHTML = ""; return; }
    var hits = INDEX.filter(function (item) {
      return (item.title + " " + (item.keywords || "")).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 12);
    if (!hits.length) {
      results.innerHTML = '<div class="rm-searchresults__empty">No matches for “' + q.replace(/[<>&]/g, "") + '”. Try a brand name (1Password, Bitwarden), “vs”, “free”, or “deals”.</div>';
    } else {
      var byType = {};
      hits.forEach(function (h) { (byType[h.type] = byType[h.type] || []).push(h); });
      var html = "";
      Object.keys(byType).forEach(function (t) {
        html += '<div class="rm-searchresults__group"><h5>' + groupLabel(t) + "</h5>";
        byType[t].forEach(function (h) {
          html += '<a href="' + h.href + '">' + h.title + (h.sub ? "<small>" + h.sub + "</small>" : "") + "</a>";
        });
        html += "</div>";
      });
      results.innerHTML = html;
    }
    results.classList.add("is-open");
    var wrap = results.closest("[data-searchbar-results]");
    if (wrap) wrap.classList.add("is-open");
  }
  $$("[data-search-input]").forEach(function (inp) {
    inp.addEventListener("input", function () {
      renderResults(inp.value);
      if (results && results.classList.contains("is-open")) {
        // keep both inputs in sync so the results panel matches either entry point
        $$("[data-search-input]").forEach(function (other) { if (other !== inp) other.value = inp.value; });
      }
    });
    var form = inp.closest("form");
    if (form) form.addEventListener("submit", function (e) { e.preventDefault(); renderResults(inp.value); openSearch(); });
  });

  /* ---------- Decision Finder ---------- */
  var finder = $("[data-finder]");
  if (finder) {
    var step2 = $("[data-finder-step2]", finder);
    var step2Label = $("[data-finder-step2-label]", finder);
    $$("[data-finder-choice]", finder).forEach(function (chip) {
      chip.addEventListener("click", function () {
        if (chip.getAttribute("aria-disabled") === "true") return;
        $$("[data-finder-choice]", finder).forEach(function (c) { c.classList.remove("is-selected"); });
        chip.classList.add("is-selected");
        if (step2) {
          step2.hidden = false;
          if (step2Label) step2Label.textContent = "Got it — “" + chip.textContent.trim() + "”. What matters most?";
        }
        var first = step2 && $("a", step2);
        if (first) first.focus();
      });
    });
  }

  /* ---------- FAQ: allow only one open per group (nicer scanning) ---------- */
  $$("[data-faq]").forEach(function (group) {
    var all = $$("details", group);
    all.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) all.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });
})();
