# Design System: Gulso — Gullar va Sovg'alar Marketpleysi
**Project ID:** 16543510580450364312

## 1. Visual Theme & Atmosphere

Gulso projects an air of **romantic warmth with modern refinement** — like a premium boutique flower shop reimagined for the digital age. The overall mood is **airy and light**, grounded in soft warm whites and blush-tinted neutrals, with passionate crimson-rose splashes that guide the eye. The aesthetic is simultaneously joyful and trustworthy: not overly playful, but full of warmth. Every surface breathes, with generous whitespace and soft micro-shadows creating a sense of premium quality without pretension. Sections are clearly delineated but never feel rigid.

## 2. Color Palette & Roles

| Descriptive Name | Hex | Role |
|---|---|---|
| **Crimson Bloom** | `#e7236a` | The soul of the brand. Used for primary CTAs, prices, active states, links, badges, and all brand-accented interactive elements. |
| **Deep Crimson** | `#d01d5d` | Hover/pressed variant of Crimson Bloom buttons. Adds subtle depth feedback on interaction. |
| **Blush White** | `#f8f6f7` | The warm page background. Not pure white — a rose-tinted near-white that feels soft. |
| **Pure Canvas** | `#ffffff` | Card and panel backgrounds. Creates immediate visual lift above the Blush White page. |
| **Soft Ash** | `#f1f5f9` (slate-100) | Secondary surfaces: filter panels, input backgrounds, tag chips. |
| **Whisper Border** | `#e2e8f0` (slate-200) | Dividers and card borders. Barely visible but provides structure. |
| **Ink** | `#0f172a` (slate-900) | Primary headings and important labels. Deep and authoritative. |
| **Graphite** | `#475569` (slate-600) | Body text and secondary labels. |
| **Quiet Stone** | `#94a3b8` (slate-400) | Muted text: hints, placeholders, inactive states. |
| **Emerald Trust** | `#059669` | "In stock" badges, "Delivered" status, verified seller badges. |
| **Sky Info** | `#2563eb` | "In transit" order status tags. |
| **Amber Rating** | `#f59e0b` | Star ratings and review indicators. |
| **Rose Favorite** | `#f43f5e` (rose-500) | Heart/favorite icons in filled state, unfavorite hover state. |

## 3. Typography Rules

- **Font Family:** Plus Jakarta Sans (weight 400–900). Fallback to system-ui sans-serif.
- **Display/Brand Headings (H1):** Black weight (900), tight letter-spacing (-0.04em to -0.02em), large sizes (3xl–5xl), near-ink color.
- **Section Headings (H2–H3):** Black weight (900), tight tracking, with optional subtle icon accompaniment.
- **Cards & Labels:** Bold (700)–Black (900) — bold for product names, ultra-bold for prices.
- **Supporting text:** Semi-bold or Medium (500–600), slate-600, relaxed line-height for readability.
- **Badges/Tags:** Black (900) with `tracking-widest` and `uppercase` transform — creates structured,  editorial feel.
- **Price display:** Always Black weight with the currency suffix slightly smaller than the numeric value.

## 4. Component Stylings

### Buttons
- **Primary CTA:** Solid Crimson Bloom (`#e7236a`) fill, Pure Canvas text, `rounded-xl` (12px) or `rounded-2xl` (16px), bold to black weight. Height minimum 44px for touch, 48px preferred. Hover: slightly darker crimson (`#d01d5d`). Shadow: `shadow-lg shadow-primary/20`. Active: `scale-[0.98]`.
- **Secondary/Ghost:** 10% primary tint background (`bg-primary/10`), Crimson Bloom text — used for "Edit", "See all" type actions. Hover: 20% tint.
- **Outline/Glass:** White/10 backdrop-blur with white border — used on hero overlays. Ghost on dark backgrounds.
- **Icon Buttons:** `rounded-lg` or `rounded-xl`, consistent 40×40px target. Hover: primary/5 tint.
- Never use bare HTML button — always one of these defined patterns.

### Cards / Product Cards
- Background: Pure Canvas white.
- Border: `border border-slate-100` — "Whisper Border", 1px, very subtle.
- Radius: `rounded-2xl` (16px) container.
- Image area: `rounded-xl` (12px) inside card, `aspect-[4/5]` portrait ratio.
- Shadow: `shadow-sm` resting, `shadow-md` on hover. Transition: `transition-shadow`.
- Heart/favorite overlay button: white pill-circle `rounded-full`, positioned `top-3 right-3`, primary text color.
- Store name: Crimson Bloom, 12–13px, semibold, line-clamped.
- Product title: Ink, 15–17px, bold, `line-clamp-2`, hover becomes Crimson Bloom.
- Price: 20–24px Black weight Crimson Bloom, with strikethrough original in stone-gray above.
- Cart button: Full-width, primary fill, `rounded-xl`, with cart icon + text.

### Section Panels / Info Boxes
- Background: `bg-white`
- Radius: `rounded-3xl` (24px) or `rounded-[2rem]` (32px) for major panels.
- Border: `border border-slate-100`.
- Shadow: `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` — whisper-soft diffused shadows, creating gentle elevation.
- Section inside headers: icon left + h2 right, separated from content with `border-b-2 border-slate-50`.

### Inputs / Forms
- Background: `bg-slate-100`, no border in idle state, rounded-2xl.
- Focus ring: `ring-2 ring-primary/50` — Crimson Bloom glow.
- Label: ALL-CAPS, `tracking-widest`, 11px, slate-400 stone color.
- Display field (read-only): `bg-slate-50/50`, `border-2 border-slate-100`, `rounded-2xl`, bold text.

### Badges & Status Tags
- Pill shape: `rounded-full` or `rounded-xl`.
- Categories: very small (10px), ALL-CAPS, `tracking-widest`, with matching light background + border.
- "In Stock": emerald tones. "In Transit": sky/blue. "Delivered": emerald. "Discount/Sale": primary red.

### Navigation / Header
- Fixed, `backdrop-blur-md`, `bg-white/80`, bottom `border-b border-primary/10`.
- Logo: Flower icon in primary fill box + "Gulso" in Black Crimson.
- Search bar: `bg-slate-100`, pill shape, left search icon, right ⌘K shortcut badge.
- Icon actions: ghost hover with primary/5 tint. Cart has primary badge.

## 5. Layout Principles

- **Max width:** `max-w-7xl` (1280px) centered, with `2xl:max-w-8xl` expansion.
- **Page padding:** `px-4 sm:px-6 lg:px-8`.
- **Vertical rhythm:** Consistent `gap-6` to `gap-10` between sections; `mb-8` between major section headers and content.
- **Grid system:** Product grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` responsive columns with `gap-6`.
- **Sidebar layout:** Catalog uses `flex-col lg:flex-row` with a `w-64 shrink-0` sidebar and `flex-1` main area.
- **Micro-animations:** `animate-in fade-in slide-in-from-*-4 duration-500` with staggered `delay-150` for secondary content. Hover transforms at 110% scale (images), 98% scale (buttons on press).
- **Whitespace strategy:** Generous internal padding on cards (`p-4` to `p-8`), with breathing room between sections (`mt-16` to `mt-32` for separation between thematic blocks).
- **Sticky elements:** Header fixed at top. Filter sidebar sticky at `top-[100px]`.
