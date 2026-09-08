/**
 * TeamRion — Blog Index & Deep Technical Blog Post Template
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const CONTENT_PAGES = {
  // --------------------------------------------------------------------------
  // BLOG INDEX
  // --------------------------------------------------------------------------
  'blog': {
    title: 'Growth Engineering Intelligence — TeamRion',
    meta: 'Actionable intelligence on Generative Engine Optimization (GEO), server-side attribution, CRO heuristics, and full-funnel marketing architecture.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">GROWTH INTELLIGENCE</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            Technical Frameworks & <span class="text-[#ff4757]">Playbooks.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Exhaustive, practitioner-grade guides on navigating search, AI citations, attribution architectures, and conversion physics.
          </p>
        </div>

        <!-- Blog Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <!-- Article 1 (Featured deep dive) -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between border-2 border-[#06b6d4]/40 shadow-floating">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="masking-tape masking-tape-alt">OCT 14, 2026</div>
                <span class="text-[10px] font-mono text-[#718096]">12 MIN READ</span>
              </div>

              <h2 class="text-xl font-bold text-[#2d3436] mb-3 hover:text-[#06b6d4] transition">
                The Complete Guide to Generative Engine Optimization (GEO): Winning in ChatGPT & Perplexity
              </h2>

              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">
                How Large Language Models synthesize answers, why traditional SEO isn't enough, and the exact schema + entity seeding protocol to capture AI search citations.
              </p>
            </div>

            <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
              <span class="text-[11px] font-mono text-[#06b6d4] font-bold">● DEEP SPECIFICATION</span>
              <a href="#/blog/geo-generative-engine-optimization-guide" class="btn-physical-primary !py-2 !px-4 text-xs"><span>READ PLAYBOOK &rarr;</span></a>
            </div>
          </div>

          <!-- Article 2 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="masking-tape">SEP 28, 2026</div>
                <span class="text-[10px] font-mono text-[#718096]">8 MIN READ</span>
              </div>

              <h2 class="text-xl font-bold text-[#2d3436] mb-3">
                Why Fragmented Agencies Fail to Generate Pipeline (The Silo Fallacy)
              </h2>

              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">
                An objective breakdown of why isolated agency retainers produce conflicting attribution and how a unified squad eliminates revenue leakage.
              </p>
            </div>

            <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
              <span class="text-[11px] font-mono text-[#718096]">TEARDOWN</span>
              <a href="#/compare/vs-traditional-agencies" class="btn-physical-secondary !py-2 !px-4 text-xs"><span>READ TEARDOWN &rarr;</span></a>
            </div>
          </div>

          <!-- Article 3 -->
          <div class="bolted-card p-6 rounded-2xl flex flex-col justify-between">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            <div class="vent-slots"><span class="vent-slot"></span><span class="vent-slot"></span><span class="vent-slot"></span></div>
            
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="masking-tape">AUG 19, 2026</div>
                <span class="text-[10px] font-mono text-[#718096]">10 MIN READ</span>
              </div>

              <h2 class="text-xl font-bold text-[#2d3436] mb-3">
                Building a First-Party Server-Side Attribution Engine in 2026
              </h2>

              <p class="text-xs text-[#4a5568] leading-relaxed mb-4">
                Step-by-step engineering architecture for Server-Side GTM, BigQuery event streams, and offline conversion reconciliation.
              </p>
            </div>

            <div class="pt-4 border-t border-[#d1d9e6] flex items-center justify-between">
              <span class="text-[11px] font-mono text-[#718096]">DATA ARCHITECTURE</span>
              <a href="#/services/analytics-attribution" class="btn-physical-secondary !py-2 !px-4 text-xs"><span>VIEW SPEC &rarr;</span></a>
            </div>
          </div>

        </div>

      </section>
    `
  },

  // --------------------------------------------------------------------------
  // SINGLE BLOG POST TEMPLATE (DEEP DIVE ON GEO)
  // --------------------------------------------------------------------------
  'blog/geo-generative-engine-optimization-guide': {
    title: 'The Complete Guide to Generative Engine Optimization (GEO) — TeamRion',
    meta: 'Exhaustive practitioner guide to Generative Engine Optimization. Learn how LLMs parse knowledge, build entity graphs, and dominate AI search citations.',
    render: () => `
      <section class="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Post Header -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <a href="#/blog" class="text-xs font-mono text-[#ff4757] font-bold">&larr; ALL INTELLIGENCE PLAYBOOKS</a>
            <span class="text-[#718096]">/</span>
            <span class="text-xs font-mono text-[#718096]">CATEGORY: GEO & AI SEARCH</span>
          </div>

          <div class="masking-tape masking-tape-alt mb-4">PUBLISHED BY TEAMRION RESEARCH GROUP</div>

          <h1 class="text-3xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text mb-6">
            The Complete Guide to Generative Engine Optimization (GEO): Winning in ChatGPT & Perplexity
          </h1>

          <div class="flex items-center gap-4 text-xs font-mono text-[#718096] pb-6 border-b border-[#d1d9e6]">
            <span>AUTHOR: SQUAD LEAD</span>
            <span>·</span>
            <span>UPDATED: 2026 EDITION</span>
            <span>·</span>
            <span>READ TIME: 12 MIN</span>
          </div>
        </div>

        <!-- Post Body -->
        <div class="space-y-8 text-sm md:text-base text-[#4a5568] leading-relaxed">
          
          <div class="p-6 rounded-2xl bg-[#f0f2f5] border-l-4 border-[#06b6d4] shadow-card space-y-2">
            <div class="font-mono text-xs font-bold text-[#06b6d4] uppercase">EXECUTIVE SUMMARY</div>
            <p class="text-xs text-[#2d3436]">
              As users migrate from traditional 10-blue-link search to AI conversational search engines, ranking #1 on Google is no longer sufficient. Generative Engine Optimization (GEO) is the discipline of structuring your brand data, digital entity footprint, and citation graph so Large Language Models synthesize recommendations with your company at the top.
            </p>
          </div>

          <h2 class="text-2xl font-bold text-[#2d3436] pt-4">1. How LLMs Formulate Brand Recommendations</h2>
          <p>
            When a buyer asks Perplexity, ChatGPT Search, or Claude a question like <em>"What is the best multi-touch attribution platform for B2B SaaS?"</em>, the model executes a multi-step retrieval and synthesis pipeline:
          </p>
          <ul class="list-disc pl-6 space-y-2 font-mono text-xs text-[#2d3436]">
            <li><strong>Step 1 (Retrieval):</strong> The model queries its web retrieval index across top-ranking comparison guides, GitHub repos, Reddit discussions, and technical documentation.</li>
            <li><strong>Step 2 (Entity Extraction):</strong> It extracts named entities (companies, products, features, pricing structures) and validates their consensus across independent sources.</li>
            <li><strong>Step 3 (Synthesis):</strong> It ranks the candidates based on domain authority, structured data consistency, and user sentiment before generating its final answer.</li>
          </ul>

          <h2 class="text-2xl font-bold text-[#2d3436] pt-4">2. The 3 Core Pillars of GEO Execution</h2>
          
          <!-- Pillars (Light Neumorphic Layout) -->
          <div class="bolted-card p-6 rounded-xl bg-[#f0f2f5] border border-white shadow-floating my-6">
            <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
            
            <div class="space-y-4 text-xs font-mono text-[#4a5568]">
              <div>
                <strong class="text-[#06b6d4] block text-sm mb-1">PILLAR 1: JSON-LD ENTITY GRAPH DENSITY</strong>
                <p>Embedding rich schema markup (Organization, Product, ItemList, FAQPage) gives LLM crawlers unmistakable, machine-readable facts about your capabilities and pricing.</p>
              </div>
              <div class="border-t border-[#d1d9e6] pt-3">
                <strong class="text-[#06b6d4] block text-sm mb-1">PILLAR 2: OBJECTIVE COMPARISON MATRICES</strong>
                <p>LLMs heavily favor objective data tables that compare specifications, latency, integrations, and pricing tiers rather than vague marketing adjectives.</p>
              </div>
              <div class="border-t border-[#d1d9e6] pt-3">
                <strong class="text-[#06b6d4] block text-sm mb-1">PILLAR 3: OFF-SITE CITATION CONSENSUS</strong>
                <p>Seeding verified mentions in technical knowledge bases, industry forums, and analyst reviews establishes multi-source consensus.</p>
              </div>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-[#2d3436] pt-4">3. Measuring Your AI Citation Share</h2>
          <p>
            At TeamRion, we run automated query benchmarking rigs across 50+ target buyer prompts every month, scoring:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
            <div class="metric-readout-module p-4">
              <span class="text-[#718096]">METRIC 01</span>
              <strong class="text-[#2d3436] block mt-1">Citation Frequency</strong>
              <span class="text-[#06b6d4]">% of prompts citing brand</span>
            </div>
            <div class="metric-readout-module p-4">
              <span class="text-[#718096]">METRIC 02</span>
              <strong class="text-[#2d3436] block mt-1">Sentiment Polarity</strong>
              <span class="text-[#22c55e]">Positive vs neutral tone</span>
            </div>
            <div class="metric-readout-module p-4">
              <span class="text-[#718096]">METRIC 03</span>
              <strong class="text-[#2d3436] block mt-1">Direct AI Referral Traffic</strong>
              <span class="text-[#ff4757]">GA4 server sessions</span>
            </div>
          </div>

        </div>

        <!-- Post CTA Box -->
        <div class="bolted-card p-8 rounded-2xl bg-[#f0f2f5] border border-[#d1d9e6] mt-16 text-center">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>
          
          <span class="led-indicator led-glow-cyan mb-2"></span>
          <h3 class="text-xl font-bold text-[#2d3436]">Want to Benchmark Your Brand in AI Search?</h3>
          <p class="text-xs text-[#4a5568] max-w-md mx-auto mt-2 mb-6">
            Run our live AI Search Visibility profiler or order a comprehensive 14-day Growth Diagnostic.
          </p>
          <div class="flex justify-center gap-4">
            <a href="#/ai-search-audit" class="btn-physical-primary text-xs"><span>RUN AI CITATION AUDIT</span></a>
            <a href="#/growth-diagnostic" class="btn-physical-secondary text-xs"><span>FULL DIAGNOSTIC</span></a>
          </div>
        </div>

      </section>
    `
  }
};

window.CONTENT_PAGES = CONTENT_PAGES;
