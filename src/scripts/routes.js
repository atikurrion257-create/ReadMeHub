/**
 * TeamRion — Full Route Catalog & Comprehensive Page Content Store
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const SITE_ROUTES = {
  // --------------------------------------------------------------------------
  // CORE: HOMEPAGE
  // --------------------------------------------------------------------------
  'home': {
    title: 'TeamRion — Full-Funnel Digital Growth Partner',
    meta: 'Replace disconnected freelancers with one accountable growth engine. SEO, GEO/AI Search, Paid Media, Automation, CRO & Web Development under one measurement framework.',
    render: () => `
      <!-- HERO SECTION (Asymmetric 60/40 Desktop Grid) -->
      <section class="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Operational Status Badge -->
          <div class="inline-flex items-center gap-3 px-3 py-1.5 rounded-full shadow-recessed mb-8 bg-[#d1d9e6]/60">
            <span class="led-indicator led-glow-green"></span>
            <span class="text-xs font-mono font-bold tracking-wider text-[#2d3436] uppercase">SYSTEM OPERATIONAL · ENGINE v4.2 [LIVE]</span>
            <span class="text-xs font-mono text-[#ff4757] font-semibold">ALL CHANNELS ACTIVE</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <!-- Left Column: Copy & CTAs (60%) -->
            <div class="lg:col-span-7 space-y-6">
              <div class="masking-tape mb-2">FULL-FUNNEL ACCOUNTABILITY</div>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2d3436] tracking-tight leading-[1.1] hero-embossed-text">
                Stop Juggling Freelancers. Build One Measurable <span class="text-[#ff4757]">Growth Engine.</span>
              </h1>
              <p class="text-lg sm:text-xl text-[#4a5568] leading-relaxed max-w-2xl">
                We unify <strong>SEO</strong>, <strong>GEO (AI-Search Optimization)</strong>, <strong>Paid Media</strong>, <strong>Marketing Automation</strong>, <strong>CRO</strong>, and <strong>High-Performance Web Architecture</strong> into a single accountable pipeline framework. One team. One attribution model. Predictable revenue.
              </p>

              <!-- Rapid Value Points -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#2d3436]">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#ff4757]"></span>
                  <span>ZERO SILOED VENDORS</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#22c55e]"></span>
                  <span>UNIFIED ATTRIBUTION STACK</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                  <span>PERPLEXITY & CHATGPT READY</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
                  <span>TIED DIRECTLY TO PIPELINE</span>
                </div>
              </div>

              <!-- CTA Cluster (Physical Keys) -->
              <div class="flex flex-wrap items-center gap-4 pt-4">
                <a href="#/growth-diagnostic" class="btn-physical-primary">
                  <span>START GROWTH DIAGNOSTIC</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
                <a href="#/pricing" class="btn-physical-secondary">
                  <span>VIEW BANDED PRICING</span>
                </a>
                <a href="#/ai-search-audit" class="btn-physical-recessed text-xs flex items-center gap-1.5">
                  <span class="led-indicator led-glow-cyan"></span>
                  <span>RUN AI-SEARCH AUDIT</span>
                </a>
              </div>

              <div class="pt-4 flex items-center gap-3 text-xs text-[#718096] font-mono">
                <span class="font-bold text-[#2d3436]">NEED A RELIABLE GROWTH SQUAD?</span>
                <a href="#/compare/vs-traditional-agencies" class="text-[#ff4757] font-semibold underline hover:text-[#e03242]">Compare our model vs traditional agencies &rarr;</a>
              </div>
            </div>

            <!-- Right Column: 3D Growth Console Device Mockup (Tactile Light Industrial Chassis) -->
            <div class="lg:col-span-5">
              <div class="bolted-card bg-[#f0f2f5] p-5 rounded-2xl shadow-floating border border-white relative">
                <!-- Screws on Device Bezel -->
                <div class="screw-head screw-tl"></div>
                <div class="screw-head screw-tr"></div>
                <div class="screw-head screw-bl"></div>
                <div class="screw-head screw-br"></div>

                <!-- Console Top Header -->
                <div class="flex items-center justify-between pb-3 border-b border-[#d1d9e6] mb-4">
                  <div class="flex items-center gap-2">
                    <span class="led-indicator led-glow-green"></span>
                    <span class="text-[11px] font-mono font-bold text-[#2d3436] tracking-widest uppercase">TR-CONSOLE // SIGNAL MONITOR</span>
                  </div>
                  <div class="vent-slots !top-3 !right-4">
                    <span class="vent-slot"></span>
                    <span class="vent-slot"></span>
                    <span class="vent-slot"></span>
                  </div>
                </div>

                <!-- CRT Monitor Screen (Recessed High-Contrast Telemetry Panel) -->
                <div class="crt-screen-bezel p-4 mb-4">
                  <div class="crt-scanlines"></div>
                  <div class="crt-vignette"></div>
                  
                  <div class="crt-screen-content space-y-4">
                    <!-- Live Channel Selector -->
                    <div class="flex items-center justify-between text-[10px] pb-2 border-b border-[#1f3028]">
                      <span class="text-[#22c55e] font-bold">SIGNAL: <span id="console-active-signal">ALL_FUNNEL</span></span>
                      <span class="text-[#889988]">FPS: 60 // PING: 12ms</span>
                    </div>

                    <!-- Dynamic SVG Growth Trend Line -->
                    <div class="h-28 w-full relative">
                      <svg class="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="crtGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#22c55e" stop-opacity="0.4"/>
                            <stop offset="100%" stop-color="#22c55e" stop-opacity="0.0"/>
                          </linearGradient>
                        </defs>
                        <!-- Grid Lines -->
                        <line x1="0" y1="25" x2="300" y2="25" stroke="#172b22" stroke-dasharray="3,3"/>
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#172b22" stroke-dasharray="3,3"/>
                        <line x1="0" y1="75" x2="300" y2="75" stroke="#172b22" stroke-dasharray="3,3"/>
                        <!-- Area Fill -->
                        <path id="console-chart-area" d="M0,85 Q50,78 100,60 T200,35 T300,10 L300,100 L0,100 Z" fill="url(#crtGlow)" />
                        <!-- Line -->
                        <path id="console-chart-line" d="M0,85 Q50,78 100,60 T200,35 T300,10" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
                        <!-- Animated Marker -->
                        <circle id="console-marker" cx="300" cy="10" r="4" fill="#ff4757" stroke="#ffffff" stroke-width="1.5">
                          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                    </div>

                    <!-- Instrumentation Counters -->
                    <div class="grid grid-cols-3 gap-2 text-center pt-1 border-t border-[#1f3028]">
                      <div class="bg-[#0b1210] p-1.5 rounded border border-[#1a2d24]">
                        <div class="text-[9px] text-[#889988] uppercase">AI Citations</div>
                        <div id="console-val-ai" class="text-xs font-bold text-[#06b6d4]">84.2%</div>
                      </div>
                      <div class="bg-[#0b1210] p-1.5 rounded border border-[#1a2d24]">
                        <div class="text-[9px] text-[#889988] uppercase">Org. Pipeline</div>
                        <div id="console-val-pipeline" class="text-xs font-bold text-[#22c55e]">3.4x</div>
                      </div>
                      <div class="bg-[#0b1210] p-1.5 rounded border border-[#1a2d24]">
                        <div class="text-[9px] text-[#889988] uppercase">Blended CAC</div>
                        <div id="console-val-cac" class="text-xs font-bold text-[#ff4757]">-38%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Interactive Hardware Switches -->
                <div class="flex items-center justify-between gap-2 pt-2">
                  <button onclick="window.updateConsoleChannel('all')" class="console-tab-btn flex-1 py-1.5 px-2 rounded text-[10px] font-mono font-bold uppercase transition bg-[#d1d9e6] text-[#ff4757] shadow-recessed active:translate-y-0.5">ALL</button>
                  <button onclick="window.updateConsoleChannel('geo')" class="console-tab-btn flex-1 py-1.5 px-2 rounded text-[10px] font-mono font-bold uppercase transition bg-[#e0e5ec] text-[#4a5568] hover:text-[#06b6d4] shadow-card active:translate-y-0.5">GEO/AI</button>
                  <button onclick="window.updateConsoleChannel('seo')" class="console-tab-btn flex-1 py-1.5 px-2 rounded text-[10px] font-mono font-bold uppercase transition bg-[#e0e5ec] text-[#4a5568] hover:text-[#22c55e] shadow-card active:translate-y-0.5">SEO</button>
                  <button onclick="window.updateConsoleChannel('paid')" class="console-tab-btn flex-1 py-1.5 px-2 rounded text-[10px] font-mono font-bold uppercase transition bg-[#e0e5ec] text-[#4a5568] hover:text-[#ff4757] shadow-card active:translate-y-0.5">PAID</button>
                  <button onclick="window.updateConsoleChannel('cro')" class="console-tab-btn flex-1 py-1.5 px-2 rounded text-[10px] font-mono font-bold uppercase transition bg-[#e0e5ec] text-[#4a5568] hover:text-[#f59e0b] shadow-card active:translate-y-0.5">CRO</button>
                </div>

                <div class="mt-3 text-[10px] font-mono text-[#718096] text-center">
                  DIAL STATUS: <span class="text-[#22c55e] font-semibold">SYNCHRONIZED ATTRIBUTION ENGINE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: STATS STRIP (Light Neumorphic Layout) -->
      <section class="bg-[#f0f2f5] py-12 border-y border-[#d1d9e6] relative overflow-hidden bg-blueprint-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div class="flex items-center gap-3">
              <span class="led-indicator led-glow-orange"></span>
              <span class="text-xs font-mono font-bold tracking-widest text-[#2d3436] uppercase">INSTRUMENTATION READOUT // PROOF ENGINE</span>
            </div>
            <div class="placeholder-data-badge">
              <span>● PROOF PROTOCOL: STRICT PLACEHOLDER DISCIPLINE (§4)</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Readout 1 -->
            <div class="metric-readout-module">
              <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                <span>METRIC_ID: 001</span>
                <span class="text-[#22c55e]">● 90-DAY WINDOW</span>
              </div>
              <div class="text-3xl font-extrabold font-mono text-[#22c55e] tracking-tight py-1">+142%</div>
              <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">ORGANIC PIPELINE REVENUE</div>
              <div class="text-[10px] font-mono text-[#718096] mt-2">B2B SaaS Infrastructure Client</div>
            </div>

            <!-- Readout 2 -->
            <div class="metric-readout-module">
              <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                <span>METRIC_ID: 002</span>
                <span class="text-[#06b6d4]">● AI PROMPT SHARE</span>
              </div>
              <div class="text-3xl font-extrabold font-mono text-[#06b6d4] tracking-tight py-1">#1</div>
              <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">AI CITATION SHARE (PERPLEXITY & GPT)</div>
              <div class="text-[10px] font-mono text-[#718096] mt-2">FinTech Compliance Suite</div>
            </div>

            <!-- Readout 3 -->
            <div class="metric-readout-module">
              <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                <span>METRIC_ID: 003</span>
                <span class="text-[#ff4757]">● CAC COMPRESSION</span>
              </div>
              <div class="text-3xl font-extrabold font-mono text-[#ff4757] tracking-tight py-1">-46%</div>
              <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">BLENDED COST PER ACQUISITION</div>
              <div class="text-[10px] font-mono text-[#718096] mt-2">High-Ticket Professional Services</div>
            </div>

            <!-- Readout 4 -->
            <div class="metric-readout-module">
              <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                <span>METRIC_ID: 004</span>
                <span class="text-[#f59e0b]">● CRO IMPACT</span>
              </div>
              <div class="text-3xl font-extrabold font-mono text-[#f59e0b] tracking-tight py-1">3.2x</div>
              <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">DEMO BOOKING VELOCITY</div>
              <div class="text-[10px] font-mono text-[#718096] mt-2">E-Commerce & Supply Chain SaaS</div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: THE PROBLEM — JUGGLING 4 DISCONNECTED VENDORS -->
      <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">THE AGENCY PARADOX</div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Why Fragmented Marketing Stalls Your Growth
          </h2>
          <p class="text-base md:text-lg text-[#4a5568] mt-3">
            Mid-market companies waste 40%+ of their marketing capital managing the communication gap between four separate specialists who never look at the full funnel.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          <!-- The Disconnected Old Way -->
          <div class="bolted-card p-8 rounded-2xl bg-[#e5e9f0] border border-[#d1d9e6]">
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div class="flex items-center gap-2 mb-4">
              <span class="w-3 h-3 rounded-full bg-[#ff4757]"></span>
              <span class="font-mono text-xs font-bold uppercase text-[#ff4757]">THE DISCONNECTED PATCHWORK (WHAT FAILS)</span>
            </div>

            <div class="space-y-4 text-sm text-[#4a5568]">
              <div class="p-3 bg-white/60 rounded-lg shadow-recessed flex items-start gap-3">
                <span class="font-mono font-bold text-[#ff4757]">01</span>
                <div>
                  <strong class="text-[#2d3436]">Design Studio:</strong> Builds a flashy website with zero search architecture, zero schema, and no consideration for lead routing.
                </div>
              </div>
              <div class="p-3 bg-white/60 rounded-lg shadow-recessed flex items-start gap-3">
                <span class="font-mono font-bold text-[#ff4757]">02</span>
                <div>
                  <strong class="text-[#2d3436]">SEO Freelancer:</strong> Writes keyword-stuffed blog posts that bring vanity traffic but 0% pipeline contribution.
                </div>
              </div>
              <div class="p-3 bg-white/60 rounded-lg shadow-recessed flex items-start gap-3">
                <span class="font-mono font-bold text-[#ff4757]">03</span>
                <div>
                  <strong class="text-[#2d3436]">Paid Ads Agency:</strong> Blames the website conversion rate whenever ROAS dips; takes no accountability for landing page UX.
                </div>
              </div>
              <div class="p-3 bg-white/60 rounded-lg shadow-recessed flex items-start gap-3">
                <span class="font-mono font-bold text-[#ff4757]">04</span>
                <div>
                  <strong class="text-[#2d3436]">Leadership:</strong> Stuck in the middle with 4 invoices, conflicting analytics dashboards, and no clear revenue attribution.
                </div>
              </div>
            </div>
          </div>

          <!-- The TeamRion Unified Model -->
          <div class="bolted-card p-8 rounded-2xl bg-[#f0f2f5] border-2 border-[#ff4757]/30 shadow-floating">
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div class="flex items-center gap-2 mb-4">
              <span class="led-indicator led-glow-green"></span>
              <span class="font-mono text-xs font-bold uppercase text-[#22c55e]">THE TEAMRION GROWTH ENGINE (WHAT WINS)</span>
            </div>

            <div class="space-y-4 text-sm text-[#4a5568]">
              <div class="p-3 bg-white rounded-lg shadow-card flex items-start gap-3">
                <span class="font-mono font-bold text-[#22c55e]">01</span>
                <div>
                  <strong class="text-[#2d3436]">One Accountable Growth Squad:</strong> Search engineers, paid media buyers, CRO scientists, and developers synchronized in one sprint cycle.
                </div>
              </div>
              <div class="p-3 bg-white rounded-lg shadow-card flex items-start gap-3">
                <span class="font-mono font-bold text-[#22c55e]">02</span>
                <div>
                  <strong class="text-[#2d3436]">Unified Data Pipeline:</strong> Server-side GTM, GA4, HubSpot/CRM, and Looker tied directly to closed-won revenue, not clicks.
                </div>
              </div>
              <div class="p-3 bg-white rounded-lg shadow-card flex items-start gap-3">
                <span class="font-mono font-bold text-[#22c55e]">03</span>
                <div>
                  <strong class="text-[#2d3436]">GEO & Traditional Search Synchrony:</strong> Capturing intent across Google, ChatGPT, Claude, and Perplexity simultaneously.
                </div>
              </div>
              <div class="p-3 bg-white rounded-lg shadow-card flex items-start gap-3">
                <span class="font-mono font-bold text-[#22c55e]">04</span>
                <div>
                  <strong class="text-[#2d3436]">Single P&L Responsibility:</strong> We optimize your entire conversion funnel from impression to onboarding.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION: THE 9 GROWTH PILLARS (SERVICES GRID) -->
      <section class="py-20 bg-[#e0e5ec] border-t border-[#d1d9e6]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div class="masking-tape mb-3">SYSTEM CAPABILITIES</div>
              <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
                The 9 Growth Engine Pillars
              </h2>
              <p class="text-base text-[#4a5568] mt-2 max-w-xl">
                Every service engineered to work in unison or deployed as targeted modular sprints.
              </p>
            </div>
            <a href="#/services" class="btn-physical-secondary text-xs">
              <span>EXPLORE ALL SERVICES &rarr;</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Service 1: SEO -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  01
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Search Engine Optimization</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  Technical architecture, topical authority clustering, and bottom-funnel keyword domination that drives qualified buyer pipeline.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">SEARCH REVENUE</span>
                <a href="#/services/seo" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 2: GEO / AI Search -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between border-2 border-[#06b6d4]/40">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#06b6d4] font-mono font-bold">
                    02
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#06b6d4]/15 text-[#0891b2]">DIFFERENTIATED</span>
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">GEO / AI Search Optimization</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  Position your brand as the canonical citation in ChatGPT, Perplexity, Claude, and Google AI Overviews through structured entity graphs.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">LLM CITATION SHARE</span>
                <a href="#/services/geo-ai-search" class="text-xs font-mono font-bold text-[#06b6d4] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 3: Paid Media — Google -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  03
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Paid Media — Google Ads</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  High-intent capture across Google Search, Performance Max, and YouTube with surgical negative keyword structures and conversion feedback loops.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">HIGH-INTENT CAPTURE</span>
                <a href="#/services/paid-media-google" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 4: Paid Media — Meta -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  04
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Paid Media — Meta Ads</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  High-velocity creative testing engines, full-funnel remarketing, and Server-Side CAPI data pipelines to scale customer acquisition efficiently.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">CREATIVE VELOCITY</span>
                <a href="#/services/paid-media-meta" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 5: Paid Media — LinkedIn -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  05
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Paid Media — LinkedIn Ads</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  B2B Account-Based Marketing (ABM) precision targeting decision makers, buying committees, and high-value accounts with direct pipeline impact.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">B2B BUYING COMMITTEES</span>
                <a href="#/services/paid-media-linkedin" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 6: Marketing Automation -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  06
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Marketing Automation</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  HubSpot, Klaviyo, and custom lifecycle pipelines with lead scoring, multi-branch nurture sequences, and automated sales handoffs.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">LIFECYCLE PIPELINE</span>
                <a href="#/services/marketing-automation" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 7: CRO -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  07
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Conversion Rate Optimization (CRO)</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  Scientific heuristic teardowns, heatmapping, multivariate A/B testing, and friction elimination to maximize visitor-to-customer throughput.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">CONVERSION VELOCITY</span>
                <a href="#/services/cro" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 8: Analytics & Attribution -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  08
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Analytics & Attribution</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  Server-side tagging, multi-touch attribution, offline conversion imports, and executive Looker cockpits showing exact revenue per channel.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">FULL ATTRIBUTION</span>
                <a href="#/services/analytics-attribution" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

            <!-- Service 9: Web Design & Dev -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <div class="w-12 h-12 rounded-lg shadow-recessed flex items-center justify-center text-[#ff4757] font-mono font-bold mb-4">
                  09
                </div>
                <h3 class="text-xl font-bold text-[#2d3436] mb-2">Web Design & Development</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed mb-4">
                  Ultra-fast WordPress + Elementor and modern web builds engineered with industrial polish, 100/100 Core Web Vitals, and conversion triggers.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">HIGH-PERFORMANCE BUILDS</span>
                <a href="#/services/web-design-dev" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">SPEC &rarr;</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: HOW IT WORKS (WITH PHYSICAL CONNECTOR PIPES) -->
      <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">OPERATIONAL WORKFLOW</div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            The 4-Stage Growth Engineering Method
          </h2>
          <p class="text-base md:text-lg text-[#4a5568] mt-3">
            A battle-tested deployment pipeline that identifies bottlenecks, fixes the foundation, scales acquisition, and compounds revenue.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          <!-- Step 1 -->
          <div class="bolted-card p-6 rounded-xl relative">
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div class="text-xs font-mono font-bold text-[#ff4757] mb-2">STAGE 01 // AUDIT</div>
            <h4 class="text-lg font-bold text-[#2d3436] mb-2">Growth Diagnostic</h4>
            <p class="text-xs text-[#4a5568] leading-relaxed">
              Complete full-funnel audit: SEO health, GEO citation share, ad spend waste, tracking integrity, and CRO friction points.
            </p>
          </div>

          <!-- Connector Pipe 1 -> 2 (Desktop only) -->
          <div class="connector-pipe-wrapper hidden md:block">
            <div class="connector-pipe">
              <div class="connector-pipe-light"></div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="bolted-card p-6 rounded-xl relative">
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div class="text-xs font-mono font-bold text-[#06b6d4] mb-2">STAGE 02 // SPRINT</div>
            <h4 class="text-lg font-bold text-[#2d3436] mb-2">Foundation Sprint</h4>
            <p class="text-xs text-[#4a5568] leading-relaxed">
              30-day build: Tracking architecture overhaul, core landing page redesign, and primary acquisition channel setup.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bolted-card p-6 rounded-xl relative">
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div class="text-xs font-mono font-bold text-[#22c55e] mb-2">STAGE 03 // SCALE</div>
            <h4 class="text-lg font-bold text-[#2d3436] mb-2">Growth Retainer</h4>
            <p class="text-xs text-[#4a5568] leading-relaxed">
              Continuous multichannel execution across search, AI visibility, paid media, automation, and bi-weekly attribution reporting.
            </p>
          </div>

        </div>
      </section>

      <!-- SECTION: RADAR SWEEP & COMPETITIVE COMPARISON PREVIEW (Light Neumorphic Layout) -->
      <section class="py-20 bg-[#f0f2f5] border-y border-[#d1d9e6] relative overflow-hidden bg-blueprint-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left: Radar Scope & Tech Spec -->
            <div class="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div class="flex items-center gap-3">
                <span class="led-indicator led-glow-green"></span>
                <span class="text-xs font-mono font-bold text-[#2d3436] uppercase tracking-widest">REALTIME FUNNEL RADAR</span>
              </div>
              
              <div class="radar-scope my-2">
                <div class="radar-sweep-beam"></div>
                <div class="radar-grid"></div>
                <div class="radar-crosshair"></div>
                <div class="radar-blip" style="top: 35%; left: 62%;"></div>
                <div class="radar-blip" style="top: 70%; left: 30%;"></div>
                <div class="radar-blip" style="top: 25%; left: 25%;"></div>
              </div>

              <div>
                <h3 class="text-2xl font-bold text-[#2d3436] mb-2">Engineered for Cold-Hard ROI</h3>
                <p class="text-sm text-[#4a5568] leading-relaxed">
                  While traditional agencies hand off vanity traffic reports, TeamRion measures and delivers closed-won pipeline and qualified revenue.
                </p>
              </div>

              <div class="flex items-center gap-4">
                <a href="#/compare/vs-traditional-agencies" class="btn-physical-primary text-xs">
                  <span>COMPARE VS TRADITIONAL AGENCIES</span>
                </a>
              </div>
            </div>

            <!-- Right: Interactive Matrix Preview -->
            <div class="lg:col-span-7">
              <div class="bolted-card bg-[#f0f2f5] p-6 rounded-2xl border border-white shadow-floating">
                <div class="screw-head screw-tl"></div>
                <div class="screw-head screw-tr"></div>
                <div class="screw-head screw-bl"></div>
                <div class="screw-head screw-br"></div>

                <div class="font-mono text-xs font-bold text-[#ff4757] uppercase mb-4 flex items-center justify-between">
                  <span>AGENCY MODEL BENCHMARK MATRIX</span>
                  <span class="text-[#718096]">UPDATED 2026</span>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr class="border-b border-[#d1d9e6] text-[#718096]">
                        <th class="py-3 px-2">CAPABILITY</th>
                        <th class="py-3 px-2 text-[#ff4757]">TEAMRION</th>
                        <th class="py-3 px-2">TRADITIONAL AGENCIES</th>
                        <th class="py-3 px-2">FREELANCER BUNDLE</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#d1d9e6] text-[#4a5568]">
                      <tr>
                        <td class="py-3 px-2 font-semibold text-[#2d3436]">Full-Funnel Accountability</td>
                        <td class="py-3 px-2 text-[#22c55e] font-bold">✓ 100% Unified</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ Disconnected Silos</td>
                        <td class="py-3 px-2 text-[#f59e0b]">~ Fragmented</td>
                      </tr>
                      <tr>
                        <td class="py-3 px-2 font-semibold text-[#2d3436]">GEO / AI Search Optimization</td>
                        <td class="py-3 px-2 text-[#22c55e] font-bold">✓ Native Stack</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ None / Outdated</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ None</td>
                      </tr>
                      <tr>
                        <td class="py-3 px-2 font-semibold text-[#2d3436]">Outcome & Revenue Proof</td>
                        <td class="py-3 px-2 text-[#22c55e] font-bold">✓ Verified Pipeline</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ Clicks & Impressions</td>
                        <td class="py-3 px-2 text-[#f59e0b]">~ Unverified</td>
                      </tr>
                      <tr>
                        <td class="py-3 px-2 font-semibold text-[#2d3436]">Published Banded Pricing</td>
                        <td class="py-3 px-2 text-[#22c55e] font-bold">✓ Real Bands (§5)</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ Hidden / "Quote"</td>
                        <td class="py-3 px-2 text-[#f59e0b]">~ Variable Rates</td>
                      </tr>
                      <tr>
                        <td class="py-3 px-2 font-semibold text-[#2d3436]">Server-Side Multi-Touch Attribution</td>
                        <td class="py-3 px-2 text-[#22c55e] font-bold">✓ Standard</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ Basic Pixel Only</td>
                        <td class="py-3 px-2 text-[#ff4757]">✗ Out of Scope</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: INTERACTIVE ROI & OPPORTUNITY CALCULATOR -->
      <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">GROWTH CALCULATOR</div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Calculate Your Leaked Pipeline & ROI
          </h2>
          <p class="text-base md:text-lg text-[#4a5568] mt-3">
            Estimate how much pipeline is lost to disconnected vendors and see the projected return from a unified growth stack.
          </p>
        </div>

        <div class="bolted-card p-8 rounded-2xl max-w-4xl mx-auto bg-[#f0f2f5] border border-[#d1d9e6]">
          <div class="screw-head screw-tl"></div>
          <div class="screw-head screw-tr"></div>
          <div class="screw-head screw-bl"></div>
          <div class="screw-head screw-br"></div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <!-- Inputs -->
            <div class="space-y-5">
              <div>
                <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-2">Monthly Traffic / Visitors</label>
                <input id="calc-traffic" type="number" value="25000" oninput="window.recalculateROI()" class="input-recessed" placeholder="e.g. 25000" />
              </div>
              <div>
                <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-2">Current Website Conversion Rate (%)</label>
                <input id="calc-cvr" type="number" step="0.1" value="1.5" oninput="window.recalculateROI()" class="input-recessed" placeholder="e.g. 1.5" />
              </div>
              <div>
                <label class="block text-xs font-mono font-bold uppercase text-[#2d3436] mb-2">Average Contract Value / Customer ACV ($)</label>
                <input id="calc-acv" type="number" value="4500" oninput="window.recalculateROI()" class="input-recessed" placeholder="e.g. 4500" />
              </div>
            </div>

            <!-- Recessed Readout Display -->
            <div class="metric-readout-module p-6 space-y-4">
              <div class="flex items-center justify-between text-xs font-mono text-[#718096]">
                <span>MODEL: UNIFIED FUNNEL</span>
                <span class="text-[#22c55e]">● PROJECTION</span>
              </div>
              
              <div>
                <div class="text-xs font-mono text-[#718096] uppercase">Projected Annual Pipeline Gain</div>
                <div id="calc-result-pipeline" class="text-3xl font-extrabold font-mono text-[#22c55e] mt-1">$405,000</div>
              </div>

              <div>
                <div class="text-xs font-mono text-[#718096] uppercase">Estimated Leaked Revenue / Mo (Fragmented Stack)</div>
                <div id="calc-result-leakage" class="text-2xl font-bold font-mono text-[#ff4757] mt-1">$33,750 / mo</div>
              </div>

              <div class="pt-2">
                <a href="#/growth-diagnostic" class="btn-physical-primary w-full text-xs">
                  <span>CLAIM DIAGNOSTIC AUDIT TO CAPTURE THIS</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: CASE STUDY PREVIEWS (§4 PLACEHOLDER DISCIPLINE) -->
      <section class="py-20 bg-[#e0e5ec] border-t border-[#d1d9e6]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div class="masking-tape mb-3">PROOF & CASE STUDIES</div>
              <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
                Metric-Led Case Studies
              </h2>
              <p class="text-base text-[#4a5568] mt-2 max-w-xl">
                We anchor every case study with hard outcome data above the fold — never screenshots alone.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span class="placeholder-data-badge">§4 DISCIPLINE ACTIVE</span>
              <a href="#/case-studies" class="btn-physical-secondary text-xs">
                <span>VIEW ALL CASE STUDIES &rarr;</span>
              </a>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Case 1 -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <!-- Recessed Metric Readout Above the Fold -->
                <div class="metric-readout-module mb-4">
                  <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                    <span>SECTOR: B2B SAAS</span>
                    <span class="text-[#22c55e]">● 90-DAY RESULT</span>
                  </div>
                  <div class="text-3xl font-extrabold font-mono text-[#ff4757]">+142%</div>
                  <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">ORGANIC PIPELINE REVENUE</div>
                  <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
                </div>

                <!-- Client Silhouette & Summary -->
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded bg-[#d1d9e6] shadow-recessed flex items-center justify-center font-mono font-bold text-[#718096]">
                    [LOGO]
                  </div>
                  <div>
                    <h4 class="font-bold text-[#2d3436] text-sm">[Client Name Placeholder — B2B Cloud]</h4>
                    <p class="text-[11px] font-mono text-[#718096]">Series B Enterprise SaaS</p>
                  </div>
                </div>

                <p class="text-xs text-[#4a5568] leading-relaxed">
                  Replaced 3 fragmented vendors with TeamRion's unified SEO + GEO AI-search + LinkedIn Ads funnel, unlocking rapid closed-won pipeline.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] mt-4 flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">FULL BREAKDOWN</span>
                <a href="#/case-studies/saas-growth-pipeline" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">READ DEEP DIVE &rarr;</a>
              </div>
            </div>

            <!-- Case 2 -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <!-- Recessed Metric Readout Above the Fold -->
                <div class="metric-readout-module mb-4">
                  <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                    <span>SECTOR: PROF. SERVICES</span>
                    <span class="text-[#06b6d4]">● AI SHARE</span>
                  </div>
                  <div class="text-3xl font-extrabold font-mono text-[#06b6d4]">#1 SHARE</div>
                  <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">PERPLEXITY & CHATGPT CITATIONS</div>
                  <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
                </div>

                <!-- Client Silhouette & Summary -->
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded bg-[#d1d9e6] shadow-recessed flex items-center justify-center font-mono font-bold text-[#718096]">
                    [LOGO]
                  </div>
                  <div>
                    <h4 class="font-bold text-[#2d3436] text-sm">[Client Name Placeholder — Legal Tech]</h4>
                    <p class="text-[11px] font-mono text-[#718096]">National Corporate Advisory</p>
                  </div>
                </div>

                <p class="text-xs text-[#4a5568] leading-relaxed">
                  Deployed structured entity graph schema and high-authority citation engineering to capture 74% share of AI-generated consulting recommendations.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] mt-4 flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">FULL BREAKDOWN</span>
                <a href="#/case-studies/saas-growth-pipeline" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">READ DEEP DIVE &rarr;</a>
              </div>
            </div>

            <!-- Case 3 -->
            <div class="bolted-card p-6 rounded-xl flex flex-col justify-between">
              <div class="screw-head screw-tl"></div>
              <div class="screw-head screw-tr"></div>
              <div class="screw-head screw-bl"></div>
              <div class="screw-head screw-br"></div>
              <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
              
              <div>
                <!-- Recessed Metric Readout Above the Fold -->
                <div class="metric-readout-module mb-4">
                  <div class="flex items-center justify-between text-[10px] font-mono text-[#718096] mb-1">
                    <span>SECTOR: E-COMMERCE</span>
                    <span class="text-[#22c55e]">● MULTICHANNEL</span>
                  </div>
                  <div class="text-3xl font-extrabold font-mono text-[#22c55e]">3.8x ROAS</div>
                  <div class="text-xs font-bold text-[#2d3436] uppercase tracking-wide">BLENDED REVENUE SCALE</div>
                  <div class="placeholder-data-badge mt-2">SAMPLE DATA — REPLACE BEFORE LAUNCH</div>
                </div>

                <!-- Client Silhouette & Summary -->
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded bg-[#d1d9e6] shadow-recessed flex items-center justify-center font-mono font-bold text-[#718096]">
                    [LOGO]
                  </div>
                  <div>
                    <h4 class="font-bold text-[#2d3436] text-sm">[Client Name Placeholder — DTC Brand]</h4>
                    <p class="text-[11px] font-mono text-[#718096]">Omnichannel Consumer Brand</p>
                  </div>
                </div>

                <p class="text-xs text-[#4a5568] leading-relaxed">
                  Scaled Meta & Google ad spend profitably using Server-Side CAPI tracking, rapid creative testing, and post-click landing page optimization.
                </p>
              </div>

              <div class="pt-4 border-t border-[#d1d9e6] mt-4 flex items-center justify-between">
                <span class="text-[11px] font-mono text-[#718096]">FULL BREAKDOWN</span>
                <a href="#/case-studies/saas-growth-pipeline" class="text-xs font-mono font-bold text-[#ff4757] hover:underline">READ DEEP DIVE &rarr;</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: PRICING PREVIEW (§5 BANDED LADDER) -->
      <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">REAL BANDED PRICING</div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Transparent Land-and-Expand Growth Ladder
          </h2>
          <p class="text-base md:text-lg text-[#4a5568] mt-3">
            No hidden numbers or vague "starting at" quotes. A structured ladder built for measurable return at every stage.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <!-- Tier 1: Growth Diagnostic -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="punched-hole"></div>
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div>
              <div class="font-mono text-xs font-bold text-[#ff4757] uppercase mb-1">TIER 01 // AUDIT</div>
              <h3 class="text-xl font-bold text-[#2d3436]">Growth Diagnostic</h3>
              <div class="my-4 p-3 bg-[#d1d9e6]/50 rounded-lg shadow-recessed text-center font-mono">
                <div class="text-2xl font-extrabold text-[#2d3436]">$1,450</div>
                <div class="text-[10px] text-[#718096] uppercase">[INSERT FINAL PRICE] · FIXED FEE</div>
              </div>
              <p class="text-xs text-[#4a5568] mb-4 leading-relaxed">
                Complete diagnostic of current website, SEO rankings, AI search readiness, ad waste, and CRO friction. Delivered in 14 days.
              </p>
              <ul class="text-xs text-[#4a5568] space-y-2 border-t border-[#d1d9e6] pt-3 font-mono">
                <li>✓ Full Funnel Teardown</li>
                <li>✓ AI Search Readiness Audit</li>
                <li>✓ 90-Day Priority Action Map</li>
              </ul>
            </div>

            <div class="pt-6">
              <a href="#/growth-diagnostic" class="btn-physical-secondary w-full text-xs">
                <span>ORDER DIAGNOSTIC</span>
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
              <div class="font-mono text-xs font-bold text-[#06b6d4] uppercase mb-1">TIER 02 // SPRINT</div>
              <h3 class="text-xl font-bold text-[#2d3436]">Foundation Sprint</h3>
              <div class="my-4 p-3 bg-[#d1d9e6]/50 rounded-lg shadow-recessed text-center font-mono">
                <div class="text-2xl font-extrabold text-[#2d3436]">$6,500</div>
                <div class="text-[10px] text-[#718096] uppercase">[INSERT FINAL PRICE] · 30-DAY SPRINT</div>
              </div>
              <p class="text-xs text-[#4a5568] mb-4 leading-relaxed">
                30-day architectural sprint fixing tracking infrastructure, redesigning high-converting landing templates, and launching core channel.
              </p>
              <ul class="text-xs text-[#4a5568] space-y-2 border-t border-[#d1d9e6] pt-3 font-mono">
                <li>✓ Server-Side GTM & GA4 Overhaul</li>
                <li>✓ 2 High-Conversion Landing Pages</li>
                <li>✓ 1 Core Channel Launch</li>
              </ul>
            </div>

            <div class="pt-6">
              <a href="#/pricing" class="btn-physical-secondary w-full text-xs">
                <span>VIEW SPRINT SPEC</span>
              </a>
            </div>
          </div>

          <!-- Tier 3: Growth Retainer (Featured) -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between border-2 border-[#ff4757] shadow-floating bg-[#f7f9fb] relative">
            <div class="masking-tape !absolute -top-3 left-1/2 -translate-x-1/2">MOST POPULAR PARTNERSHIP</div>
            <div class="punched-hole mt-2"></div>
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>
            
            <div>
              <div class="font-mono text-xs font-bold text-[#ff4757] uppercase mb-1">TIER 03 // FULL FUNNEL</div>
              <h3 class="text-xl font-bold text-[#2d3436]">Growth Retainer</h3>
              <div class="my-4 p-3 bg-white rounded-lg shadow-recessed text-center font-mono">
                <div class="text-xl font-extrabold text-[#ff4757]">$4,500 – $9,500<span class="text-xs text-[#718096]">/mo</span></div>
                <div class="text-[10px] text-[#718096] uppercase">[INSERT FINAL PRICE] · BANDED BY CHANNELS</div>
              </div>
              <p class="text-xs text-[#4a5568] mb-4 leading-relaxed">
                Our flagship full-funnel retainer. Unified execution across SEO, GEO AI search, Paid Ads, Marketing Automation, and CRO.
              </p>
              <ul class="text-xs text-[#4a5568] space-y-2 border-t border-[#d1d9e6] pt-3 font-mono">
                <li>✓ Multichannel Execution Squad</li>
                <li>✓ Continuous CRO & A/B Testing</li>
                <li>✓ Bi-Weekly Attribution Readout</li>
              </ul>
            </div>

            <div class="pt-6">
              <a href="#/pricing" class="btn-physical-primary w-full text-xs">
                <span>EXPLORE RETAINER BANDS</span>
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
              <div class="font-mono text-xs font-bold text-[#718096] uppercase mb-1">TIER 04 // ENTERPRISE</div>
              <h3 class="text-xl font-bold text-[#2d3436]">Fractional Growth Team</h3>
              <div class="my-4 p-3 bg-[#d1d9e6]/50 rounded-lg shadow-recessed text-center font-mono">
                <div class="text-xl font-extrabold text-[#2d3436]">CUSTOM QUOTE</div>
                <div class="text-[10px] text-[#718096] uppercase">LET'S TALK · TAILORED SCOPE</div>
              </div>
              <p class="text-xs text-[#4a5568] mb-4 leading-relaxed">
                Dedicated growth squad, custom data warehouse, multi-brand attribution models, and embedded Fractional Head of Growth.
              </p>
              <ul class="text-xs text-[#4a5568] space-y-2 border-t border-[#d1d9e6] pt-3 font-mono">
                <li>✓ Dedicated Senior Squad</li>
                <li>✓ Custom Data Warehouse Sync</li>
                <li>✓ Executive Board Reporting</li>
              </ul>
            </div>

            <div class="pt-6">
              <a href="#/contact" class="btn-physical-secondary w-full text-xs">
                <span>SCHEDULE BRIEFING</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION: SCHEMA-MARKED FAQ PREVIEW -->
      <section class="py-20 bg-[#e0e5ec] border-t border-[#d1d9e6]">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12">
            <div class="masking-tape mb-3">ENGINEERING QUESTIONS</div>
            <h2 class="text-3xl md:text-4xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
              Frequently Answered Inquiries
            </h2>
            <p class="text-sm md:text-base text-[#4a5568] mt-2">
              Transparent answers on our operational model, technical architecture, and pricing.
            </p>
          </div>

          <!-- FAQ Accordions -->
          <div class="space-y-4">
            
            <div class="bolted-card p-5 rounded-xl">
              <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-base">
                <span>Why is a single full-funnel partner better than hiring specialist agencies?</span>
                <span class="text-[#ff4757] text-xl font-mono">+</span>
              </button>
              <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                Specialist agencies optimize for their isolated metric (SEO agencies for clicks, ad agencies for ROAS, design studios for aesthetics). When they don't talk to each other, you get broken tracking, blaming, and wasted budget. TeamRion aligns all disciplines around one single metric: closed-won pipeline and blended customer acquisition cost (CAC).
              </div>
            </div>

            <div class="bolted-card p-5 rounded-xl">
              <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-base">
                <span>What exactly is GEO (Generative Engine Optimization) and how does TeamRion deliver it?</span>
                <span class="text-[#ff4757] text-xl font-mono">+</span>
              </button>
              <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                GEO is optimizing your brand's entity footprint so AI engines like ChatGPT, Perplexity, Claude, and Google AI Overviews cite and recommend your product when buyers ask open-ended questions. We achieve this via schema-rich entity graphs, high-authority citation seeding, structured fact tables, and prompt-intent matching.
              </div>
            </div>

            <div class="bolted-card p-5 rounded-xl">
              <button onclick="window.toggleFAQ(this)" class="w-full flex items-center justify-between text-left font-bold text-[#2d3436] text-base">
                <span>Why are your case study metrics marked with placeholder tags?</span>
                <span class="text-[#ff4757] text-xl font-mono">+</span>
              </button>
              <div class="hidden pt-3 text-sm text-[#4a5568] leading-relaxed border-t border-[#d1d9e6] mt-3">
                In strict adherence to our brand integrity policy (§4), we do not fabricate client logos or outcome metrics. All current proof components are structured with transparent placeholder badges ("SAMPLE DATA — REPLACE BEFORE LAUNCH") and will be populated with verified client telemetry as engagements mature.
              </div>
            </div>

          </div>

          <div class="text-center mt-8">
            <a href="#/faq" class="btn-physical-secondary text-xs">
              <span>VIEW COMPLETE SCHEMA-MARKED FAQ &rarr;</span>
            </a>
          </div>

        </div>
      </section>

      <!-- SECTION: FINAL CTA ENGINE TERMINAL (Light Neumorphic Layout) -->
      <section class="py-20 bg-[#f0f2f5] border-t border-[#d1d9e6] relative overflow-hidden bg-blueprint-light">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="bolted-card bg-[#f0f2f5] p-8 md:p-12 rounded-3xl border border-white shadow-floating relative">
            <div class="screw-head screw-tl"></div>
            <div class="screw-head screw-tr"></div>
            <div class="screw-head screw-bl"></div>
            <div class="screw-head screw-br"></div>

            <div class="text-center max-w-2xl mx-auto space-y-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4757]/15 border border-[#ff4757]/30 text-[#ff4757] text-xs font-mono font-bold">
                <span class="led-indicator led-glow-orange"></span>
                <span>INITIALIZE GROWTH PARTNERSHIP</span>
              </div>

              <h2 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight">
                Ready to Replace the Freelancer Patchwork?
              </h2>

              <p class="text-sm md:text-base text-[#4a5568] leading-relaxed">
                Book a 30-minute Growth Strategy Briefing with our team of record. We will review your current channels, identify leaked pipeline, and deliver a custom 90-day execution roadmap.
              </p>

              <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a href="#/contact" class="btn-physical-primary">
                  <span>BOOK STRATEGY BRIEFING</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
                <a href="#/growth-diagnostic" class="btn-physical-secondary">
                  <span>START 60-SEC DIAGNOSTIC</span>
                </a>
              </div>

              <div class="pt-4 flex items-center justify-center gap-6 text-[11px] font-mono text-[#718096]">
                <span>✓ SLA RESPONSE &lt; 2 HOURS</span>
                <span>✓ ZERO PRESSURE AUDIT</span>
                <span>✓ STRICT CONFIDENTIALITY</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    `
  }
};

window.SITE_ROUTES = SITE_ROUTES;
