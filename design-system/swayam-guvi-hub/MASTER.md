# UI/UX Pro Max — Design System Master Specification (`MASTER.md`)

**Project:** SWAYAM × GUVI Data Science Placement Mastery Hub  
**Source Methodology:** `nextlevelbuilder/ui-ux-pro-max-skill`  
**Product Archetype:** EdTech Learning Management System (LMS) + Developer Coding Sandbox & Analytics Dashboard  
**Implementation Stack:** `html-tailwind` + CSS Semantic Custom Properties  

## 1. Visual Direction & Style Priority
- **Primary Style:** Bento Grid Dashboard + Glassmorphic Command Header + Swiss Typographic Hierarchy
- **Design Dials:** `--variance: 7` (Structured Bento Asymmetry) · `--motion: 5` (180ms Cubic-Bezier Micro-Interactions + `prefers-reduced-motion` guard) · `--density: 5/8/3` (Interactive toggle between Standard, Compact, and Spacious)
- **Icon Discipline (Priority #4 Rule):** Crisp inline vector SVGs (`stroke-width: 2`, `aria-hidden="true"`) replacing raw emoji icons in navigation and telemetry pills.

## 2. Semantic Color Tokens (WCAG >= 4.5:1 Verified)
| Token | Light Mode (`default`) | Dark Mode (`[data-theme="dark"]`) | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#F4F6FB` | `#090D16` | App background canvas |
| `--bg-surface` | `#FFFFFF` | `#111827` | Bento card container surface |
| `--bg-elevated` | `#F8FAFC` | `#1E293B` | Nested task/concept modules |
| `--text-primary` | `#0F172A` | `#F8FAFC` | Headings & primary body copy |
| `--text-secondary` | `#475569` | `#CBD5E1` | Analytical notes & subtitles |
| `--brand-primary` | `#2563EB` | `#3B82F6` | SWAYAM Academic Blue actions |
| `--brand-emerald` | `#059669` | `#10B981` | GUVI CodeKata & XP accents |
| `--border-focus` | `#4F46E5` | `#6366F1` | 2px accessible focus-visible ring |

## 3. Typography Pairing
- **Display & Section Headings:** `'Plus Jakarta Sans'` (600, 700, 800), `-0.02em` tracking, `text-wrap: balance`
- **Body & UI Controls:** `'Inter'` (400, 500, 600), `16px` base size, `1.55` line-height
- **Code, SQL, PyTorch & XP Telemetry:** `'JetBrains Mono'` (400, 500, 600, 700)

## 4. Priority 1–10 Pre-Delivery Verification Checklist
- [x] **Priority 1 (Accessibility):** WCAG AA contrast, `focus-visible` 2px indigo rings on all interactive elements, explicit `aria-label` attributes.
- [x] **Priority 2 (Touch & Interaction):** `min-height: 40px–44px` on navigation and action controls, tactile `scale(0.98)` active feedback.
- [x] **Priority 4 (Style & Icons):** Inline SVG icons across header and navigation bar; cohesive Bento card border-radius and elevation tokens.
- [x] **Priority 7 (Animation):** `180ms cubic-bezier(0.22, 1, 0.36, 1)` transitions with `@media (prefers-reduced-motion: reduce)` support.
