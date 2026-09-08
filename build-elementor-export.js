const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootDir = __dirname;
const exportDir = path.join(rootDir, 'elementor-export');
const templatesDir = path.join(exportDir, 'templates');

// Fresh export dir so stale/legacy kit files never end up in the package.
if (fs.existsSync(exportDir)) {
  fs.rmSync(exportDir, { recursive: true, force: true });
}
fs.mkdirSync(exportDir, { recursive: true });
fs.mkdirSync(templatesDir, { recursive: true });

const customCSS = fs.readFileSync(path.join(rootDir, 'src/styles/theme.css'), 'utf8');

// Load page renderers.
const routesCode = fs.readFileSync(path.join(rootDir, 'src/scripts/routes.js'), 'utf8');
const coreCode = fs.readFileSync(path.join(rootDir, 'src/scripts/pages/core.js'), 'utf8');
const servicesCode = fs.readFileSync(path.join(rootDir, 'src/scripts/pages/services.js'), 'utf8');
const leadgenCode = fs.readFileSync(path.join(rootDir, 'src/scripts/pages/leadgen.js'), 'utf8');
const proofCode = fs.readFileSync(path.join(rootDir, 'src/scripts/pages/proof.js'), 'utf8');

// ---------------------------------------------------------------------------
// Elementor helper utilities
// ---------------------------------------------------------------------------

function generateHexId() {
  return Math.random().toString(16).slice(2, 10);
}

function pageSettingsForType(type) {
  switch (type) {
    case 'header':
      return { content_wrapper_html_tag: 'header' };
    case 'footer':
      return { content_wrapper_html_tag: 'footer' };
    case 'single':
      return { content_wrapper_html_tag: 'main' };
    case 'error-404':
      return { content_wrapper_html_tag: 'main' };
    case 'popup':
      return { content_wrapper_html_tag: 'div', prevent_scroll: 'yes' };
    default:
      return {};
  }
}

function createElementorTemplate(title, type, htmlContent, siteCSS, pageSettings = {}) {
  const combinedHTML = `
<div class="teamrion-elementor-wrapper">
  <style>
${siteCSS}
  </style>
  ${htmlContent}
</div>
`;

  // Kit import reads `settings` (mirror of get_export_data()), while the
  // standalone Template-Library import reads `page_settings` (mirror of
  // get_export_data() -> Local_Source). Emit both so the same JSON works in
  // either importer.
  const documentSettings = pageSettings;

  return {
    version: '0.4',
    title,
    type,
    content: [
      {
        id: generateHexId(),
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
            id: generateHexId(),
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
    ],
    settings: documentSettings,
    page_settings: pageSettings
  };
}

// ---------------------------------------------------------------------------
// Compile production CSS (Tailwind utilities + brand theme), no CDN runtime.
// ---------------------------------------------------------------------------

function compileSiteCSS(htmlFiles) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'teamrion-css-'));
  const contentDir = path.join(tmpDir, 'content');
  fs.mkdirSync(contentDir, { recursive: true });

  htmlFiles.forEach((html, index) => {
    fs.writeFileSync(path.join(contentDir, `page-${index}.html`), html, 'utf8');
  });

  const inputCss = path.join(tmpDir, 'input.css');
  const outputCss = path.join(tmpDir, 'output.css');
  fs.writeFileSync(inputCss, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n', 'utf8');

  const configPath = path.join(rootDir, 'tailwind.config.js');
  const contentFiles = htmlFiles.map((_, index) => `"${path.join(contentDir, `page-${index}.html`)}"`).join(' ');
  execSync(
    `npx -y tailwindcss@3.4.3 -c "${configPath}" -i "${inputCss}" -o "${outputCss}" --content ${contentFiles}`,
    { stdio: 'pipe' }
  );

  const tailwind = fs.readFileSync(outputCss, 'utf8');
  const fontsImport = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');\n";

  // Preflight + utilities first, then the TeamRion brand component layer so
  // branded buttons/cards/screws always take precedence over resets.
  return fontsImport + '\n' + tailwind + '\n' + customCSS;
}

// ---------------------------------------------------------------------------
// Render the static site pages.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Template registry. Native Theme Builder "single" doc type is used where the
// template is meant to power singular CPT pages (services / case studies).
// ---------------------------------------------------------------------------

const templates = [
  { name: 'teamrion-homepage.json', title: 'TeamRion - Homepage (Full Page)', type: 'page', html: homeHTML },
  { name: 'teamrion-header-template.json', title: 'TeamRion - Master Header (Theme Builder)', type: 'header', html: headerHTML },
  { name: 'teamrion-footer-template.json', title: 'TeamRion - Master Footer (Theme Builder)', type: 'footer', html: footerHTML },
  { name: 'teamrion-pricing-page.json', title: 'TeamRion - Banded Pricing Page', type: 'page', html: pricingHTML },
  { name: 'teamrion-about-page.json', title: 'TeamRion - About Page', type: 'page', html: aboutHTML },
  { name: 'teamrion-faq-page.json', title: 'TeamRion - Schema FAQ Page', type: 'page', html: faqHTML },
  // These are Theme Builder singles, so they must use the Pro "single" document
  // type, not "page", otherwise they never apply to services/case-study CPTs.
  { name: 'teamrion-single-service-template.json', title: 'TeamRion - Single Service Template (GEO & AI)', type: 'single', html: serviceGeoHTML },
  { name: 'teamrion-growth-diagnostic-page.json', title: 'TeamRion - Growth Diagnostic Quiz', type: 'page', html: diagnosticHTML },
  { name: 'teamrion-single-case-study-template.json', title: 'TeamRion - Single Case Study Template', type: 'single', html: caseStudyHTML }
];

console.log('Compiling Tailwind + TeamRion CSS (self-contained, no CDN runtime)...');
const siteCSS = compileSiteCSS(templates.map(t => t.html));
fs.writeFileSync(path.join(exportDir, 'teamrion-custom-code.css'), siteCSS, 'utf8');
fs.writeFileSync(path.join(rootDir, 'teamrion-custom-code.css'), siteCSS, 'utf8');

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

// Official Elementor Kit filesystem contract:
//   manifest.json
//   site-settings.json
//   templates/<id>.json
fs.writeFileSync(path.join(exportDir, 'site-settings.json'), JSON.stringify(siteSettings, null, 2), 'utf8');
fs.writeFileSync(path.join(exportDir, 'teamrion-site-settings.json'), JSON.stringify(siteSettings, null, 2), 'utf8');

// ---------------------------------------------------------------------------
// Write standalone template JSONs + Kit template files.
// ---------------------------------------------------------------------------

const manifestTemplates = {};
const kitZipPaths = [];

templates.forEach((t, index) => {
  const id = String(index + 1).padStart(4, '0');
  const pageSettings = pageSettingsForType(t.type);
  const jsonContent = createElementorTemplate(t.title, t.type, t.html, siteCSS, pageSettings);

  // Standalone Template-Library JSON (Templates -> Saved Templates -> Import).
  fs.writeFileSync(path.join(exportDir, t.name), JSON.stringify(jsonContent, null, 2), 'utf8');

  // Kit template file (Elementor -> Tools -> Import/Export Kit).
  const kitFilename = `${id}.json`;
  fs.writeFileSync(path.join(templatesDir, kitFilename), JSON.stringify(jsonContent, null, 2), 'utf8');

  const kitId = `${id}`;
  manifestTemplates[kitId] = {
    title: t.title,
    doc_type: t.type,
    thumbnail: ''
  };

  kitZipPaths.push(`templates/${kitFilename}`);
  console.log(`Generated: ${t.name} (kit templates/${kitFilename}, doc_type=${t.type})`);
});

const manifest = {
  name: 'teamrion-growth-engine-kit',
  title: 'TeamRion Growth Engine Kit',
  description: 'Full-Funnel Digital Growth Agency - Industrial Skeuomorphic Design System for Elementor Pro',
  author: 'TeamRion',
  version: '2.0',
  elementor_version: '4.2.4',
  created: new Date().toISOString(),
  thumbnail: '',
  site: '',
  'site-settings': ['global-colors', 'global-typography'],
  templates: manifestTemplates
};

fs.writeFileSync(path.join(exportDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

// ---------------------------------------------------------------------------
// Assemble the kit ZIP using the official layout only.
// ---------------------------------------------------------------------------

const zipName = path.join(rootDir, 'teamrion-elementor-template-kit.zip');
if (fs.existsSync(zipName)) {
  fs.rmSync(zipName);
}

const zipFiles = ['manifest.json', 'site-settings.json', 'teamrion-custom-code.css', ...kitZipPaths];

console.log('Building ZIP package: teamrion-elementor-template-kit.zip ...');
execSync(`cd "${exportDir}" && zip -r "${zipName}" ${zipFiles.map((f) => `"${f}"`).join(' ')}`, { stdio: 'inherit' });

console.log('Zip package ready:', zipName);
