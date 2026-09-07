/**
 * TeamRion — Legal & Governance Pages
 * 1. Privacy Policy
 * 2. Terms of Service
 */

const LEGAL_PAGES = {
  // --------------------------------------------------------------------------
  // PRIVACY POLICY
  // --------------------------------------------------------------------------
  'privacy': {
    title: 'Privacy Policy — TeamRion',
    meta: 'TeamRion Privacy Policy: Data collection, attribution tracking standards, GDPR/CCPA compliance, and first-party data security.',
    render: () => `
      <section class="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="masking-tape mb-3">LEGAL & COMPLIANCE</div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text mb-4">
            Privacy Policy
          </h1>
          <p class="text-xs font-mono text-[#718096]">LAST UPDATED: SEPTEMBER 2026 // VERSION 2.4</p>
        </div>

        <div class="bolted-card p-8 rounded-2xl space-y-6 text-sm text-[#4a5568] leading-relaxed">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>

          <div>
            <h2 class="text-base font-bold text-[#2d3436] mb-2">1. Data Controller & Scope</h2>
            <p>TeamRion ("we," "our," or "us") operates marketing and digital growth services. This Privacy Policy details how we collect, store, and process personal information through our website and client growth infrastructure in compliance with GDPR, CCPA, and global privacy standards.</p>
          </div>

          <div>
            <h2 class="text-base font-bold text-[#2d3436] mb-2">2. First-Party Telemetry & Tracking Standards</h2>
            <p>We believe in privacy-conscious, first-party data architectures. We utilize Server-Side Google Tag Manager (sGTM) and first-party cookie domains to preserve data privacy while complying with user consent preferences.</p>
          </div>

          <div>
            <h2 class="text-base font-bold text-[#2d3436] mb-2">3. Client Data Confidentiality</h2>
            <p>All client performance metrics, ad account access, and CRM data are protected under strict Non-Disclosure Agreements (NDAs). We never sell, rent, or share proprietary client data.</p>
          </div>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // TERMS OF SERVICE
  // --------------------------------------------------------------------------
  'terms': {
    title: 'Terms of Service — TeamRion',
    meta: 'TeamRion Terms of Service: Master Service Agreements, sprint delivery terms, retainer billing cycles, and intellectual property ownership.',
    render: () => `
      <section class="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="masking-tape mb-3">LEGAL & COMPLIANCE</div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text mb-4">
            Terms of Service
          </h1>
          <p class="text-xs font-mono text-[#718096]">LAST UPDATED: SEPTEMBER 2026 // VERSION 2.4</p>
        </div>

        <div class="bolted-card p-8 rounded-2xl space-y-6 text-sm text-[#4a5568] leading-relaxed">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>

          <div>
            <h2 class="text-base font-bold text-[#2d3436] mb-2">1. Engagement Framework & SOWs</h2>
            <p>Services provided by TeamRion are governed by individual Statements of Work (SOWs) specifying deliverables, sprint turnaround timelines, and banded retainer fees.</p>
          </div>

          <div>
            <h2 class="text-base font-bold text-[#2d3436] mb-2">2. 100% Client IP Ownership</h2>
            <p>Upon full payment of applicable fees, the client retains 100% ownership of all web assets, Elementor templates, custom scripts, ad creative, and analytics dashboards produced during the engagement.</p>
          </div>

          <div>
            <h2 class="text-base font-bold text-[#2d3436] mb-2">3. Retainer Cancellation & Terms</h2>
            <p>Our monthly Growth Retainers operate with a standard 30-day written cancellation notice, allowing seamless offboarding or handover to internal teams.</p>
          </div>
        </div>
      </section>
    `
  }
};

window.LEGAL_PAGES = LEGAL_PAGES;
