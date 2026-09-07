/**
 * TeamRion — Elementor Pro Site Kit & Design System Tokens Definition
 * Ready for direct import or manual configuration in Elementor Pro Site Settings
 */

const ELEMENTOR_DESIGN_KIT = {
  site_settings: {
    system_colors: [
      { _id: 'primary', title: 'Chassis Background', value: '#e0e5ec' },
      { _id: 'secondary', title: 'Panel Foreground', value: '#f0f2f5' },
      { _id: 'text', title: 'Text Primary', value: '#2d3436' },
      { _id: 'accent', title: 'Safety Orange', value: '#ff4757' },
      { _id: 'muted', title: 'Recessed Surface', value: '#d1d9e6' },
      { _id: 'text_muted', title: 'Text Muted', value: '#4a5568' },
      { _id: 'border_dark', title: 'Border Shadow', value: '#babecc' },
      { _id: 'border_light', title: 'Border Light', value: '#ffffff' },
      { _id: 'dark_surface', title: 'Dark Technical Chassis', value: '#2d3436' },
      { _id: 'dark_panel', title: 'Dark Technical Panel', value: '#202628' },
      { _id: 'status_green', title: 'LED Status Online', value: '#22c55e' }
    ],
    system_typography: [
      {
        _id: 'primary',
        title: 'Primary Font (Inter)',
        typography_font_family: 'Inter',
        typography_font_weight: '500'
      },
      {
        _id: 'secondary',
        title: 'Headings (Inter Bold)',
        typography_font_family: 'Inter',
        typography_font_weight: '700'
      },
      {
        _id: 'text',
        title: 'Body Regular',
        typography_font_family: 'Inter',
        typography_font_size: { unit: 'px', size: 16 },
        typography_line_height: { unit: 'em', size: 1.65 }
      },
      {
        _id: 'accent',
        title: 'Technical Mono (JetBrains Mono)',
        typography_font_family: 'JetBrains Mono',
        typography_font_weight: '700',
        typography_letter_spacing: { unit: 'px', size: 1.2 },
        typography_text_transform: 'uppercase'
      }
    ],
    theme_builder_templates: [
      {
        id: 'header_master',
        name: 'Master Industrial Header',
        type: 'header',
        conditions: ['include/general'],
        description: 'Chassis background, operational LED status indicator, multi-tier navigation dropdown, rapid CTA key.'
      },
      {
        id: 'footer_master',
        name: 'Master Industrial Footer',
        type: 'footer',
        conditions: ['include/general'],
        description: 'Full 36-route site map, dark stats readout strip, operational nodes heartbeat, legal & compliance.'
      },
      {
        id: 'single_service',
        name: 'Single Service Template',
        type: 'single',
        conditions: ['include/services'],
        description: 'Dynamic service hero, metric readout strip, 4-stage execution framework, tech stack badge grid, conversion audit CTA.'
      },
      {
        id: 'single_industry',
        name: 'Single Industry Template',
        type: 'single',
        conditions: ['include/industries'],
        description: 'Vertical-specific challenges, full-funnel matrix, pipeline benchmark metrics, tailored case studies, sprint planner.'
      },
      {
        id: 'single_case_study',
        name: 'Single Case Study Template',
        type: 'single',
        conditions: ['include/case_studies'],
        description: 'Metric readout module above the fold, baseline vs outcome instrumentation, channel attribution breakdown, testimonial push-pin.'
      },
      {
        id: 'single_blog_post',
        name: 'Single Blog Post Template',
        type: 'single',
        conditions: ['include/posts'],
        description: 'Masking-tape date stamp, technical author metadata, sticky table of contents, high-contrast code/stat callouts, related playbook drawer.'
      }
    ],
    custom_css_manifest: `
/* ==========================================================
   Elementor Pro Additional CSS — TeamRion Design System
   ========================================================== */
.shadow-card {
  box-shadow: 8px 8px 16px #babecc, -8px -8px 16px #ffffff;
  background-color: #e0e5ec;
}
.shadow-floating {
  box-shadow: 12px 12px 24px #babecc, -12px -12px 24px #ffffff, inset 1px 1px 0 rgba(255, 255, 255, 0.6);
  background-color: #e0e5ec;
}
.shadow-pressed {
  box-shadow: inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff;
  background-color: #e0e5ec;
}
.shadow-recessed {
  box-shadow: inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff;
  background-color: #d1d9e6;
}
.led-glow-orange {
  box-shadow: 0 0 10px 2px rgba(255, 71, 87, 0.6);
  animation: ledPulseOrange 2s infinite ease-in-out;
}
.led-glow-green {
  box-shadow: 0 0 10px 2px rgba(34, 197, 94, 0.8);
  animation: ledPulseGreen 2s infinite ease-in-out;
}
.btn-physical {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.btn-physical:active {
  transform: translateY(2px);
}
`
  }
};

window.ELEMENTOR_DESIGN_KIT = ELEMENTOR_DESIGN_KIT;
