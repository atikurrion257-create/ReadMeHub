# Complete WordPress + Elementor Export & Import Guide

This guide details how to export the designed website from this workspace and import it into any WordPress + Elementor website in under 2 minutes.

---

## 📦 What Has Been Generated in the Workspace

All ready-to-import Elementor template files are saved in `elementor-export/` and packaged into a single zip file:

1. **Complete Packaged Kit**:
   - `teamrion-elementor-template-kit.zip` (Contains all templates, site settings, custom code, and manifest).
2. **Individual `.json` Templates**:
   - `elementor-export/teamrion-homepage.json` (Full Homepage)
   - `elementor-export/teamrion-header-template.json` (Theme Builder Header)
   - `elementor-export/teamrion-footer-template.json` (Theme Builder Footer)
   - `elementor-export/teamrion-pricing-page.json` (Banded Pricing Page)
   - `elementor-export/teamrion-growth-diagnostic-page.json` (Growth Diagnostic Quiz)
   - `elementor-export/teamrion-single-service-template.json` (Single Service Template)
   - `elementor-export/teamrion-single-case-study-template.json` (Single Case Study Template)
   - `elementor-export/teamrion-about-page.json` (About Page)
   - `elementor-export/teamrion-faq-page.json` (Schema FAQ Page)
3. **Site Settings & Custom CSS**:
   - `elementor-export/teamrion-site-settings.json` (Global Colors & Typography)
   - `elementor-export/teamrion-custom-code.css` (Neumorphic Shadow System & Micro-Interactions)

---

## 🚀 How to Import into WordPress Elementor (Step-by-Step)

### Option A: Import Individual Page Templates (Recommended — Works on Free & Pro)

1. **Download the Template**:
   - Download any template `.json` file (e.g. `teamrion-homepage.json`) from the website modal or the `elementor-export/` folder.
2. **Upload to WordPress**:
   - In your WordPress Admin Dashboard, go to **Templates → Saved Templates**.
   - Click the **Import Templates** button at the very top of the page.
   - Choose the downloaded `.json` file and click **Import Now**.
3. **Insert on Any Page**:
   - Go to **Pages → Add New** (e.g. name it "Home").
   - Set **Page Attributes → Template** to **Elementor Full Width** (or Elementor Canvas).
   - Click **Edit with Elementor**.
   - In the Elementor editor canvas, click the **Grey Folder Icon** (*Add Template / My Templates*).
   - Locate the imported template and click **Insert**.
   - Click **Publish**!

---

### Option B: Import Complete Template Kit (Elementor Pro Site Kit)

1. **Download the ZIP**:
   - Download `teamrion-elementor-template-kit.zip`.
2. **Import Kit in WordPress**:
   - Go to **WordPress Dashboard → Elementor → Tools → Import / Export Kit**.
   - Click **Start Import**.
   - Select `teamrion-elementor-template-kit.zip`.
   - Choose which elements to import (Templates, Site Settings, Global Colors, Global Fonts).
   - Click **Next** to complete the automated site-wide import.

---

### Option C: Site-Wide Custom CSS (One-Time Setup)

To ensure the neumorphic shadows, metallic corner screws, air vents, and mechanical button depression effects apply across your whole site:

1. In WordPress, go to **Appearance → Customize → Additional CSS** (or **Elementor → Custom Code**).
2. Copy and paste the CSS from `elementor-export/teamrion-custom-code.css`.
3. Click **Publish**.

---

## 🎨 Global Colors & Typography Mapping

| Elementor Global Color Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Chassis Background** | `#e0e5ec` | Page base canvas background |
| **Panel Foreground** | `#f0f2f5` | Cards, elevated panels, modal dialogs |
| **Recessed Surface** | `#d1d9e6` | Data slots, search fields, metric screens |
| **Text Primary** | `#2d3436` | Primary headings and high-contrast text |
| **Text Muted** | `#4a5568` | Body copy and descriptions |
| **Safety Orange Accent** | `#ff4757` | Primary buttons, active tabs, alerts |
| **Status Online Green** | `#22c55e` | LED status indicators |
| **Status Cyan (AI/GEO)** | `#06b6d4` | AI prompt badges & GEO highlights |

**Typography**:
- Primary Font: `Inter`
- Technical Font: `JetBrains Mono` or `Roboto Mono`
