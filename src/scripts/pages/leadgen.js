/**
 * TeamRion — High-Converting Interactive Lead-Gen Landing Pages
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const LEADGEN_PAGES = {
  // --------------------------------------------------------------------------
  // GROWTH DIAGNOSTIC
  // --------------------------------------------------------------------------
  'growth-diagnostic': {
    title: 'Full-Funnel Growth Diagnostic — TeamRion',
    meta: 'Complete our 60-second growth diagnostic to identify leaked pipeline across SEO, AI search, Paid Media, and CRO.',
    render: () => `
      <section class="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <div class="masking-tape mb-3">60-SECOND SELF ASSESSMENT</div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Full-Funnel Growth <span class="text-[#ff4757]">Diagnostic.</span>
          </h1>
          <p class="text-base text-[#4a5568] mt-3">
            Answer 4 quick technical questions to generate an immediate growth bottleneck score and receive a tailored 90-day action blueprint.
          </p>
        </div>

        <!-- Interactive Diagnostic Terminal Container (Light Neumorphic) -->
        <div class="bolted-card p-6 md:p-10 rounded-3xl bg-[#f0f2f5] border border-white relative shadow-floating">
          <div class="screw-head screw-tl"></div>
          <div class="screw-head screw-tr"></div>
          <div class="screw-head screw-bl"></div>
          <div class="screw-head screw-br"></div>
          
          <div id="diagnostic-quiz-container">
            <!-- Step Indicator -->
            <div class="flex items-center justify-between pb-4 border-b border-[#d1d9e6] mb-6 text-xs font-mono">
              <div class="flex items-center gap-2">
                <span class="led-indicator led-glow-orange"></span>
                <span class="text-[#2d3436] font-bold">SYSTEM AUDIT IN PROGRESS</span>
              </div>
              <div class="text-[#718096]">STEP <span id="diag-step-num">1</span> OF 4</div>
            </div>

            <!-- Question 1 -->
            <div id="diag-q1" class="diag-question-step space-y-4">
              <h2 class="text-lg md:text-xl font-bold text-[#2d3436]">
                1. How is your marketing currently managed across channels?
              </h2>
              <div class="space-y-3 font-mono text-xs">
                <button onclick="window.answerDiagnostic(1, 'siloed')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>A. We juggle 2 to 4 separate freelancers/agencies who don't talk to each other.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
                <button onclick="window.answerDiagnostic(1, 'internal')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>B. We have an in-house generalist managing ads, SEO, and content alone.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
                <button onclick="window.answerDiagnostic(1, 'design_only')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>C. We hired a design studio for a website redesign, but traffic & leads are flat.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
              </div>
            </div>

            <!-- Question 2 -->
            <div id="diag-q2" class="diag-question-step hidden space-y-4">
              <h2 class="text-lg md:text-xl font-bold text-[#2d3436]">
                2. What is your current visibility in AI search engines (Perplexity, ChatGPT)?
              </h2>
              <div class="space-y-3 font-mono text-xs">
                <button onclick="window.answerDiagnostic(2, 'unknown')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>A. We have no idea if or how AI engines cite our brand.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
                <button onclick="window.answerDiagnostic(2, 'competitor_cited')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>B. Our competitors get cited when asking for alternatives in our space.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
                <button onclick="window.answerDiagnostic(2, 'active_seo_only')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>C. We do traditional Google SEO, but have not configured structured GEO entity graphs.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
              </div>
            </div>

            <!-- Question 3 -->
            <div id="diag-q3" class="diag-question-step hidden space-y-4">
              <h2 class="text-lg md:text-xl font-bold text-[#2d3436]">
                3. How accurate is your current revenue attribution model?
              </h2>
              <div class="space-y-3 font-mono text-xs">
                <button onclick="window.answerDiagnostic(3, 'broken')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>A. Broken: Google Ads claims 50 leads, Meta claims 40, but CRM only shows 30 total.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
                <button onclick="window.answerDiagnostic(3, 'ga4_basic')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>B. Basic: Standard GA4 last-click, but we cannot tie closed-won deals to first touch.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
                <button onclick="window.answerDiagnostic(3, 'none')" class="w-full text-left p-4 rounded-xl bg-white shadow-card hover:text-[#ff4757] hover:-translate-y-0.5 transition flex items-center justify-between">
                  <span>C. None: We rely on gut feel and monthly traffic reports.</span>
                  <span class="text-[#ff4757]">&rarr;</span>
                </button>
              </div>
            </div>

            <!-- Question 4: Submission & Results Delivery -->
            <div id="diag-q4" class="diag-question-step hidden space-y-4">
              <h2 class="text-lg md:text-xl font-bold text-[#2d3436]">
                4. Where should we deliver your Full-Funnel Growth Diagnostic Blueprint?
              </h2>
              <p class="text-xs text-[#4a5568]">
                Includes your calculated pipeline leakage score, channel priority roadmap, and GEO citation readiness benchmark.
              </p>

              <form onsubmit="window.submitDiagnosticLead(event)" class="space-y-4 pt-2">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1">Your Name *</label>
                    <input type="text" required class="input-recessed" placeholder="Alex Morgan" />
                  </div>
                  <div>
                    <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1">Work Email *</label>
                    <input type="email" required class="input-recessed" placeholder="alex@company.com" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1">Company Domain *</label>
                  <input type="url" required class="input-recessed" placeholder="https://company.com" />
                </div>

                <button type="submit" class="btn-physical-primary w-full">
                  <span>GENERATE MY GROWTH BLUEPRINT</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </button>
              </form>
            </div>

            <!-- Quiz Completed Result View -->
            <div id="diag-result-view" class="hidden space-y-6">
              <div class="metric-readout-module text-center p-6 bg-[#f0f2f5] text-[#2d3436] border border-white">
                <span class="led-indicator led-glow-green mb-2"></span>
                <div class="text-xs font-mono text-[#718096]">DIAGNOSTIC TELEMETRY COMPLETE</div>
                <div class="text-3xl font-extrabold font-mono text-[#ff4757] my-2">HIGH PIPELINE LEAKAGE DETECTED</div>
                <div class="text-xs text-[#4a5568] max-w-lg mx-auto">
                  Your assessment indicates a <strong>42% estimated pipeline loss</strong> caused by disconnected channel tracking and zero LLM entity graph optimization.
                </div>
              </div>

              <div class="p-4 bg-white rounded-xl shadow-card text-xs text-[#4a5568] space-y-3">
                <div class="font-mono font-bold text-[#2d3436]">NEXT STEP: 14-DAY GROWTH DIAGNOSTIC ENGAGEMENT</div>
                <p>Our senior squad is preparing your custom teardown. If you would like to fast-track your 14-day formal Growth Diagnostic ($1,450 fixed-fee), reserve your slot below.</p>
                <div class="pt-2 flex gap-3">
                  <a href="#/contact" class="btn-physical-primary flex-1 text-xs text-center"><span>BOOK 30-MIN BRIEFING</span></a>
                  <a href="#/pricing" class="btn-physical-secondary text-xs"><span>VIEW PRICING</span></a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    `
  },

  // --------------------------------------------------------------------------
  // AI SEARCH VISIBILITY AUDIT (Light Neumorphic Layout)
  // --------------------------------------------------------------------------
  'ai-search-audit': {
    title: 'AI Search Visibility Audit (GEO) — TeamRion',
    meta: 'Test your brand visibility in Perplexity, ChatGPT, Claude, and Google AI Overviews. Discover if AI models recommend you to buyers.',
    render: () => `
      <section class="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <div class="masking-tape masking-tape-alt mb-3">GEO PROMPT CHECKER</div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            AI Search Visibility <span class="text-[#06b6d4]">Audit.</span>
          </h1>
          <p class="text-base text-[#4a5568] mt-3">
            Simulate how Large Language Models evaluate your brand against competitors in high-intent purchase queries.
          </p>
        </div>

        <!-- AI Simulation Console (Light Neumorphic) -->
        <div class="bolted-card p-6 md:p-10 rounded-3xl bg-[#f0f2f5] text-[#2d3436] border border-white relative shadow-floating mb-12">
          <div class="screw-head screw-tl"></div>
          <div class="screw-head screw-tr"></div>
          <div class="screw-head screw-bl"></div>
          <div class="screw-head screw-br"></div>

          <div class="flex items-center justify-between pb-3 border-b border-[#d1d9e6] mb-6 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="led-indicator led-glow-cyan"></span>
              <span class="text-[#06b6d4] font-bold">LLM ENTITY PROMPT PROFILER</span>
            </div>
            <div class="text-[#718096]">MODEL: PERPLEXITY / GPT-4o COMBINED</div>
          </div>

          <form onsubmit="window.runAIAuditSimulation(event)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Brand / Company Domain</label>
                <input id="audit-domain" type="text" required class="input-recessed" placeholder="e.g. acmecloud.com" />
              </div>
              <div>
                <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-1.5">Target Category / Primary Niche</label>
                <input id="audit-category" type="text" required class="input-recessed" placeholder="e.g. B2B Billing Software" />
              </div>
            </div>

            <button type="submit" class="btn-physical-primary w-full">
              <span>INITIALIZE AI CITATION SCAN</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </form>

          <!-- Audit Telemetry Output -->
          <div id="ai-audit-output" class="hidden mt-8 pt-6 border-t border-[#d1d9e6] space-y-4">
            <div class="crt-screen-bezel p-4 text-xs font-mono space-y-3">
              <div class="text-[#06b6d4]">>>> ANALYZING ENTITY GRAPH NODES FOR: <span id="audit-out-domain" class="text-white font-bold"></span>...</div>
              <div class="text-[#889988]">>>> TESTING PROMPT: "What are the best alternatives in <span id="audit-out-cat" class="text-white"></span>?"</div>
              
              <div class="p-3 bg-[#0b1214] rounded border border-[#1a2b30] text-[11px] text-[#a8b2d1] space-y-1">
                <div>● ChatGPT Citation Status: <span class="text-[#f59e0b] font-bold">LIMITED MENTION (LOW SCHEMA DENSITY)</span></div>
                <div>● Perplexity Citation Status: <span class="text-[#ff4757] font-bold">MISSING DIGITAL CITATION SEEDS</span></div>
                <div>● Claude 3.5 Sonnet Fact Graph: <span class="text-[#f59e0b] font-bold">PARTIAL ENTITY GRAPH DETECTED</span></div>
              </div>

              <div class="text-[#22c55e] font-bold pt-1">
                RECOMMENDATION: Deploy JSON-LD Organization & Product Graph + Seed Authority Citations.
              </div>
            </div>

            <div class="pt-2 text-center">
              <a href="#/contact" class="btn-physical-primary text-xs">
                <span>SCHEDULE FULL GEO OPTIMIZATION SPRINT</span>
              </a>
            </div>
          </div>
        </div>

      </section>
    `
  }
};

window.LEADGEN_PAGES = LEADGEN_PAGES;
