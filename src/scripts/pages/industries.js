/**
 * TeamRion — Industry Vertical Growth Frameworks
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const INDUSTRY_PAGES = {
  // --------------------------------------------------------------------------
  // 1. B2B SAAS (PRIMARY VERTICAL — DEEPEST IMPLEMENTATION)
  // --------------------------------------------------------------------------
  'industries/b2b-saas': {
    title: 'B2B SaaS Growth Engine — TeamRion',
    meta: 'Scale ARR, compress CAC, and dominate buyer queries across Google and AI search engines. Full-funnel growth architecture for B2B SaaS.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">PRIMARY VERTICAL BLUEPRINT</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            B2B SaaS Pipeline & <span class="text-[#ff4757]">ARR Acceleration.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            SaaS buyers don't follow linear paths. They query ChatGPT for tool comparisons, search Google for technical features, and see your ads on LinkedIn. We engineer a cohesive pipeline machine tying every touchpoint to closed-won ARR.
          </p>
        </div>

        <!-- SaaS Metric Strip (§4) -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-16">
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">DEMO PIPELINE</div>
            <div class="text-3xl font-extrabold font-mono text-[#ff4757]">+142%</div>
            <div class="placeholder-data-badge mt-1">SAMPLE BENCHMARK (§4)</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">PAYBACK PERIOD</div>
            <div class="text-3xl font-extrabold font-mono text-[#22c55e]">&lt; 5 Mo</div>
            <div class="placeholder-data-badge mt-1">SAMPLE CAC BENCHMARK</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">PERPLEXITY SHARE</div>
            <div class="text-3xl font-extrabold font-mono text-[#06b6d4]">#1 Rank</div>
            <div class="placeholder-data-badge mt-1">CATEGORY PROMPT SHARE</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">SQL VELOCITY</div>
            <div class="text-3xl font-extrabold font-mono text-[#f59e0b]">3.4x</div>
            <div class="placeholder-data-badge mt-1">LEAD-TO-SQL SPEED</div>
          </div>
        </div>

        <!-- The 3 Core SaaS Growth Bottlenecks We Solve -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">BOTTLENECK 01</div>
            <h3 class="text-lg font-bold text-[#2d3436] mb-2">The Comparison Trap</h3>
            <p class="text-xs text-[#4a5568] leading-relaxed">
              Buyers search for "[Your Competitor] alternatives" and review AI summaries. If you lack structured 'vs' comparison pages and entity schemas, you lose high-intent pipeline before they ever visit your site.
            </p>
          </div>

          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">BOTTLENECK 02</div>
            <h3 class="text-lg font-bold text-[#2d3436] mb-2">Bloated Ad CAC</h3>
            <p class="text-xs text-[#4a5568] leading-relaxed">
              Google Ads bidding on generic keywords without offline CRM conversion synchronization results in burning $100+ CPCs on students and job seekers rather than buying committee executives.
            </p>
          </div>

          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">BOTTLENECK 03</div>
            <h3 class="text-lg font-bold text-[#2d3436] mb-2">Leaky Product Signups</h3>
            <p class="text-xs text-[#4a5568] leading-relaxed">
              Free trial and demo forms with excessive friction, un-instrumented drop-offs, and disconnected onboarding email sequences that fail to drive product activation.
            </p>
          </div>

        </div>

        <!-- The SaaS Full-Funnel Architecture (Light Neumorphic Layout) -->
        <div class="bolted-card p-8 rounded-2xl bg-[#f0f2f5] border border-white mb-16 shadow-floating">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>

          <div class="max-w-3xl mb-8">
            <span class="led-indicator led-glow-green mb-2"></span>
            <div class="font-mono text-xs font-bold text-[#2d3436] uppercase tracking-widest">SaaS GROWTH STACK</div>
            <h3 class="text-2xl md:text-3xl font-bold text-[#2d3436] mt-2">The Integrated B2B SaaS Growth Blueprint</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs text-[#4a5568]">
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#06b6d4] font-bold mb-1">01. GEO & SEO INTENT</div>
              <p>Topical comparison matrices, programmatic software integrations directory, LLM entity graphs.</p>
            </div>
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#ff4757] font-bold mb-1">02. LINKEDIN ABM ADS</div>
              <p>Buying committee retargeting, customer story ads, enterprise matched audience bidding.</p>
            </div>
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#22c55e] font-bold mb-1">03. HIGH-VELOCITY CRO</div>
              <p>Interactive demo landing pages, frictionless booking modals, self-serve tour widgets.</p>
            </div>
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#f59e0b] font-bold mb-1">04. CRM LIFECYCLE</div>
              <p>HubSpot/Salesforce lead routing, product-usage scoring, churn prevention alerts.</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="#/contact" class="btn-physical-primary"><span>DEPLOY B2B SAAS GROWTH ENGINE</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 2. PROFESSIONAL SERVICES
  // --------------------------------------------------------------------------
  'industries/professional-services': {
    title: 'Professional Services Growth Framework — TeamRion',
    meta: 'High-ACV lead routing, partner authority building, and consultation booking funnels for corporate advisory, legal, and accounting firms.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 02</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Professional Services <span class="text-[#ff4757]">Lead Engine.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            High-ticket corporate advisory, legal, and consulting firms require credibility-first funnels. We engineer partner authority, localized search domination, and qualified consultation routing.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Partner Authority & GEO Citations</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              We establish individual partners as verified knowledge entities in AI search engines and technical publications, ensuring prospective clients receive your firm's name when querying AI advisors.
            </p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">High-Ticket Consultation Funnels</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              We eliminate low-budget unqualified leads through progressive qualification forms, automated calendar routing, and targeted LinkedIn executive ads.
            </p>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>REQUEST PROFESSIONAL SERVICES AUDIT</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 3. E-COMMERCE
  // --------------------------------------------------------------------------
  'industries/ecommerce': {
    title: 'E-Commerce & DTC Scaling System — TeamRion',
    meta: 'Blended ROAS scaling, retention loops, average order value expansion, and Server-Side CAPI tracking for Shopify Plus brands.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 03</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            E-Commerce & <span class="text-[#ff4757]">DTC Scale.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Overcome rising ad costs and post-iOS tracking degradation with Server-Side CAPI, high-tempo UGC creative testing, and Klaviyo retention automation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">01. META & TIKTOK ADS</div>
            <p class="text-xs text-[#4a5568]">Weekly creative sprints testing 15+ ad hooks to keep customer acquisition cost predictable.</p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="text-xs font-mono font-bold text-[#22c55e] mb-2">02. KLAVIYO LIFECYCLE</div>
            <p class="text-xs text-[#4a5568]">Dynamic VIP flows, browse abandonment triggers, and subscription rebill retention loops.</p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="text-xs font-mono font-bold text-[#06b6d4] mb-2">03. PDP CONVERSION OPT</div>
            <p class="text-xs text-[#4a5568]">Sub-second PDP page speed, bundle builders, and frictionless checkout optimization.</p>
          </div>
        </div>

        <div class="text-center">
          <a href="#/contact" class="btn-physical-primary"><span>SCALE YOUR DTC BRAND</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 4. HEALTHCARE & FITNESS
  // --------------------------------------------------------------------------
  'industries/healthcare-fitness': {
    title: 'Healthcare & Fitness Growth Stack — TeamRion',
    meta: 'HIPAA-conscious acquisition, clinic appointment booking, and patient lifetime value growth.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 04</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Healthcare & <span class="text-[#ff4757]">Fitness Brands.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Compliant patient acquisition and direct-booking workflows for multi-location clinics, digital health platforms, and fitness franchises.
          </p>
        </div>
        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>DISCUSS HEALTHCARE GROWTH</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 5. FINTECH
  // --------------------------------------------------------------------------
  'industries/fintech': {
    title: 'FinTech Growth Engineering — TeamRion',
    meta: 'Regulatory-compliant acquisition, institutional trust building, and low-friction onboarding funnels for financial technology.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 05</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            FinTech Acquisition & <span class="text-[#ff4757]">Trust.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Balancing strict compliance with aggressive customer acquisition. High-security tracking, SOC2 compliance messaging, and friction-free verification flows.
          </p>
        </div>
        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>DISCUSS FINTECH FUNNELS</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 6. REAL ESTATE
  // --------------------------------------------------------------------------
  'industries/real-estate': {
    title: 'Real Estate & PropTech Growth — TeamRion',
    meta: 'High-ticket investor funnels, hyper-local search domination, and geo-fenced paid campaigns.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 06</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Real Estate & <span class="text-[#ff4757]">PropTech.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Capturing high-net-worth investors and commercial buyers with geo-targeted search campaigns and high-touch nurturing workflows.
          </p>
        </div>
        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>DISCUSS REAL ESTATE PIPELINE</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 7. HOSPITALITY
  // --------------------------------------------------------------------------
  'industries/hospitality': {
    title: 'Hospitality & Luxury Growth — TeamRion',
    meta: 'Direct booking engine maximization, OTA commission displacement, and seasonal pacing.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 07</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Hospitality & <span class="text-[#ff4757]">Direct Bookings.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Reclaim direct revenue from OTAs (Online Travel Agencies) with high-converting booking engines and targeted luxury travel campaigns.
          </p>
        </div>
        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>DISCUSS HOSPITALITY GROWTH</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 8. MANUFACTURING
  // --------------------------------------------------------------------------
  'industries/manufacturing': {
    title: 'Manufacturing & Industrial B2B Growth — TeamRion',
    meta: 'Distributor portals, high-ticket quote generators, and long-cycle nurture for industrial manufacturers.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">VERTICAL BLUEPRINT // 08</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Manufacturing & <span class="text-[#ff4757]">Industrial B2B.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Modernize industrial lead generation. Transform technical CAD catalogs into high-converting RFQ (Request for Quote) engines.
          </p>
        </div>
        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>DISCUSS INDUSTRIAL PIPELINE</span></a>
        </div>
      </section>
    `
  }
};

window.INDUSTRY_PAGES = INDUSTRY_PAGES;
