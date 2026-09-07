/**
 * TeamRion — Case Studies Index & Individual Case Study Template
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const PROOF_PAGES = {
  // --------------------------------------------------------------------------
  // CASE STUDIES INDEX
  // --------------------------------------------------------------------------
  'case-studies': {
    title: 'Metric-Led Case Studies — TeamRion',
    meta: 'Explore verified growth outcomes across B2B SaaS, Professional Services, and E-Commerce. Hard telemetry above the fold.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">TELEMETRY & PROOF</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Metric-Led Case <span class="text-[#ff4757]">Studies.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Every case study begins with hard pipeline numbers above the fold. No ambiguous screenshots without revenue attribution.
          </p>
          <div class="mt-4">
            <span class="placeholder-data-badge">● §4 PROTOCOL ACTIVE: SAMPLE TELEMETRY MARKED CLEARLY</span>
          </div>
        </div>

        <!-- Case Studies Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <!-- Case 1: B2B SaaS (Featured deep dive) -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between border-2 border-[#ff4757]/40 shadow-floating">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            
            <div>
              <div class="metric-readout-module mb-4">
                <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                  <span>SECTOR: B2B SAAS</span>
                  <span class="text-[#22c55e]">● 90-DAY RESULT</span>
                </div>
                <div class="text-3xl font-extrabold font-mono text-[#ff4757]">+142%</div>
                <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">ORGANIC PIPELINE REVENUE</div>
                <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
              </div>

              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-[#d1d9e6] shadow-recessed flex items-center justify-center font-mono font-bold text-[#718096] text-xs">
                  [LOGO]
                </div>
                <div>
                  <h3 class="font-bold text-[#2d3436] text-sm">[Client Name Placeholder — B2B Cloud Infrastructure]</h3>
                  <p class="text-[11px] font-mono text-[#718096]">Series B Enterprise Security</p>
                </div>
              </div>

              <p class="text-xs text-[#4a5568] leading-relaxed">
                Consolidated 3 separate vendors into TeamRion's unified SEO + GEO AI Search + LinkedIn Ads engine, accelerating SQL generation.
              </p>
            </div>

            <div class="pt-6 border-t border-[#d1d9e6] mt-4 flex items-center justify-between">
              <span class="text-[11px] font-mono text-[#718096]">FULL TELEMETRY</span>
              <a href="#/case-studies/saas-growth-pipeline" class="btn-physical-primary !py-2 !px-4 text-xs"><span>VIEW CASE &rarr;</span></a>
            </div>
          </div>

          <!-- Case 2: Professional Services -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            
            <div>
              <div class="metric-readout-module mb-4">
                <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                  <span>SECTOR: LEGAL ADVISORY</span>
                  <span class="text-[#06b6d4]">● AI SHARE</span>
                </div>
                <div class="text-3xl font-extrabold font-mono text-[#06b6d4]">#1 SHARE</div>
                <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">PERPLEXITY & CHATGPT CITATIONS</div>
                <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
              </div>

              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-[#d1d9e6] shadow-recessed flex items-center justify-center font-mono font-bold text-[#718096] text-xs">
                  [LOGO]
                </div>
                <div>
                  <h3 class="font-bold text-[#2d3436] text-sm">[Client Name Placeholder — Corporate Law]</h3>
                  <p class="text-[11px] font-mono text-[#718096]">National Advisory Practice</p>
                </div>
              </div>

              <p class="text-xs text-[#4a5568] leading-relaxed">
                Deployed structured entity graph schema and high-authority citation engineering to capture 74% share of AI-generated legal recommendations.
              </p>
            </div>

            <div class="pt-6 border-t border-[#d1d9e6] mt-4 flex items-center justify-between">
              <span class="text-[11px] font-mono text-[#718096]">FULL TELEMETRY</span>
              <a href="#/case-studies/saas-growth-pipeline" class="btn-physical-secondary !py-2 !px-4 text-xs"><span>VIEW CASE &rarr;</span></a>
            </div>
          </div>

          <!-- Case 3: E-commerce -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            
            <div>
              <div class="metric-readout-module mb-4">
                <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                  <span>SECTOR: DTC APPAREL</span>
                  <span class="text-[#22c55e]">● MULTICHANNEL</span>
                </div>
                <div class="text-3xl font-extrabold font-mono text-[#22c55e]">3.8x ROAS</div>
                <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">BLENDED REVENUE SCALE</div>
                <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
              </div>

              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-[#d1d9e6] shadow-recessed flex items-center justify-center font-mono font-bold text-[#718096] text-xs">
                  [LOGO]
                </div>
                <div>
                  <h3 class="font-bold text-[#2d3436] text-sm">[Client Name Placeholder — DTC Brand]</h3>
                  <p class="text-[11px] font-mono text-[#718096]">Shopify Plus Scale Brand</p>
                </div>
              </div>

              <p class="text-xs text-[#4a5568] leading-relaxed">
                Implemented Server-Side CAPI tracking, high-tempo UGC creative testing, and retention flows to scale ad spend profitably.
              </p>
            </div>

            <div class="pt-6 border-t border-[#d1d9e6] mt-4 flex items-center justify-between">
              <span class="text-[11px] font-mono text-[#718096]">FULL TELEMETRY</span>
              <a href="#/case-studies/saas-growth-pipeline" class="btn-physical-secondary !py-2 !px-4 text-xs"><span>VIEW CASE &rarr;</span></a>
            </div>
          </div>

        </div>

      </section>
    `
  },

  // --------------------------------------------------------------------------
  // INDIVIDUAL CASE STUDY TEMPLATE (DEEP DIVE WITH PLACEHOLDER DISCIPLINE)
  // --------------------------------------------------------------------------
  'case-studies/saas-growth-pipeline': {
    title: 'Case Study: Scaling B2B SaaS Pipeline by +142% — TeamRion',
    meta: 'How TeamRion unified SEO, GEO AI search, and LinkedIn Ads to deliver a +142% pipeline lift for an enterprise B2B SaaS client.',
    render: () => `
      <section class="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Case Study Header -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <a href="#/case-studies" class="text-xs font-mono text-[#ff4757] font-bold">&larr; ALL CASE STUDIES</a>
            <span class="text-[#718096]">/</span>
            <span class="text-xs font-mono text-[#718096]">SECTOR: B2B ENTERPRISE SAAS</span>
          </div>

          <h1 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text mb-6">
            How a Series B SaaS Brand Replaced 3 Agencies & Scaled Pipeline by <span class="text-[#ff4757]">+142%.</span>
          </h1>

          <!-- Prominent Recessed Metric Readout Above the Fold (§4) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div class="metric-readout-module">
              <div class="text-[10px] font-mono text-[#718096]">VERIFIED OUTCOME</div>
              <div class="text-3xl font-extrabold font-mono text-[#ff4757]">+142%</div>
              <div class="text-xs font-bold text-[#2d3436]">ORGANIC PIPELINE REVENUE</div>
              <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
            </div>
            <div class="metric-readout-module">
              <div class="text-[10px] font-mono text-[#718096]">AI SEARCH PROMPT SHARE</div>
              <div class="text-3xl font-extrabold font-mono text-[#06b6d4]">78.4%</div>
              <div class="text-xs font-bold text-[#2d3436]">PERPLEXITY / CHATGPT CITATIONS</div>
              <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
            </div>
            <div class="metric-readout-module">
              <div class="text-[10px] font-mono text-[#718096]">BLENDED CAC REDUCTION</div>
              <div class="text-3xl font-extrabold font-mono text-[#22c55e]">-38%</div>
              <div class="text-xs font-bold text-[#2d3436]">FIRST-PARTY ATTRIBUTION</div>
              <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
            </div>
          </div>
        </div>

        <!-- Case Content Body -->
        <div class="space-y-12">
          
          <!-- Baseline Situation & Friction -->
          <div class="bolted-card p-8 rounded-2xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h2 class="text-xl font-bold text-[#2d3436] mb-4">01. The Baseline Challenge</h2>
            <div class="text-sm text-[#4a5568] space-y-3 leading-relaxed">
              <p>
                Prior to partnering with TeamRion, [Client Name Placeholder — B2B Cloud] was juggling three separate vendors: a design agency that had recently built a visually sleek site, a freelance SEO consultant generating top-of-funnel informational blog traffic, and a paid media agency running isolated Google Search campaigns.
              </p>
              <p>
                Despite spending $45K/month on combined retainers and media, total demo bookings were flat, attribution data was conflicting between Google Ads and HubSpot, and competitors were dominating new AI search queries on Perplexity and ChatGPT.
              </p>
            </div>
          </div>

          <!-- The TeamRion Execution Blueprint (Light Neumorphic Layout) -->
          <div class="bolted-card p-8 rounded-2xl bg-[#f0f2f5] border border-white shadow-floating">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h2 class="text-xl font-bold text-[#2d3436] mb-4">02. The 4-Stage Execution Blueprint</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#4a5568]">
              <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
                <strong class="text-[#ff4757] block mb-1">STAGE 1: ATTRIBUTION REBUILD</strong>
                <p>Deployed Server-Side GTM and GA4 BigQuery data pipeline. Tied offline Salesforce closed-won opportunity stages back to Google Ads and LinkedIn Ads.</p>
              </div>
              <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
                <strong class="text-[#06b6d4] block mb-1">STAGE 2: GEO & TOPICAL ARCHITECTURE</strong>
                <p>Implemented JSON-LD Product entity schemas, launched 12 high-intent competitor comparison hubs, and seeded digital citations across technical portals.</p>
              </div>
              <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
                <strong class="text-[#22c55e] block mb-1">STAGE 3: LINKEDIN ABM SYNCHRONIZATION</strong>
                <p>Targeted matched account buying committees (CTOs, VPs of Eng) with interactive product demo cutdowns and thought leadership ads.</p>
              </div>
              <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
                <strong class="text-[#f59e0b] block mb-1">STAGE 4: CRO & PROGRESSIVE PROFILING</strong>
                <p>Rebuilt the demo booking modal with two-step progressive profiling, reducing friction and increasing completion rate from 2.1% to 4.8%.</p>
              </div>
            </div>
          </div>

          <!-- Testimonial Card with Push-Pin Detail -->
          <div class="bolted-card p-8 rounded-2xl bg-[#fdfaf3] border border-[#e2d8c3] relative">
            <div class="push-pin"></div>
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            
            <div class="text-center max-w-2xl mx-auto pt-2">
              <div class="masking-tape mb-4">VERIFIED CLIENT TELEMETRY</div>
              <blockquote class="text-base md:text-lg italic text-[#2d3436] leading-relaxed mb-6">
                "[Placeholder Quote — TeamRion unified our entire growth stack within 30 days. We finally have one squad accountable for pipeline instead of three vendors pointing fingers at each other.]"
              </blockquote>
              <div class="font-mono text-xs text-[#718096]">
                <strong class="text-[#2d3436] block">[VP of Growth — Placeholder Name]</strong>
                <span>[Series B Enterprise SaaS Client]</span>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-16 text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary">
            <span>GET SIMILAR OUTCOMES — ORDER DIAGNOSTIC</span>
          </a>
        </div>

      </section>
    `
  }
};

window.PROOF_PAGES = PROOF_PAGES;
