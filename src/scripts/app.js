/**
 * TeamRion — Master Application & Interactive Growth Controller
 * Unified Light Neumorphic Industrial Skeuomorphic Design
 */

// Consolidate all route definitions into a single global catalog
function getAllRoutes() {
  return Object.assign(
    {},
    window.SITE_ROUTES || {},
    window.CORE_PAGES || {},
    window.SERVICE_PAGES || {},
    window.LEADGEN_PAGES || {},
    window.INDUSTRY_PAGES || {},
    window.PROOF_PAGES || {},
    window.CONTENT_PAGES || {},
    window.COMPARE_PAGES || {},
    window.LEGAL_PAGES || {}
  );
}

// Router Implementation
function handleRouting() {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  const currentPath = hash || 'home';
  const allRoutes = getAllRoutes();
  const routeData = allRoutes[currentPath] || allRoutes['home'];

  const appContainer = document.getElementById('app-viewport');
  if (!appContainer) return;

  // Render Page Content
  appContainer.innerHTML = routeData.render ? routeData.render() : '<div class="p-12 text-center">Page not found</div>';
  
  // Update Title & Meta
  if (routeData.title) document.title = routeData.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && routeData.meta) {
    metaDesc.setAttribute('content', routeData.meta);
  }

  // Scroll to Top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update Active Nav Links
  document.querySelectorAll('[data-route-link]').forEach(el => {
    const target = el.getAttribute('data-route-link');
    if (target === currentPath || (currentPath === 'home' && target === '')) {
      el.classList.add('text-[#ff4757]', 'font-bold');
    } else {
      el.classList.remove('text-[#ff4757]', 'font-bold');
    }
  });

  // Re-initialize any dynamic components on the new page
  if (currentPath === 'home') {
    window.recalculateROI();
  }
}

// ----------------------------------------------------------------------------
// Interactive 3D Growth Console Controls (Light Industrial Theme)
// ----------------------------------------------------------------------------
window.updateConsoleChannel = function(channel) {
  const signalName = document.getElementById('console-active-signal');
  const aiCounter = document.getElementById('console-val-ai');
  const pipeCounter = document.getElementById('console-val-pipeline');
  const cacCounter = document.getElementById('console-val-cac');
  const chartLine = document.getElementById('console-chart-line');
  const chartArea = document.getElementById('console-chart-area');
  const marker = document.getElementById('console-marker');

  if (!signalName) return;

  // Reset tab button states (Light Neumorphic)
  document.querySelectorAll('.console-tab-btn').forEach(btn => {
    btn.classList.remove('bg-[#d1d9e6]', 'text-[#ff4757]', 'shadow-recessed');
    btn.classList.add('bg-[#e0e5ec]', 'text-[#4a5568]', 'shadow-card');
  });

  if (channel === 'all') {
    signalName.innerText = 'ALL_FUNNEL_SYNC';
    aiCounter.innerText = '84.2%';
    pipeCounter.innerText = '3.4x';
    cacCounter.innerText = '-38%';
    chartLine.setAttribute('d', 'M0,85 Q50,78 100,60 T200,35 T300,10');
    chartArea.setAttribute('d', 'M0,85 Q50,78 100,60 T200,35 T300,10 L300,100 L0,100 Z');
    marker.setAttribute('cy', '10');
  } else if (channel === 'geo') {
    signalName.innerText = 'GEO_AI_SEARCH';
    aiCounter.innerText = '#1 RANK';
    pipeCounter.innerText = '+186%';
    cacCounter.innerText = '-42%';
    chartLine.setAttribute('d', 'M0,90 Q70,70 140,40 T220,20 T300,5');
    chartArea.setAttribute('d', 'M0,90 Q70,70 140,40 T220,20 T300,5 L300,100 L0,100 Z');
    marker.setAttribute('cy', '5');
  } else if (channel === 'seo') {
    signalName.innerText = 'ORGANIC_SEO';
    aiCounter.innerText = '72.0%';
    pipeCounter.innerText = '+142%';
    cacCounter.innerText = '-30%';
    chartLine.setAttribute('d', 'M0,75 Q60,65 120,50 T210,30 T300,15');
    chartArea.setAttribute('d', 'M0,75 Q60,65 120,50 T210,30 T300,15 L300,100 L0,100 Z');
    marker.setAttribute('cy', '15');
  } else if (channel === 'paid') {
    signalName.innerText = 'PAID_ADS_CAPI';
    aiCounter.innerText = '65.8%';
    pipeCounter.innerText = '3.8x';
    cacCounter.innerText = '-46%';
    chartLine.setAttribute('d', 'M0,80 Q40,50 120,45 T230,25 T300,12');
    chartArea.setAttribute('d', 'M0,80 Q40,50 120,45 T230,25 T300,12 L300,100 L0,100 Z');
    marker.setAttribute('cy', '12');
  } else if (channel === 'cro') {
    signalName.innerText = 'CRO_EXPERIMENTS';
    aiCounter.innerText = '99.4%';
    pipeCounter.innerText = '+68%';
    cacCounter.innerText = '-51%';
    chartLine.setAttribute('d', 'M0,85 Q80,80 150,45 T240,20 T300,8');
    chartArea.setAttribute('d', 'M0,85 Q80,80 150,45 T240,20 T300,8 L300,100 L0,100 Z');
    marker.setAttribute('cy', '8');
  }

  // Highlight clicked button
  const activeBtn = window.event ? window.event.target.closest('button') : null;
  if (activeBtn) {
    activeBtn.classList.remove('bg-[#e0e5ec]', 'text-[#4a5568]', 'shadow-card');
    activeBtn.classList.add('bg-[#d1d9e6]', 'text-[#ff4757]', 'shadow-recessed');
  }
};

// ----------------------------------------------------------------------------
// Interactive ROI & Opportunity Calculator
// ----------------------------------------------------------------------------
window.recalculateROI = function() {
  const trafficInput = document.getElementById('calc-traffic');
  const cvrInput = document.getElementById('calc-cvr');
  const acvInput = document.getElementById('calc-acv');
  const resPipeline = document.getElementById('calc-result-pipeline');
  const resLeakage = document.getElementById('calc-result-leakage');

  if (!trafficInput || !resPipeline) return;

  const traffic = parseFloat(trafficInput.value) || 25000;
  const cvr = parseFloat(cvrInput.value) || 1.5;
  const acv = parseFloat(acvInput.value) || 4500;

  // Unified funnel calculation
  const currentMonthlyLeads = (traffic * (cvr / 100));
  const projectedLiftLeads = currentMonthlyLeads * 0.6; // +60% throughput
  const projectedAnnualPipeline = Math.round(projectedLiftLeads * 12 * acv * 0.15); // assuming 15% close rate
  const monthlyLeakage = Math.round(projectedAnnualPipeline / 12);

  resPipeline.innerText = '$' + projectedAnnualPipeline.toLocaleString();
  resLeakage.innerText = '$' + monthlyLeakage.toLocaleString() + ' / mo';
};

// ----------------------------------------------------------------------------
// Interactive Banded Pricing Scope Switcher
// ----------------------------------------------------------------------------
window.updatePricingScope = function() {
  const checkboxes = document.querySelectorAll('.channel-scope-cb:checked');
  const count = checkboxes.length;
  const bandDisplay = document.getElementById('pricing-scope-band');
  const descDisplay = document.getElementById('pricing-scope-desc');

  if (!bandDisplay) return;

  if (count <= 2) {
    bandDisplay.innerText = '$4,500 / month';
    descDisplay.innerText = 'Core Band (' + count + ' active channels with bi-weekly attribution sync)';
  } else if (count <= 4) {
    bandDisplay.innerText = '$6,800 / month';
    descDisplay.innerText = 'Multichannel Band (' + count + ' active channels with bi-weekly attribution sync)';
  } else {
    bandDisplay.innerText = '$9,500 / month';
    descDisplay.innerText = 'Omnichannel Band (All ' + count + ' channels active with dedicated squad)';
  }
};

// ----------------------------------------------------------------------------
// Diagnostic Quiz Handler
// ----------------------------------------------------------------------------
window.answerDiagnostic = function(step, val) {
  const cur = document.getElementById('diag-q' + step);
  const next = document.getElementById('diag-q' + (step + 1));
  const stepNum = document.getElementById('diag-step-num');

  if (cur) cur.classList.add('hidden');
  if (next) {
    next.classList.remove('hidden');
    if (stepNum) stepNum.innerText = (step + 1);
  }
};

window.submitDiagnosticLead = function(e) {
  e.preventDefault();
  const q4 = document.getElementById('diag-q4');
  const res = document.getElementById('diag-result-view');
  if (q4) q4.classList.add('hidden');
  if (res) res.classList.remove('hidden');
};

// ----------------------------------------------------------------------------
// AI Audit Simulation Handler
// ----------------------------------------------------------------------------
window.runAIAuditSimulation = function(e) {
  e.preventDefault();
  const domain = document.getElementById('audit-domain').value || 'acme.com';
  const cat = document.getElementById('audit-category').value || 'B2B Software';
  
  const outDomain = document.getElementById('audit-out-domain');
  const outCat = document.getElementById('audit-out-cat');
  const output = document.getElementById('ai-audit-output');

  if (outDomain) outDomain.innerText = domain;
  if (outCat) outCat.innerText = cat;
  if (output) output.classList.remove('hidden');
};

// ----------------------------------------------------------------------------
// FAQ Accordion Toggle
// ----------------------------------------------------------------------------
window.toggleFAQ = function(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('span:last-child');
  if (content) {
    const isHidden = content.classList.contains('hidden');
    content.classList.toggle('hidden');
    if (icon) icon.innerText = isHidden ? '−' : '+';
  }
};

// ----------------------------------------------------------------------------
// Contact Form Submission
// ----------------------------------------------------------------------------
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const msg = document.getElementById('contact-success-msg');
  if (msg) {
    msg.classList.remove('hidden');
    e.target.reset();
  }
};

// ----------------------------------------------------------------------------
// Mobile Menu Drawer Controls
// ----------------------------------------------------------------------------
window.toggleMobileMenu = function() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
};

window.closeMobileMenu = function() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.add('hidden');
  }
};

// ----------------------------------------------------------------------------
// Elementor Kit Inspector Modal Controls
// ----------------------------------------------------------------------------
window.openElementorKitModal = function() {
  const modal = document.getElementById('elementor-kit-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeElementorKitModal = function() {
  const modal = document.getElementById('elementor-kit-modal');
  if (modal) modal.classList.add('hidden');
};

window.copyElementorCSS = function() {
  const css = document.getElementById('elementor-css-snippet').innerText;
  navigator.clipboard.writeText(css).then(() => {
    alert('✓ Elementor Custom CSS copied to clipboard!');
  });
};

window.copyElementorJSON = function() {
  const json = JSON.stringify(window.ELEMENTOR_DESIGN_KIT || {}, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    alert('✓ Elementor Kit Tokens JSON copied to clipboard!');
  });
};

// ----------------------------------------------------------------------------
// Initialization
// ----------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  handleRouting();
});

window.addEventListener('hashchange', () => {
  handleRouting();
  window.closeMobileMenu();
});
