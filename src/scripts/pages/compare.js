/**
 * TeamRion — Comparison & Positioning Teardowns
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

const COMPARE_PAGES = {
  // --------------------------------------------------------------------------
  // VS TRADITIONAL AGENCIES
  // --------------------------------------------------------------------------
  'compare/vs-traditional-agencies': {
    title: 'TeamRion vs. Traditional Agencies — Growth Comparison',
    meta: 'Compare TeamRion\'s unified growth engineering squad with traditional multi-agency retainers and siloed account managers.',
    render: () => `
      <section class="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="masking-tape mb-3">MODEL COMPARISON</div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#2d3436] tracking-tight hero-embossed-text">
            TeamRion vs. <span class="text-[#ff4757]">Traditional Agencies.</span>
          </h1>
          <p class="text-base md:text-lg text-[#4a5568] mt-4 leading-relaxed">
            Why high-growth companies are abandoning bloated agency retainers in favor of synchronized growth squads.
          </p>
        </div>

        <!-- Direct Comparison Matrix -->
        <div class="bolted-card p-6 md:p-8 rounded-2xl bg-[#f0f2f5] border border-white shadow-floating mb-16">
          <div class="screw-head screw-tl"></div><div class="screw-head screw-tr"></div><div class="screw-head screw-bl"></div><div class="screw-head screw-br"></div>

          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr class="border-b-2 border-[#d1d9e6] text-[#2d3436]">
                  <th class="py-4 px-3">FEATURE / CAPABILITY</th>
                  <th class="py-4 px-3 text-[#ff4757] font-bold text-sm bg-white/70 rounded-t-lg shadow-sm">TEAMRION GROWTH SQUAD</th>
                  <th class="py-4 px-3 text-[#718096]">TRADITIONAL AGENCY BUNDLE</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#d1d9e6] text-[#4a5568]">
                <tr>
                  <td class="py-4 px-3 font-bold text-[#2d3436]">Core Accountability</td>
                  <td class="py-4 px-3 text-[#22c55e] font-bold bg-white/40">✓ Closed-Won Pipeline & Blended CAC</td>
                  <td class="py-4 px-3 text-[#ff4757]">✗ Vanity clicks, impressions, and hours logged</td>
                </tr>
                <tr>
                  <td class="py-4 px-3 font-bold text-[#2d3436]">Team Structure</td>
                  <td class="py-4 px-3 text-[#22c55e] font-bold bg-white/40">✓ Senior Growth Director + Specialist Squad</td>
                  <td class="py-4 px-3 text-[#ff4757]">✗ Junior account manager buffer</td>
                </tr>
                <tr>
                  <td class="py-4 px-3 font-bold text-[#2d3436]">Attribution Architecture</td>
                  <td class="py-4 px-3 text-[#22c55e] font-bold bg-white/40">✓ First-Party Server-Side GTM & CRM Sync</td>
                  <td class="py-4 px-3 text-[#ff4757]">✗ Disconnected in-platform inflated reporting</td>
                </tr>
                <tr>
                  <td class="py-4 px-3 font-bold text-[#2d3436]">GEO & AI Search Readiness</td>
                  <td class="py-4 px-3 text-[#22c55e] font-bold bg-white/40">✓ Native Entity Graphs & Citation Seeding</td>
                  <td class="py-4 px-3 text-[#ff4757]">✗ Out-of-date keyword lists only</td>
                </tr>
                <tr>
                  <td class="py-4 px-3 font-bold text-[#2d3436]">Pricing Transparency</td>
                  <td class="py-4 px-3 text-[#22c55e] font-bold bg-white/40">✓ Published Banded Pricing (§5)</td>
                  <td class="py-4 px-3 text-[#ff4757]">✗ Opaque custom quotes with hidden markups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="text-center">
          <a href="#/growth-diagnostic" class="btn-physical-primary"><span>START 60-SEC DIAGNOSTIC</span></a>
        </div>

      </section>
    `
  }
};

window.COMPARE_PAGES = COMPARE_PAGES;
