const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const exportDir = path.join(__dirname, 'elementor-export');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

// Load custom CSS
const customCSS = fs.readFileSync(path.join(__dirname, 'src/styles/theme.css'), 'utf8');

// Load page renderers
const routesCode = fs.readFileSync(path.join(__dirname, 'src/scripts/routes.js'), 'utf8');
const coreCode = fs.readFileSync(path.join(__dirname, 'src/scripts/pages/core.js'), 'utf8');
const servicesCode = fs.readFileSync(path.join(__dirname, 'src/scripts/pages/services.js'), 'utf8');
const leadgenCode = fs.readFileSync(path.join(__dirname, 'src/scripts/pages/leadgen.js'), 'utf8');
const proofCode = fs.readFileSync(path.join(__dirname, 'src/scripts/pages/proof.js'), 'utf8');

// Helper to create an Elementor template JSON structure
function createElementorTemplate(title, type, htmlContent, pageCSS = '') {
  const combinedHTML = `
<div class="teamrion-elementor-wrapper">
  <style>
${customCSS}
${pageCSS}
  </style>
  ${htmlContent}
</div>
`;

  return {
    version: '0.4',
    title: title,
    type: type, // 'page', 'header', 'footer', 'section', 'single-page', 'single-post'
    content: [
      {
        id: 'tr_' + Math.random().toString(36).substring(2, 9),
        elType: 'container',
        isInner: false,
        settings: {
          content_width: 'full',
          padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true },
          margin: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true },
          background_background: 'classic',
          background_color: '#e0e5ec'
        },
        elements: [
          {
            id: 'tr_widget_' + Math.random().toString(36).substring(2, 9),
            elType: 'widget',
            isInner: false,
            widgetType: 'html',
            settings: {
              html: combinedHTML
            },
            elements: []
          }
        ]
      }
    ]
  };
}

// 1. Homepage Template
const vm = require('vm');
const sandbox = { window: {}, document: { title: '', querySelectorAll: () => [] } };
sandbox.window = sandbox;

vm.runInContext(routesCode, vm.createContext(sandbox));
vm.runInContext(coreCode, vm.createContext(sandbox));
vm.runInContext(servicesCode, vm.createContext(sandbox));
vm.runInContext(leadgenCode, vm.createContext(sandbox));
vm.runInContext(proofCode, vm.createContext(sandbox));

const homeHTML = sandbox.SITE_ROUTES['home'].render();
const pricingHTML = sandbox.CORE_PAGES['pricing'].render();
const aboutHTML = sandbox.CORE_PAGES['about'].render();
const faqHTML = sandbox.CORE_PAGES['faq'].render();
const serviceGeoHTML = sandbox.SERVICE_PAGES['services/geo-ai-search'].render();
const diagnosticHTML = sandbox.LEADGEN_PAGES['growth-diagnostic'].render();
const caseStudyHTML = sandbox.PROOF_PAGES['case-studies/saas-growth-pipeline'].render();

// Header HTML
const headerHTML = `
<header class="bg-[#e0e5ec]/90 backdrop-blur-md border-b border-[#a3b1c6]/30 shadow-sm py-4">
  <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
    <a href="/" class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg shadow-card flex items-center justify-center bg-[#f0f2f5] border border-white/60">
        <span class="w-4 h-4 rounded-sm bg-[#ff4757] shadow-sm transform rotate-45"></span>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="font-extrabold text-xl tracking-tight text-[#2d3436] font-mono">TEAM<span class="text-[#ff4757]">RION</span></span>
          <span class="led-indicator led-glow-green"></span>
        </div>
        <span class="text-[10px] font-mono font-bold text-[#718096] tracking-widest uppercase">GROWTH ENGINE</span>
      </div>
    </a>
    <div class="flex items-center gap-4 font-mono text-xs font-semibold uppercase text-[#4a5568]">
      <a href="/services" class="hover:text-[#ff4757]">Services</a>
      <a href="/pricing" class="hover:text-[#ff4757]">Pricing</a>
      <a href="/case-studies" class="hover:text-[#ff4757]">Case Studies</a>
      <a href="/about" class="hover:text-[#ff4757]">About</a>
      <a href="/growth-diagnostic" class="btn-physical-primary !py-2.5 !px-5 text-xs"><span>START DIAGNOSTIC</span></a>
    </div>
  </div>
</header>
`;

// Footer HTML
const footerHTML = `
<footer class="bg-[#f0f2f5] text-[#4a5568] border-t border-[#d1d9e6] py-16">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      <div>
        <div class="font-extrabold text-xl tracking-tight text-[#2d3436] font-mono mb-2">TEAM<span class="text-[#ff4757]">RION</span></div>
        <p class="text-xs text-[#718096]">Full-funnel digital growth partner. Unified search, paid media, automation, and conversion systems.</p>
      </div>
      <div class="font-mono text-xs space-y-2">
        <div class="font-bold text-[#2d3436]">SERVICES</div>
        <div><a href="/services/seo">SEO Architecture</a></div>
        <div><a href="/services/geo-ai-search">GEO / AI Search</a></div>
        <div><a href="/services/paid-media-google">Google Ads</a></div>
        <div><a href="/services/cro">CRO Optimization</a></div>
      </div>
      <div class="font-mono text-xs space-y-2">
        <div class="font-bold text-[#2d3436]">ENGAGEMENT</div>
        <div><a href="/growth-diagnostic">Growth Diagnostic ($1,450)</a></div>
        <div><a href="/pricing">Foundation Sprint ($6,500)</a></div>
        <div><a href="/pricing">Growth Retainer ($4.5K–$9.5K)</a></div>
      </div>
      <div class="font-mono text-xs space-y-2">
        <div class="font-bold text-[#2d3436]">LEGAL & COMPLIANCE</div>
        <div><a href="/privacy">Privacy Policy</a></div>
        <div><a href="/terms">Terms of Service</a></div>
      </div>
    </div>
    <div class="pt-8 border-t border-[#d1d9e6] text-xs font-mono text-[#718096] flex justify-between">
      <span>© 2026 TeamRion Growth Systems.</span>
      <span>SYSTEM OPERATIONAL</span>
    </div>
  </div>
</footer>
`;

// Write JSON template files
const templates = [
  { name: 'teamrion-homepage.json', title: 'TeamRion - Homepage (Full Page)', type: 'page', html: homeHTML },
  { name: 'teamrion-header-template.json', title: 'TeamRion - Master Header (Theme Builder)', type: 'header', html: headerHTML },
  { name: 'teamrion-footer-template.json', title: 'TeamRion - Master Footer (Theme Builder)', type: 'footer', html: footerHTML },
  { name: 'teamrion-pricing-page.json', title: 'TeamRion - Banded Pricing Page', type: 'page', html: pricingHTML },
  { name: 'teamrion-about-page.json', title: 'TeamRion - About Page', type: 'page', html: aboutHTML },
  { name: 'teamrion-faq-page.json', title: 'TeamRion - Schema FAQ Page', type: 'page', html: faqHTML },
  { name: 'teamrion-single-service-template.json', title: 'TeamRion - Single Service Template (GEO & AI)', type: 'page', html: serviceGeoHTML },
  { name: 'teamrion-growth-diagnostic-page.json', title: 'TeamRion - Growth Diagnostic Quiz', type: 'page', html: diagnosticHTML },
  { name: 'teamrion-single-case-study-template.json', title: 'TeamRion - Single Case Study Template', type: 'page', html: caseStudyHTML }
];

templates.forEach(t => {
  const jsonContent = createElementorTemplate(t.title, t.type, t.html);
  fs.writeFileSync(path.join(exportDir, t.name), JSON.stringify(jsonContent, null, 2), 'utf8');
  console.log(`Generated: ${t.name}`);
});

// Write Site Settings JSON
const siteSettings = {
  settings: {
    system_colors: [
      { _id: 'primary', title: 'Chassis Background', value: '#e0e5ec' },
      { _id: 'secondary', title: 'Panel Foreground', value: '#f0f2f5' },
      { _id: 'text', title: 'Text Primary', value: '#2d3436' },
      { _id: 'accent', title: 'Safety Orange', value: '#ff4757' },
      { _id: 'muted', title: 'Recessed Surface', value: '#d1d9e6' },
      { _id: 'text_muted', title: 'Text Muted', value: '#4a5568' },
      { _id: 'status_green', title: 'LED Status Online', value: '#22c55e' },
      { _id: 'status_cyan', title: 'Status Cyan AI', value: '#06b6d4' }
    ],
    system_typography: [
      {
        _id: 'primary',
        title: 'Primary Inter',
        typography_font_family: 'Inter',
        typography_font_weight: '500'
      },
      {
        _id: 'secondary',
        title: 'Headings Inter Bold',
        typography_font_family: 'Inter',
        typography_font_weight: '700'
      },
      {
        _id: 'accent',
        title: 'Technical JetBrains Mono',
        typography_font_family: 'JetBrains Mono',
        typography_font_weight: '700',
        typography_text_transform: 'uppercase'
      }
    ]
  }
};
fs.writeFileSync(path.join(exportDir, 'teamrion-site-settings.json'), JSON.stringify(siteSettings, null, 2), 'utf8');

// Write CSS file
fs.writeFileSync(path.join(exportDir, 'teamrion-custom-code.css'), customCSS, 'utf8');

// Create manifest for Elementor Kit Import
const manifest = {
  name: 'TeamRion Growth Engine Kit',
  version: '1.0.0',
  description: 'Full-Funnel Digital Growth Agency - Industrial Skeuomorphic Design System for Elementor Pro',
  elementor_version: '3.20.0',
  templates: templates.map(t => ({
    title: t.title,
    type: t.type,
    file: t.name
  }))
};
fs.writeFileSync(path.join(exportDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

console.log('Building ZIP package: teamrion-elementor-template-kit.zip ...');
execSync(`cd "${exportDir}" && zip -r ../teamrion-elementor-template-kit.zip *`, { stdio: 'inherit' });
console.log('Zip package ready in workspace root: /home/user/ReadMeHub/teamrion-elementor-template-kit.zip');
