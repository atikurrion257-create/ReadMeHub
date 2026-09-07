/**
 * TeamRion — Core Pages: About, Contact, Pricing, FAQ
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const CORE_PAGES = {
  // --------------------------------------------------------------------------
  // ABOUT US
  // --------------------------------------------------------------------------
  'about': {
    title: 'About TeamRion — The Anti-Agency Growth Partner',
    meta: 'Learn why TeamRion was built: to eliminate the communication gap between siloed freelancers and provide unified, accountable growth engineering.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">WHO WE ARE</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Engineered for Revenue. <span class="text-[#ff4757]">Accountable by Design.</span>
          </h1>
          <p class="text-lg text-[#4a5568] mt-4 leading-relaxed">
            TeamRion was founded on a simple observation: modern businesses don't need another creative boutique or another isolated ads agency. They need one team of record that connects every dollar spent to pipeline generated.
          </p>
        </div>

        <!-- The Anti-Agency Manifesto -->
        <div class="bolted-card p-8 md:p-12 rounded-2xl bg-[#f0f2f5] border border-white mb-16 relative shadow-floating">
          <div class="screw-head screw-tl"></div>
          <div class="screw-head screw-tr"></div>
          <div class="screw-head screw-bl"></div>
          <div class="screw-head screw-br"></div>
          
          <div class="max-w-3xl mx-auto space-y-6">
            <div class="flex items-center gap-3">
              <span class="led-indicator led-glow-orange"></span>
              <span class="font-mono text-xs font-bold uppercase tracking-widest text-[#ff4757]">THE TEAMRION MANIFESTO</span>
            </div>

            <h2 class="text-2xl md:text-3xl font-bold text-[#2d3436]">
              "We Reject Vanity Metrics and Fragmented Silos."
            </h2>

            <div class="text-sm md:text-base text-[#4a5568] space-y-4 leading-relaxed">
              <p>
                In the traditional agency ecosystem, everyone protects their own silo. The web design agency blames the copywriter; the copywriter blames the media buyer; the media buyer blames the sales team; the SEO agency celebrates ranking for keywords that generate zero demos.
              </p>
              <p>
                Meanwhile, leadership is left holding the bag — paying multiple retainer invoices while wondering why overall customer acquisition costs keep climbing.
              </p>
              <p>
                <strong>TeamRion is the antidote.</strong> We operate as your embedded growth engine. We take ownership of the full funnel: from the first time an AI model or search engine indexes your brand, to the ad that captures high-intent demand, to the high-converting landing page, to the CRM automation that nurtures the deal to close.
              </p>
            </div>
          </div>
        </div>

        <!-- The 4 Core Engineering Principles -->
        <div class="mb-20">
          <div class="text-center mb-12">
            <div class="masking-tape mb-2">OPERATIONAL DNA</div>
            <h3 class="text-2xl md:text-3xl font-bold text-[#2d3436]">The 4 Engineering Principles</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div class="bolted-card p-6 rounded-xl">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">PRINCIPLE 01</div>
              <h4 class="font-bold text-[#2d3436] text-base mb-2">One Unified Attribution Model</h4>
              <p class="text-xs text-[#4a5568] leading-relaxed">
                Every channel feeds into a centralized server-side data warehouse. No duplicate conversions, no inflated platform claims.
              </p>
            </div>

            <div class="bolted-card p-6 rounded-xl">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="text-xs font-mono font-bold text-[#06b6d4] mb-2">PRINCIPLE 02</div>
              <h4 class="font-bold text-[#2d3436] text-base mb-2">Future-Proof AI Visibility</h4>
              <p class="text-xs text-[#4a5568] leading-relaxed">
                We engineer your brand footprint for both Google algorithms and LLM synthetic citation engines (ChatGPT, Perplexity, Claude).
              </p>
            </div>

            <div class="bolted-card p-6 rounded-xl">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="text-xs font-mono font-bold text-[#22c55e] mb-2">PRINCIPLE 03</div>
              <h4 class="font-bold text-[#2d3436] text-base mb-2">Aesthetic Rigor + CRO Science</h4>
              <p class="text-xs text-[#4a5568] leading-relaxed">
                Design polish is baseline; conversion velocity is the metric. We never build beauty without conversion mechanics.
              </p>
            </div>

            <div class="bolted-card p-6 rounded-xl">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="text-xs font-mono font-bold text-[#f59e0b] mb-2">PRINCIPLE 04</div>
              <h4 class="font-bold text-[#2d3436] text-base mb-2">Total Financial Transparency</h4>
              <p class="text-xs text-[#4a5568] leading-relaxed">
                Banded pricing, clear deliverable roadmaps, and bi-weekly pipeline readouts. You always know what is being built and what it yields.
              </p>
            </div>

          </div>
        </div>

        <!-- Leadership & Squad Architecture (Light Neumorphic Layout) -->
        <div class="bolted-card p-8 md:p-12 rounded-2xl bg-[#f0f2f5] border border-white mb-16 shadow-floating">
          <div class="screw-head screw-tl"></div>
          <div class="screw-head screw-tr"></div>
          <div class="screw-head screw-bl"></div>
          <div class="screw-head screw-br"></div>

          <div class="max-w-3xl mb-8">
            <span class="led-indicator led-glow-green mb-2"></span>
            <div class="font-mono text-xs font-bold text-[#2d3436] uppercase tracking-widest">SQUAD OPERATING SYSTEM</div>
            <h3 class="text-2xl md:text-3xl font-bold text-[#2d3436] mt-2">How Your Dedicated Growth Squad Works</h3>
            <p class="text-sm text-[#4a5568] mt-2 leading-relaxed">
              When you partner with TeamRion, you get an integrated squad led by a Growth Director, with specialists in technical SEO/GEO, paid performance, CRO engineering, and full-stack development working in 2-week synchronized sprints.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#ff4757] font-bold mb-1">01. GROWTH DIRECTOR</div>
              <p class="text-[#4a5568]">Strategic leadership, P&L attribution, roadmap pacing, executive alignment.</p>
            </div>
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#06b6d4] font-bold mb-1">02. SEARCH & GEO ENGINEER</div>
              <p class="text-[#4a5568]">Technical crawls, entity graphs, AI prompt share, programmatic architecture.</p>
            </div>
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#22c55e] font-bold mb-1">03. PERFORMANCE MEDIA BUYER</div>
              <p class="text-[#4a5568]">Google/Meta/LinkedIn bid management, creative velocity, CAPI pipelines.</p>
            </div>
            <div class="p-4 bg-[#e0e5ec] rounded-lg shadow-recessed border border-white/60">
              <div class="text-[#f59e0b] font-bold mb-1">04. CRO & DEV ENGINEER</div>
              <p class="text-[#4a5568]">Elementor/Webflow builds, sub-second CWV speed, A/B experiments, CRM hooks.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
          <a href="#/contact" class="btn-physical-primary">
            <span>TALK TO OUR GROWTH SQUAD</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

      </section>
    `
  },

  // --------------------------------------------------------------------------
  // PRICING PAGE (§5 REAL BANDED LADDER)
  // --------------------------------------------------------------------------
  'pricing': {
    title: 'Banded Growth Pricing — TeamRion',
    meta: 'Transparent land-and-expand growth ladder. Fixed-fee audits, foundation sprints, and full-funnel multichannel retainers.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">BANDED PRICING LADDER</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Transparent Pricing. <span class="text-[#ff4757]">Predictable Value.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Unlike traditional agencies that hide rates behind opaque sales calls, we publish our core engagement tiers. Every tier matches our land-and-expand sales motion.
          </p>
        </div>

        <!-- Banded Pricing Cards Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch mb-20">
          
          <!-- Tier 1: Growth Diagnostic -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="punched-hole"></div>
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div>
              <div class="font-mono text-xs font-bold text-[#ff4757] uppercase mb-1">STAGE 01 // AUDIT</div>
              <h2 class="text-2xl font-bold text-[#2d3436]">Growth Diagnostic</h2>
              <p class="text-xs text-[#718096] font-mono mt-1">Low-friction entry point for cold traffic</p>

              <div class="my-6 p-4 bg-[#d1d9e6]/50 rounded-xl shadow-recessed text-center font-mono">
                <div class="text-3xl font-extrabold text-[#2d3436]">$1,450</div>
                <div class="text-[10px] text-[#718096] uppercase font-bold mt-1">[INSERT FINAL PRICE] · ONE-TIME</div>
              </div>

              <div class="space-y-4 text-xs text-[#4a5568]">
                <p class="font-semibold text-[#2d3436]">Who it is for:</p>
                <p>Companies with $500K–$10M ARR experiencing stalled search traffic, rising ad CAC, or wondering how they rank in AI engines.</p>

                <p class="font-semibold text-[#2d3436] pt-2 border-t border-[#d1d9e6]">What's included:</p>
                <ul class="space-y-2 font-mono text-[11px]">
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Full SEO & Technical Health Crawl</li>
                  <li class="flex items-center gap-2"><span class="text-[#06b6d4]">✓</span> AI Search Citation Baseline (GEO)</li>
                  <li class="flex items-center gap-2"><span class="text-[#ff4757]">✓</span> Paid Media Waste & CAC Audit</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> CRO Friction & Funnel Teardown</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> 14-Day Delivery + Video Briefing</li>
                </ul>
              </div>
            </div>

            <div class="pt-8">
              <a href="#/growth-diagnostic" class="btn-physical-secondary w-full text-xs">
                <span>ORDER DIAGNOSTIC AUDIT</span>
              </a>
            </div>
          </div>

          <!-- Tier 2: Foundation Sprint -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="punched-hole"></div>
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div>
              <div class="font-mono text-xs font-bold text-[#06b6d4] uppercase mb-1">STAGE 02 // SPRINT</div>
              <h2 class="text-2xl font-bold text-[#2d3436]">Foundation Sprint</h2>
              <p class="text-xs text-[#718096] font-mono mt-1">Time-boxed 30-day foundation overhaul</p>

              <div class="my-6 p-4 bg-[#d1d9e6]/50 rounded-xl shadow-recessed text-center font-mono">
                <div class="text-3xl font-extrabold text-[#2d3436]">$6,500</div>
                <div class="text-[10px] text-[#718096] uppercase font-bold mt-1">[INSERT FINAL PRICE] · FIXED-FEE SPRINT</div>
              </div>

              <div class="space-y-4 text-xs text-[#4a5568]">
                <p class="font-semibold text-[#2d3436]">Who it is for:</p>
                <p>Clients converting off the Diagnostic who need their tracking fixed, high-converting templates built, and first channel launched.</p>

                <p class="font-semibold text-[#2d3436] pt-2 border-t border-[#d1d9e6]">What's included:</p>
                <ul class="space-y-2 font-mono text-[11px]">
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Server-Side GTM, GA4 & CRM Sync</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> 2 High-Conversion Landing Pages</li>
                  <li class="flex items-center gap-2"><span class="text-[#06b6d4]">✓</span> Schema & Entity Graph Build</li>
                  <li class="flex items-center gap-2"><span class="text-[#ff4757]">✓</span> 1 Core Channel Relaunch (Ads or SEO)</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> 30-Day Turnaround Guarantee</li>
                </ul>
              </div>
            </div>

            <div class="pt-8">
              <a href="#/contact" class="btn-physical-secondary w-full text-xs">
                <span>INQUIRE ABOUT SPRINT</span>
              </a>
            </div>
          </div>

          <!-- Tier 3: Growth Retainer (Core Flagship) -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between border-2 border-[#ff4757] shadow-floating bg-[#fbfcfd] relative">
            <div class="masking-tape !absolute -top-3 left-1/2 -translate-x-1/2">CORE PARTNERSHIP</div>
            <div class="punched-hole mt-2"></div>
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div>
              <div class="font-mono text-xs font-bold text-[#ff4757] uppercase mb-1">STAGE 03 // FULL FUNNEL</div>
              <h2 class="text-2xl font-bold text-[#2d3436]">Growth Retainer</h2>
              <p class="text-xs text-[#718096] font-mono mt-1">Full-funnel monthly growth squad</p>

              <div class="my-6 p-4 bg-white rounded-xl shadow-recessed text-center font-mono">
                <div class="text-2xl font-extrabold text-[#ff4757]">$4,500 – $9,500<span class="text-xs text-[#718096]">/mo</span></div>
                <div class="text-[10px] text-[#718096] uppercase font-bold mt-1">[INSERT FINAL PRICE] · BANDED BY CHANNELS</div>
              </div>

              <div class="space-y-4 text-xs text-[#4a5568]">
                <p class="font-semibold text-[#2d3436]">Who it is for:</p>
                <p>Scaling SMBs and mid-market companies replacing 2–4 disjointed vendors with one accountable team of record.</p>

                <p class="font-semibold text-[#2d3436] pt-2 border-t border-[#d1d9e6]">Banded by Channel Scope:</p>
                <ul class="space-y-2 font-mono text-[11px]">
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> <strong>Core (2 Channels):</strong> $4,500/mo</li>
                  <li class="flex items-center gap-2"><span class="text-[#06b6d4]">✓</span> <strong>Multichannel (3-4 Ch.):</strong> $6,800/mo</li>
                  <li class="flex items-center gap-2"><span class="text-[#ff4757]">✓</span> <strong>Omnichannel (All 9):</strong> $9,500/mo</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Bi-Weekly Attribution & Pipeline Calls</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Continuous CRO & Creative Testing</li>
                </ul>
              </div>
            </div>

            <div class="pt-8">
              <a href="#/contact" class="btn-physical-primary w-full text-xs">
                <span>SELECT RETAINER TIER</span>
              </a>
            </div>
          </div>

          <!-- Tier 4: Enterprise / Fractional -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="punched-hole"></div>
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div>
              <div class="font-mono text-xs font-bold text-[#718096] uppercase mb-1">STAGE 04 // ENTERPRISE</div>
              <h2 class="text-2xl font-bold text-[#2d3436]">Fractional Squad</h2>
              <p class="text-xs text-[#718096] font-mono mt-1">Custom-quoted dedicated growth division</p>

              <div class="my-6 p-4 bg-[#d1d9e6]/50 rounded-xl shadow-recessed text-center font-mono">
                <div class="text-2xl font-extrabold text-[#2d3436]">CUSTOM</div>
                <div class="text-[10px] text-[#718096] uppercase font-bold mt-1">LET'S TALK · CUSTOM QUOTED</div>
              </div>

              <div class="space-y-4 text-xs text-[#4a5568]">
                <p class="font-semibold text-[#2d3436]">Who it is for:</p>
                <p>Enterprise and high-growth accounts requiring dedicated headcount, multi-brand attribution models, and custom data warehouse engineering.</p>

                <p class="font-semibold text-[#2d3436] pt-2 border-t border-[#d1d9e6]">What's included:</p>
                <ul class="space-y-2 font-mono text-[11px]">
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Dedicated Senior Growth Squad</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Custom Snowflake / BigQuery Pipeline</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Executive Board & Investor Reporting</li>
                  <li class="flex items-center gap-2"><span class="text-[#22c55e]">✓</span> Unlimited Creative & Landing Experiments</li>
                </ul>
              </div>
            </div>

            <div class="pt-8">
              <a href="#/contact" class="btn-physical-secondary w-full text-xs">
                <span>TALK TO PARTNERSHIP LEAD</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Interactive Retainer Scope Calculator / Band Selector -->
        <div class="bolted-card p-8 rounded-2xl bg-[#f0f2f5] border border-[#d1d9e6] mb-16">
          <div class="screw-head screw-tl"></div>
          <div class="screw-head screw-tr"></div>
          <div class="screw-head screw-bl"></div>
          <div class="screw-head screw-br"></div>

          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <span class="font-mono text-xs font-bold text-[#ff4757] uppercase">INTERACTIVE BAND ESTIMATOR</span>
              <h3 class="text-2xl font-bold text-[#2d3436] mt-1">Configure Your Growth Retainer Scope</h3>
              <p class="text-xs text-[#718096]">Select the channels you need active to view recommended banding.</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 font-mono text-xs">
              <label class="flex items-center gap-2 p-3 bg-white rounded-lg shadow-card cursor-pointer">
                <input type="checkbox" checked onchange="window.updatePricingScope()" class="channel-scope-cb text-[#ff4757]" />
                <span>SEO Architecture</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-white rounded-lg shadow-card cursor-pointer">
                <input type="checkbox" checked onchange="window.updatePricingScope()" class="channel-scope-cb text-[#ff4757]" />
                <span>GEO / AI Search</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-white rounded-lg shadow-card cursor-pointer">
                <input type="checkbox" checked onchange="window.updatePricingScope()" class="channel-scope-cb text-[#ff4757]" />
                <span>Google Search Ads</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-white rounded-lg shadow-card cursor-pointer">
                <input type="checkbox" onchange="window.updatePricingScope()" class="channel-scope-cb text-[#ff4757]" />
                <span>Meta / Social Ads</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-white rounded-lg shadow-card cursor-pointer">
                <input type="checkbox" onchange="window.updatePricingScope()" class="channel-scope-cb text-[#ff4757]" />
                <span>LinkedIn ABM</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-white rounded-lg shadow-card cursor-pointer">
                <input type="checkbox" checked onchange="window.updatePricingScope()" class="channel-scope-cb text-[#ff4757]" />
                <span>CRO & Attribution</span>
              </label>
            </div>

            <div class="metric-readout-module text-center p-6">
              <div class="text-xs font-mono text-[#718096] uppercase">RECOMMENDED PARTNERSHIP BAND</div>
              <div id="pricing-scope-band" class="text-3xl font-extrabold font-mono text-[#ff4757] my-2">$6,800 / month</div>
              <div id="pricing-scope-desc" class="text-xs text-[#4a5568]">Multichannel Tier (4 active channels with bi-weekly attribution sync)</div>
            </div>
          </div>
        </div>

      </section>
    `
  },

  // --------------------------------------------------------------------------
  // CONTACT / BOOK A CALL
  // --------------------------------------------------------------------------
  'contact': {
    title: 'Book a Strategy Session — TeamRion',
    meta: 'Schedule a 30-minute growth architecture briefing with our senior growth squad. No sales reps — speak directly with practitioners.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">GET IN TOUCH</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Initialize Growth <span class="text-[#ff4757]">Briefing.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Direct access to our senior practitioners. We review your actual metrics, diagnose bottlenecks, and discuss feasibility.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left: Contact Data & SLA Readout -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bolted-card p-6 rounded-2xl">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              
              <div class="flex items-center gap-3 mb-4">
                <span class="led-indicator led-glow-green"></span>
                <span class="font-mono text-xs font-bold uppercase text-[#22c55e]">COMMUNICATION TERMINAL ACTIVE</span>
              </div>

              <div class="space-y-4 text-xs font-mono">
                <div>
                  <div class="text-[#718096]">DIRECT BRIEFING INBOX</div>
                  <div class="text-sm font-bold text-[#2d3436] mt-0.5">growth@teamrion.com</div>
                </div>
                <div>
                  <div class="text-[#718096]">SERVICE LEVEL AGREEMENT</div>
                  <div class="text-sm font-bold text-[#22c55e] mt-0.5">&lt; 2 HOUR RESPONSE GUARANTEE</div>
                </div>
                <div>
                  <div class="text-[#718096]">OPERATIONAL HEADQUARTERS</div>
                  <div class="text-sm font-bold text-[#2d3436] mt-0.5">San Francisco, CA · Remote Growth Squads Worldwide</div>
                </div>
              </div>
            </div>

            <!-- Pre-Call Guarantee -->
            <div class="metric-readout-module p-6">
              <div class="text-xs font-mono font-bold text-[#ff4757] uppercase mb-2">● OUR ZERO-BS PROMISE</div>
              <p class="text-xs text-[#4a5568] leading-relaxed">
                You will not be pitched by an SDR or junior account executive. Every diagnostic briefing is conducted by a Growth Director who has scaled multi-million dollar funnels.
              </p>
            </div>
          </div>

          <!-- Right: Interactive Terminal Booking Form -->
          <div class="lg:col-span-7">
            <div class="bolted-card p-8 rounded-2xl bg-[#f0f2f5] border border-[#d1d9e6]">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              
              <form id="contact-form" onsubmit="window.handleContactSubmit(event)" class="space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Full Name *</label>
                    <input type="text" required class="input-recessed" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Work Email *</label>
                    <input type="email" required class="input-recessed" placeholder="jane@company.com" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Company Website *</label>
                    <input type="url" required class="input-recessed" placeholder="https://company.com" />
                  </div>
                  <div>
                    <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Current Annual Revenue / ARR</label>
                    <select class="input-recessed">
                      <option>&lt; $500K</option>
                      <option selected>$500K – $2M</option>
                      <option>$2M – $10M</option>
                      <option>$10M – $50M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Primary Growth Objective / Core Bottleneck</label>
                  <textarea rows="4" required class="input-recessed !min-h-[100px]" placeholder="Describe your current marketing setup, channels in use, and what needs fixing..."></textarea>
                </div>

                <button type="submit" class="btn-physical-primary w-full">
                  <span>DISPATCH BRIEFING REQUEST</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </button>

                <div id="contact-success-msg" class="hidden p-4 rounded-lg bg-[#22c55e]/15 border border-[#22c55e] text-[#166534] font-mono text-xs text-center">
                  ✓ BRIEFING SIGNAL RECEIVED. A Growth Director will contact you within 2 hours.
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    `
  },

  // --------------------------------------------------------------------------
  // COMPREHENSIVE SCHEMA-MARKED FAQ
  // --------------------------------------------------------------------------
  'faq': {
    title: 'Comprehensive Schema FAQ — TeamRion',
    meta: 'In-depth answers about full-funnel growth partnerships, GEO vs traditional SEO, banded pricing, and WordPress/Elementor engineering standards.',
    render: () => `
      <section class="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">SCHEMA-MARKED INTELLIGENCE</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Frequently Answered <span class="text-[#ff4757]">Questions.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Unlike superficial agency FAQ pages, we provide exhaustive technical, financial, and operational transparency.
          </p>
        </div>

        <!-- FAQ Categories / Accordion -->
        <div class="space-y-6">
          
          <!-- Category 1: Full-Funnel vs Freelancers -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff4757]"></span>
              <h2 class="font-mono text-xs font-bold uppercase tracking-wider text-[#2d3436]">01. FULL-FUNNEL PARTNERSHIP VS. FREELANCER PATCHWORK</h2>
            </div>
            
            <div class="space-y-3">
              <div class="bolted-card p-5 rounded-xl">
                <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-sm md:text-base">
                  <span>Why should we hire TeamRion instead of managing our own freelancers?</span>
                  <span class="text-[#ff4757] text-xl font-mono">+</span>
                </button>
                <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                  Managing multiple freelancers requires 15–20 hours per week of your internal executive time. More importantly, freelancers lack holistic accountability: an SEO freelancer doesn't fix your landing page conversion rates, and an ad buyer doesn't fix your email nurture sequence. TeamRion replaces that friction with one cohesive growth squad and a single multi-touch attribution model tying all channels to pipeline revenue.
                </div>
              </div>

              <div class="bolted-card p-5 rounded-xl">
                <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-sm md:text-base">
                  <span>How quickly do we see measurable pipeline results?</span>
                  <span class="text-[#ff4757] text-xl font-mono">+</span>
                </button>
                <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                  Our 30-Day Foundation Sprint delivers immediate quick wins by eliminating wasted ad spend, deploying high-converting landing templates, and fixing tracking attribution. Organic SEO and GEO citation authority compound steadily between months 2 and 6.
                </div>
              </div>
            </div>
          </div>

          <!-- Category 2: GEO & AI Search -->
          <div class="pt-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-[#06b6d4]"></span>
              <h2 class="font-mono text-xs font-bold uppercase tracking-wider text-[#2d3436]">02. GEO & AI SEARCH OPTIMIZATION</h2>
            </div>
            
            <div class="space-y-3">
              <div class="bolted-card p-5 rounded-xl">
                <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-sm md:text-base">
                  <span>How does GEO (Generative Engine Optimization) differ from standard SEO?</span>
                  <span class="text-[#06b6d4] text-xl font-mono">+</span>
                </button>
                <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                  Traditional SEO targets keyword rankings in 10 blue links. GEO optimizes your brand's presence within the training data, web-browsing index, and entity citation graphs of Large Language Models (ChatGPT, Claude, Perplexity, Google Gemini). We structure fact tables, JSON-LD entity graphs, and PR citation seeds so AI engines synthesize recommendations with your product at the top.
                </div>
              </div>

              <div class="bolted-card p-5 rounded-xl">
                <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-sm md:text-base">
                  <span>How do you track AI citation share and referral traffic?</span>
                  <span class="text-[#06b6d4] text-xl font-mono">+</span>
                </button>
                <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                  We use proprietary LLM prompt tracking rigs across 50+ high-intent buyer prompts monthly, measuring your citation frequency vs competitors, alongside custom GA4 regex filters tracking direct referral traffic from chatgpt.com, perplexity.ai, and claude.ai.
                </div>
              </div>
            </div>
          </div>

          <!-- Category 3: WordPress & Elementor Standards -->
          <div class="pt-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
              <h2 class="font-mono text-xs font-bold uppercase tracking-wider text-[#2d3436]">03. WORDPRESS + ELEMENTOR TECHNICAL INTEGRITY</h2>
            </div>
            
            <div class="space-y-3">
              <div class="bolted-card p-5 rounded-xl">
                <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-sm md:text-base">
                  <span>Is Elementor fast enough for high-growth enterprise marketing?</span>
                  <span class="text-[#22c55e] text-xl font-mono">+</span>
                </button>
                <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                  Yes, when built by engineers rather than amateurs. We avoid bloated third-party plugin suites, implement lightweight custom CSS classes, enforce Elementor Global Color/Typography tokens, lazy-load assets, and configure Server-Side caching to consistently deliver 90+ mobile Core Web Vitals scores.
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- FAQ Schema JSON-LD Script Embedded for Search Engines -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Why should we hire TeamRion instead of managing our own freelancers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "TeamRion unifies SEO, GEO AI search, Paid Media, Automation, and CRO under one accountable team of record with a single multi-touch attribution model."
              }
            },
            {
              "@type": "Question",
              "name": "What is GEO (Generative Engine Optimization)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "GEO optimizes your brand entity footprint across LLMs like ChatGPT and Perplexity to guarantee top AI synthesis recommendations."
              }
            }
          ]
        }
        </script>

      </section>
    `
  }
};

window.CORE_PAGES = CORE_PAGES;
