/**
 * TeamRion — Services Master Hub & 9 Dedicated Service Pages
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const SERVICE_PAGES = {
  // --------------------------------------------------------------------------
  // SERVICES OVERVIEW HUB
  // --------------------------------------------------------------------------
  'services': {
    title: 'Integrated Growth Services — TeamRion',
    meta: 'Explore our 9 full-funnel growth pillars. SEO, GEO AI search, Google/Meta/LinkedIn paid media, CRO, automation, and web architecture.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">SYSTEM ARCHITECTURE</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            9 Synchronized <span class="text-[#ff4757]">Growth Pillars.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Every channel operates under one shared measurement framework. No silos, no turf wars, just synchronized pipeline execution.
          </p>
        </div>

        <!-- 9 Pillars Interactive Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <!-- Pillar 1 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 01 // SEARCH</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Search Engine Optimization</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Topical clusters, technical crawlability, and bottom-funnel keyword capture that compounds revenue over time.</p>
            </div>
            <a href="#/services/seo" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 2 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between border-2 border-[#06b6d4]/40">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#06b6d4] mb-2">PILLAR 02 // AI SEARCH [DIFFERENTIATED]</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">GEO & AI Search Optimization</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Engineered entity graph schemas and citation networks ensuring your brand dominates ChatGPT, Perplexity & Claude.</p>
            </div>
            <a href="#/services/geo-ai-search" class="btn-physical-primary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 3 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 03 // PAID SEARCH</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Google Ads & Intent Capture</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Precision high-intent search campaigns, negative keyword sculpting, and offline conversion value optimization.</p>
            </div>
            <a href="#/services/paid-media-google" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 4 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 04 // PAID SOCIAL</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Meta Ads & Creative Engine</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">High-tempo creative testing frameworks, Conversions API server pipelines, and full-funnel remarketing loops.</p>
            </div>
            <a href="#/services/paid-media-meta" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 5 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 05 // B2B ABM</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">LinkedIn Ads & Committee ABM</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Surgical buyer committee penetration, thought leader ads, and CRM list matching for high-ACV enterprise accounts.</p>
            </div>
            <a href="#/services/paid-media-linkedin" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 6 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 06 // LIFECYCLE</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Marketing Automation</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">HubSpot, Klaviyo, and custom lifecycle pipelines with lead scoring, multi-branch nurture sequences, and automated sales handoffs.</p>
            </div>
            <a href="#/services/marketing-automation" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 7 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 07 // CONVERSION</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Conversion Rate Optimization</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Heuristic friction teardowns, multivariate A/B testing, and checkout/demo funnel acceleration.</p>
            </div>
            <a href="#/services/cro" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 8 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 08 // ATTRIBUTION</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Analytics & Attribution</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Server-side GTM, GA4 custom data warehousing, and executive revenue cockpits proving channel ROI.</p>
            </div>
            <a href="#/services/analytics-attribution" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

          <!-- Pillar 9 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            <div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PILLAR 09 // ARCHITECTURE</div>
              <h3 class="text-xl font-bold text-[#2d3436] mb-2">Web Design & Development</h3>
              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">Engineered WordPress + Elementor and modern web builds optimized for 100/100 Core Web Vitals and conversion throughput.</p>
            </div>
            <a href="#/services/web-design-dev" class="btn-physical-secondary w-full text-xs"><span>VIEW SERVICE SPEC &rarr;</span></a>
          </div>

        </div>

      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 1. SEO
  // --------------------------------------------------------------------------
  'services/seo': {
    title: 'Revenue-First SEO Services — TeamRion',
    meta: 'Technical SEO, topical authority clusters, and high-intent keyword acquisition designed for measurable pipeline generation.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 01</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Search Engine Optimization <span class="text-[#ff4757]">(SEO)</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            We don't chase vanity search volume. We architect bottom-funnel organic visibility that attracts in-market buyers and converts them into qualified pipeline.
          </p>
        </div>

        <!-- Metric Stat Strip for SEO -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">ORGANIC PIPELINE</div>
            <div class="text-3xl font-extrabold font-mono text-[#ff4757]">+142%</div>
            <div class="placeholder-data-badge mt-1">SAMPLE BENCHMARK</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">CORE WEB VITALS</div>
            <div class="text-3xl font-extrabold font-mono text-[#22c55e]">100/100</div>
            <div class="placeholder-data-badge mt-1">MOBILE PERFORMANCE</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">TOPICAL AUTHORITY</div>
            <div class="text-3xl font-extrabold font-mono text-[#06b6d4]">Top 3</div>
            <div class="placeholder-data-badge mt-1">HIGH-INTENT KEYWORDS</div>
          </div>
        </div>

        <!-- 4-Stage Execution Framework -->
        <div class="bolted-card p-8 rounded-2xl mb-16">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
          <h3 class="text-2xl font-bold text-[#2d3436] mb-6">Our 4-Stage Organic Search Framework</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#4a5568]">
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#ff4757] mb-1">01. TECHNICAL FOUNDATION & CRAWLABILITY</div>
              <p>Eliminate index bloat, fix canonicalization, optimize rendering budgets, and achieve sub-second LCP scores.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#ff4757] mb-1">02. TOPICAL GRAPH & ENTITY CLUSTERING</div>
              <p>Map semantic topic clusters that signal exhaustive subject-matter expertise to Google's Knowledge Graph.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#ff4757] mb-1">03. BOTTOM-FUNNEL CONTENT CREATION</div>
              <p>Comparison pages, 'vs' teardowns, alternative guides, and transactional landing assets engineered to convert.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#ff4757] mb-1">04. CONVERSION ROUTING & ATTRIBUTION</div>
              <p>Instrumenting lead capture and integrating organic conversion events directly into your CRM.</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>AUDIT YOUR ORGANIC SEARCH ENGINE</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 2. GEO / AI SEARCH OPTIMIZATION
  // --------------------------------------------------------------------------
  'services/geo-ai-search': {
    title: 'GEO & AI Search Optimization Services — TeamRion',
    meta: 'Dominate ChatGPT, Perplexity, Claude, and Google AI Overviews. Structured entity graph schemas and citation network engineering.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape masking-tape-alt mb-3">DIFFERENTIATED CAPABILITY // 02</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Generative Engine <span class="text-[#06b6d4]">Optimization (GEO)</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Over 30% of high-intent enterprise buyers now use AI search engines (Perplexity, ChatGPT Search, Claude, Google AI Overviews) before visiting a website. We engineer your brand to become their primary cited authority.
          </p>
        </div>

        <!-- Metric Stat Strip for GEO -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">PERPLEXITY CITATIONS</div>
            <div class="text-3xl font-extrabold font-mono text-[#06b6d4]">#1 Share</div>
            <div class="placeholder-data-badge mt-1">PROMPT CITATION SHARE</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">ENTITY NODES</div>
            <div class="text-3xl font-extrabold font-mono text-[#22c55e]">100% Valid</div>
            <div class="placeholder-data-badge mt-1">JSON-LD GRAPH SCHEMA</div>
          </div>
          <div class="metric-readout-module">
            <div class="text-[10px] font-mono text-[#718096]">AI REFERRAL ARR</div>
            <div class="text-3xl font-extrabold font-mono text-[#ff4757]">3.8x</div>
            <div class="placeholder-data-badge mt-1">ANNUAL EXPANSION</div>
          </div>
        </div>

        <!-- How GEO Works (Light Neumorphic Layout) -->
        <div class="bolted-card p-8 rounded-2xl mb-16 bg-[#f0f2f5] border border-white shadow-floating">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
          <h3 class="text-2xl font-bold text-[#2d3436] mb-6">The TeamRion GEO Protocol</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#4a5568]">
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#06b6d4] mb-1">01. LLM ENTITY GRAPH INJECTION</div>
              <p>We deploy nested schema markup (Organization, Product, ItemList, FAQPage) that gives LLMs verifiable structured facts about your pricing, features, and advantages.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#06b6d4] mb-1">02. DIGITAL CITATION SEEDING</div>
              <p>AI models prioritize information verified across multiple high-trust sources. We seed authoritative mentions across technical publications, Reddit, GitHub, and review databases.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#06b6d4] mb-1">03. COMPARATIVE SYNTHESIS PAGES</div>
              <p>We build objective, data-dense comparison matrices that LLMs ingest and quote verbatim when answering user prompts like "What is the best alternative to [Competitor]?"</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-xs font-bold text-[#06b6d4] mb-1">04. PROMPT BENCHMARK MONITORING</div>
              <p>Continuous automated query testing across GPT-4o, Claude 3.5 Sonnet, and Perplexity Pro to track and expand your market share of AI recommendations.</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="#/ai-search-audit" class="btn-physical-primary"><span>RUN FREE AI-SEARCH CITATION AUDIT</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 3. PAID MEDIA — GOOGLE ADS
  // --------------------------------------------------------------------------
  'services/paid-media-google': {
    title: 'Google Ads & Intent Capture — TeamRion',
    meta: 'High-intent search, Performance Max restructuring, bottom-funnel keyword bidding, and offline conversion value optimization.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 03</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Paid Media — <span class="text-[#ff4757]">Google Ads</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Stop burning budget on broad-match terms and unchecked Performance Max campaigns. We engineer surgical search campaigns tuned to high-intent buyer queries.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Surgical Intent Architecture</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              We structure single-theme ad groups, comprehensive negative keyword trees, and exact-match bidding strategies that prevent Google from wasting capital on unqualified discovery traffic.
            </p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Offline Conversion Tracking</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              We connect your CRM pipeline back into Google Ads via GCLID/Enhanced Conversions. Google's Smart Bidding algorithms optimize for closed-won deals rather than superficial form submissions.
            </p>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>REQUEST PAID MEDIA AUDIT</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 4. PAID MEDIA — META ADS
  // --------------------------------------------------------------------------
  'services/paid-media-meta': {
    title: 'Meta Ads & Creative Velocity — TeamRion',
    meta: 'High-velocity creative testing, full-funnel remarketing, and Server-Side CAPI tracking to scale customer acquisition profitably.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 04</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Paid Media — <span class="text-[#ff4757]">Meta Ads</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            In modern Meta advertising, creative is your targeting. We deploy rapid creative testing frameworks combined with Server-Side Conversions API (CAPI) infrastructure.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">High-Tempo Creative Engine</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              We test 10–20 creative angles weekly across UGC, motion graphics, comparison static ads, and problem-solution hooks, finding winning variations that scale without ad fatigue.
            </p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Conversions API (CAPI) Integration</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              We bypass browser-level ad blockers and iOS tracking restrictions with direct server-side event streaming, maintaining a 9.0+ Event Quality Match score.
            </p>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>EVALUATE YOUR META ACQUISITION</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 5. PAID MEDIA — LINKEDIN ADS
  // --------------------------------------------------------------------------
  'services/paid-media-linkedin': {
    title: 'LinkedIn Ads & B2B ABM — TeamRion',
    meta: 'Account-Based Marketing precision targeting decision makers, buying committees, and high-value enterprise accounts.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 05</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Paid Media — <span class="text-[#ff4757]">LinkedIn Ads</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Reach the exact buying committee inside your Tier-1 enterprise target accounts. High-relevance thought leader ads and pipeline-driven ABM campaigns.
          </p>
        </div>

        <div class="bolted-card p-8 rounded-2xl mb-16">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
          <h3 class="text-xl font-bold text-[#2d3436] mb-4">Enterprise ABM Architecture</h3>
          <p class="text-sm text-[#4a5568] leading-relaxed mb-6">
            B2B deals require multi-stakeholder consensus. We target CFOs, CTOs, and Department Heads with tailored messaging simultaneously, accelerating deal velocity.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div class="p-3 bg-[#d1d9e6]/40 rounded shadow-recessed">
              <strong class="text-[#2d3436]">01. CRM LIST SYNC</strong>
              <p class="text-[#718096] mt-1">Live sync with HubSpot/Salesforce target accounts.</p>
            </div>
            <div class="p-3 bg-[#d1d9e6]/40 rounded shadow-recessed">
              <strong class="text-[#2d3436]">02. THOUGHT LEADER ADS</strong>
              <p class="text-[#718096] mt-1">Executive personal profiles for 3x higher CTR.</p>
            </div>
            <div class="p-3 bg-[#d1d9e6]/40 rounded shadow-recessed">
              <strong class="text-[#2d3436]">03. PIPELINE ACCELERATION</strong>
              <p class="text-[#718096] mt-1">Mid-funnel case study retargeting during active sales cycles.</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>DEPLOY B2B LINKEDIN ABM</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 6. MARKETING AUTOMATION
  // --------------------------------------------------------------------------
  'services/marketing-automation': {
    title: 'Marketing Automation & CRM Routing — TeamRion',
    meta: 'HubSpot, Klaviyo, and Zapier lifecycle flows with lead scoring, multi-branch nurture sequences, and automated sales handoffs.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 06</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Marketing <span class="text-[#ff4757]">Automation</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Stop losing leads between marketing acquisition and sales follow-up. We build automated lifecycle engines that nurture prospects and trigger instant sales engagement.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Algorithmic Lead Scoring</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              Score leads dynamically based on intent behaviors (pricing page visits, document downloads, ad engagement) so sales reps only contact sales-ready buyers.
            </p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Dynamic Multi-Branch Nurture</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              Automated email and SMS sequences that adapt in real time to recipient engagement, industry segment, and buyer stage.
            </p>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>OPTIMIZE YOUR AUTOMATION STACK</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 7. CRO (CONVERSION RATE OPTIMIZATION)
  // --------------------------------------------------------------------------
  'services/cro': {
    title: 'Conversion Rate Optimization (CRO) — TeamRion',
    meta: 'Scientific heuristic teardowns, heatmapping, multivariate A/B testing, and friction elimination to maximize visitor-to-customer throughput.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 07</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Conversion Rate <span class="text-[#ff4757]">Optimization (CRO)</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Doubling your conversion rate cuts your customer acquisition cost in half. We apply rigorous behavioral science and statistical A/B testing to unlock hidden throughput.
          </p>
        </div>

        <!-- Methodology (Light Neumorphic Layout) -->
        <div class="bolted-card p-8 rounded-2xl mb-16 bg-[#f0f2f5] border border-white shadow-floating">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
          <h3 class="text-2xl font-bold text-[#2d3436] mb-6">Our Scientific CRO Methodology</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4a5568]">
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-sm font-bold text-[#ff4757] mb-2">01. HEURISTIC TEARDOWN</div>
              <p>Clarity, friction, distraction, and value proposition audits across mobile and desktop viewports.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-sm font-bold text-[#ff4757] mb-2">02. USER BEHAVIOR TELEMETRY</div>
              <p>Heatmaps, scroll depth, form-field drop-off tracking, and session recording friction analysis.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-sm font-bold text-[#ff4757] mb-2">03. STATISTICAL A/B TESTING</div>
              <p>Hypothesis-driven experiments tested to 95%+ statistical significance before permanent deployment.</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>REQUEST A CRO FUNNEL TEARDOWN</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 8. ANALYTICS & ATTRIBUTION
  // --------------------------------------------------------------------------
  'services/analytics-attribution': {
    title: 'Analytics & Attribution Engineering — TeamRion',
    meta: 'Server-side tagging, multi-touch attribution, offline conversion imports, and executive Looker Studio cockpits.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 08</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Analytics & <span class="text-[#ff4757]">Attribution</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            Eliminate conflicting reports. We build a single source of truth connecting ad platforms, web traffic, and closed-won CRM revenue.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Server-Side Google Tag Manager (sGTM)</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              First-party tracking server infrastructure deployed on Google Cloud or AWS. Protects against ad-blockers and ensures 100% data fidelity.
            </p>
          </div>
          <div class="bolted-card p-6 rounded-xl">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <h3 class="text-xl font-bold text-[#2d3436] mb-3">Multi-Touch Revenue Attribution</h3>
            <p class="text-sm text-[#4a5568] leading-relaxed">
              First-touch, last-touch, and position-based attribution models that show the exact monetary contribution of SEO, GEO, and Paid Ads.
            </p>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>AUDIT YOUR ATTRIBUTION PIPELINE</span></a>
        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // 9. WEB DESIGN & DEV
  // --------------------------------------------------------------------------
  'services/web-design-dev': {
    title: 'High-Performance Web Design & Dev — TeamRion',
    meta: 'Ultra-fast WordPress + Elementor Pro and headless web builds engineered with industrial polish, 100/100 Core Web Vitals, and conversion triggers.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
          <div class="masking-tape mb-3">SERVICE SPECIFICATION // 09</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Web Design & <span class="text-[#ff4757]">Development</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            We don't build digital brochures. We engineer high-performance marketing machines built on WordPress + Elementor Pro or modern stacks that load in &lt;500ms and convert traffic into revenue.
          </p>
        </div>

        <div class="bolted-card p-8 rounded-2xl mb-16">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
          <h3 class="text-2xl font-bold text-[#2d3436] mb-6">Our Engineering Standards</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4a5568]">
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-sm font-bold text-[#ff4757] mb-2">01. 100/100 CORE WEB VITALS</div>
              <p>Clean HTML structure, optimized critical CSS, WebP/AVIF imagery, and zero layout shifts for instant page loads.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-sm font-bold text-[#ff4757] mb-2">02. MODULAR DESIGN SYSTEM</div>
              <p>Reusable global design tokens, strict typography scales, and modular components your team can maintain effortlessly.</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-card">
              <div class="font-mono text-sm font-bold text-[#ff4757] mb-2">03. NATIVE CONVERSION HOOKS</div>
              <p>Built-in lead magnets, progressive profiling forms, sticky bottom bars, and direct CRM integrations.</p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <a href="#/contact" class="btn-physical-primary"><span>BUILD YOUR HIGH-CONVERTING SITE</span></a>
        </div>
      </section>
    `
  }
};

window.SERVICE_PAGES = SERVICE_PAGES;
